import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import {
  Zap, Brain, Shield,
  RefreshCw, ArrowUpRight, Clock,
  Wifi, WifiOff, TrendingUp,
} from 'lucide-react';
import './AIHub.css';

/* ─── Fetchers ───────────────────────────────────────────────────────────── */

// Hacker News Algolia — truly real-time, query-specific
const fetchHN = async (query, count = 8) => {
  const url =
    `https://hn.algolia.com/api/v1/search_by_date` +
    `?tags=story&query=${encodeURIComponent(query)}&hitsPerPage=${count}&numericFilters=points%3E5`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('HN fetch failed');
  const json = await res.json();
  return json.hits
    .filter((h) => h.title && (h.url || h.objectID))
    .map((h) => ({
      id:       `hn-${h.objectID}`,
      source:   'HN',
      title:    h.title,
      desc:     null,
      url:      h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
      discuss:  `https://news.ycombinator.com/item?id=${h.objectID}`,
      points:   h.points ?? 0,
      time:     h.created_at,
      author:   h.author,
    }));
};

// Dev.to — real-time tagged articles with descriptions
const fetchDevTo = async (tag, count = 8) => {
  const url = `https://dev.to/api/articles?tag=${tag}&per_page=${count}&top=3`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Dev.to fetch failed');
  const json = await res.json();
  return json.map((a) => ({
    id:      `dev-${a.id}`,
    source:  'DEV.TO',
    title:   a.title,
    desc:    a.description || null,
    url:     a.url,
    discuss: a.url,
    points:  a.positive_reactions_count ?? 0,
    time:    a.published_at,
    author:  a.user?.username || '',
  }));
};

/* ─── Categories ─────────────────────────────────────────────────────────── */

const CATEGORIES = [
  { id: 'ALL',      label: 'ALL_FEEDS',      icon: Zap    },
  { id: 'AI',       label: 'AI_NEWS',        icon: Brain  },
  { id: 'SECURITY', label: 'CYBER_SECURITY', icon: Shield },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */

const timeAgo = (iso) => {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60)  return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)  return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

const SRC_CLS  = { 'HN': 'src-hn', 'DEV.TO': 'src-dev' };
const CAT_CLS  = { AI: 'cat-ai', SECURITY: 'cat-sec' };
const CAT_LABEL = { AI: 'AI_NEWS', SECURITY: 'SECURITY' };

/* ─── Card ───────────────────────────────────────────────────────────────── */

const NewsCard = ({ item, catKey, index }) => (
  <motion.article
    className="ai-card"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '0px 0px -40px 0px' }}
    transition={{ delay: index * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -6 }}
  >
    <div className="ai-card-glow" />

    <div className="ai-card-body">
      {/* Badges */}
      <div className="ai-card-top">
        <span className={`ai-tag mono ${SRC_CLS[item.source]}`}>{item.source}</span>
        <span className={`ai-tag mono ${CAT_CLS[catKey]}`}>{CAT_LABEL[catKey]}</span>
      </div>

      {/* Title */}
      <h3 className="ai-card-title">{item.title}</h3>

      {/* Description — Dev.to only */}
      {item.desc && <p className="ai-card-desc">{item.desc}</p>}

      {/* Meta */}
      <div className="ai-card-meta mono">
        <span className="ai-meta-item"><TrendingUp size={11} />{item.points}</span>
        <span className="ai-meta-item"><Clock size={11} />{timeAgo(item.time)}</span>
        {item.author && <span className="ai-meta-author">@{item.author}</span>}
      </div>

      {/* Actions */}
      <div className="ai-card-actions">
        <a href={item.url} target="_blank" rel="noopener noreferrer"
           className="cyber-btn sm mono">
          READ_ARTICLE <ArrowUpRight size={13} />
        </a>
        {item.discuss && item.discuss !== item.url && (
          <a href={item.discuss} target="_blank" rel="noopener noreferrer"
             className="ai-discuss mono">
            DISCUSS <ArrowUpRight size={11} />
          </a>
        )}
      </div>
    </div>

    <div className="card-glitch" />
  </motion.article>
);

const SkeletonCard = ({ i }) => (
  <div className="ai-card skeleton" style={{ '--delay': `${i * 0.07}s` }}>
    <div className="ai-card-body">
      <div className="skel skel-row" />
      <div className="skel skel-title" />
      <div className="skel skel-title short" />
      <div className="skel skel-desc" />
      <div className="skel skel-meta" />
      <div className="skel skel-btn" />
    </div>
  </div>
);

/* ─── Page ───────────────────────────────────────────────────────────────── */

const AIHub = () => {
  const [active, setActive]   = useState('ALL');
  const [feeds, setFeeds]     = useState({ AI: [], SECURITY: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [synced, setSynced]   = useState(null);

  const loadFeeds = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [hnAI, devAI, hnSec, devSec] = await Promise.all([
        fetchHN('artificial intelligence machine learning LLM', 8),
        fetchDevTo('ai', 8),
        fetchHN('cybersecurity vulnerability exploit hack', 8),
        fetchDevTo('security', 8),
      ]);

      const dedup = (arr) => {
        const seen = new Set();
        return arr.filter((a) => !seen.has(a.url) && seen.add(a.url));
      };

      setFeeds({
        AI:       dedup([...hnAI, ...devAI]),
        SECURITY: dedup([...hnSec, ...devSec]),
      });
      setSynced(new Date());
    } catch {
      setError('FEED_SYNC_FAILED — try refresh');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadFeeds(); }, [loadFeeds]);

  const displayItems =
    active === 'ALL'
      ? [
          ...feeds.AI.slice(0, 6).map((i) => ({ ...i, _cat: 'AI' })),
          ...feeds.SECURITY.slice(0, 6).map((i) => ({ ...i, _cat: 'SECURITY' })),
        ]
      : (feeds[active] || []).map((i) => ({ ...i, _cat: active }));

  const counts = {
    ALL:      feeds.AI.length + feeds.SECURITY.length,
    AI:       feeds.AI.length,
    SECURITY: feeds.SECURITY.length,
  };

  return (
    <PageTransition className="page-container ai-hub-page">

      {/* Header */}
      <header className="page-header">
        <div className="header-title-flex">
          <motion.div
            className="desktop-icon title-icon"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Zap size={32} className="card-icon" />
          </motion.div>
          <h1 className="mono border-title">AI_HUB://LIVE</h1>
        </div>

        <div className="hub-statusbar mono">
          <span className={`hub-dot ${!loading && !error ? 'online' : error ? 'err' : 'idle'}`} />
          <span className="hub-src-label">HN · DEV.TO — REAL-TIME</span>
          {synced && !loading && (
            <span className="hub-synced">
              SYNCED {synced.toLocaleTimeString('en-US', { hour12: false })}
            </span>
          )}
          {loading && <span className="hub-fetching">FETCHING...</span>}
          <button className="hub-refresh mono" onClick={loadFeeds} disabled={loading}>
            <RefreshCw size={12} className={loading ? 'spin' : ''} />
            REFRESH
          </button>
        </div>
      </header>

      {/* Tabs */}
      <motion.div
        className="hub-tabs"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        {CATEGORIES.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`hub-tab mono${active === id ? ' active' : ''}`}
            onClick={() => setActive(id)}
          >
            <Icon size={14} />
            {label}
            {!loading && counts[id] > 0 && (
              <span className="tab-count">{counts[id]}</span>
            )}
          </button>
        ))}
      </motion.div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div className="hub-error mono"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <WifiOff size={15} />{error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="hub-grid"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {loading
            ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} i={i} />)
            : displayItems.length > 0
              ? displayItems.map((item, idx) => (
                  <NewsCard key={item.id} item={item} catKey={item._cat} index={idx} />
                ))
              : (
                <div className="hub-empty mono">
                  <Wifi size={22} /><span>NO_DATA — FEED_EMPTY</span>
                </div>
              )
          }
        </motion.div>
      </AnimatePresence>

    </PageTransition>
  );
};

export default AIHub;
