import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import {
  Zap, Brain, Shield, Code2, ExternalLink, Clock,
  RefreshCw, AlertTriangle, TrendingUp, Hash, Play,
  ArrowUpRight, Wifi, WifiOff,
} from 'lucide-react';
import './AIHub.css';

/* ─── Data sources ──────────────────────────────────────────────────────── */

const fetchHN = async (query, count = 6) => {
  const url = `https://hn.algolia.com/api/v1/search?tags=story&query=${encodeURIComponent(
    query
  )}&hitsPerPage=${count}&numericFilters=points%3E8`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('HN fetch failed');
  const json = await res.json();
  return json.hits
    .filter((h) => h.title && (h.url || h.objectID))
    .map((h) => ({
      id: `hn-${h.objectID}`,
      source: 'HN',
      title: h.title,
      description: null,
      url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
      discussUrl: `https://news.ycombinator.com/item?id=${h.objectID}`,
      points: h.points ?? 0,
      comments: h.num_comments ?? 0,
      time: h.created_at,
      author: h.author,
    }));
};

const fetchDevTo = async (tag, count = 6) => {
  const url = `https://dev.to/api/articles?tag=${tag}&per_page=${count}&top=7`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Dev.to fetch failed');
  const json = await res.json();
  return json.map((a) => ({
    id: `dev-${a.id}`,
    source: 'DEV',
    title: a.title,
    description: a.description || null,
    url: a.url,
    discussUrl: a.url,
    points: a.positive_reactions_count ?? 0,
    comments: a.comments_count ?? 0,
    time: a.published_at,
    author: a.user?.username || 'unknown',
  }));
};

/* ─── External live sources (X / YouTube) ──────────────────────────────── */

const EXTERNAL = [
  {
    platform: 'X (TWITTER)',
    icon: Hash,
    color: 'ext-x',
    links: [
      { label: '#ArtificialIntelligence', url: 'https://x.com/search?q=%23ArtificialIntelligence&f=live' },
      { label: '#MachineLearning',         url: 'https://x.com/search?q=%23MachineLearning&f=live' },
      { label: '#CyberSecurity',           url: 'https://x.com/search?q=%23CyberSecurity&f=live' },
      { label: '@OpenAI',                  url: 'https://x.com/OpenAI' },
      { label: '@AnthropicAI',             url: 'https://x.com/AnthropicAI' },
      { label: '@GoogleDeepMind',          url: 'https://x.com/GoogleDeepMind' },
    ],
  },
  {
    platform: 'YOUTUBE',
    icon: Play,
    color: 'ext-yt',
    links: [
      { label: 'AI News — Today',          url: 'https://www.youtube.com/results?search_query=AI+news+today' },
      { label: 'Two Minute Papers',        url: 'https://www.youtube.com/@TwoMinutePapers' },
      { label: 'Lex Fridman Podcast',      url: 'https://www.youtube.com/@lexfridman' },
      { label: 'Fireship',                 url: 'https://www.youtube.com/@Fireship' },
      { label: 'NetworkChuck (Security)',  url: 'https://www.youtube.com/@NetworkChuck' },
      { label: 'CyberSec — Search',        url: 'https://www.youtube.com/results?search_query=cybersecurity+news+2026' },
    ],
  },
];

/* ─── Categories ────────────────────────────────────────────────────────── */

const CATEGORIES = [
  { id: 'ALL',      label: 'ALL_FEEDS',   icon: Zap },
  { id: 'AI',       label: 'AI_NEWS',     icon: Brain },
  { id: 'DEV',      label: 'DEV_TIPS',    icon: Code2 },
  { id: 'SECURITY', label: 'SECURITY',    icon: Shield },
];

/* ─── Helpers ───────────────────────────────────────────────────────────── */

const timeAgo = (iso) => {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

const SOURCE_META = {
  HN:  { label: 'HACKER NEWS', cls: 'src-hn' },
  DEV: { label: 'DEV.TO',      cls: 'src-dev' },
};

const CAT_META = {
  AI:       { label: 'AI_NEWS',  cls: 'cat-ai' },
  DEV:      { label: 'DEV_TIPS', cls: 'cat-dev' },
  SECURITY: { label: 'SECURITY', cls: 'cat-sec' },
};

/* ─── Sub-components ────────────────────────────────────────────────────── */

const NewsCard = ({ item, catKey, index }) => {
  const src = SOURCE_META[item.source];
  const cat = CAT_META[catKey];

  return (
    <motion.article
      className="ai-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
    >
      {/* Gradient border effect */}
      <div className="ai-card-glow" />

      {/* Top row: source + category */}
      <div className="ai-card-top">
        <span className={`ai-tag mono ${src.cls}`}>{src.label}</span>
        <span className={`ai-tag mono ${cat.cls}`}>{cat.label}</span>
      </div>

      {/* Title */}
      <h3 className="ai-card-title">{item.title}</h3>

      {/* Description (Dev.to only) */}
      {item.description && (
        <p className="ai-card-desc">{item.description}</p>
      )}

      {/* Meta row */}
      <div className="ai-card-meta mono">
        <span className="ai-meta-item">
          <TrendingUp size={11} />
          {item.points}
        </span>
        <span className="ai-meta-item">
          <Clock size={11} />
          {timeAgo(item.time)}
        </span>
        <span className="ai-meta-author">@{item.author}</span>
      </div>

      {/* Actions */}
      <div className="ai-card-actions">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="cyber-btn sm mono"
        >
          READ_ARTICLE <ArrowUpRight size={13} />
        </a>
        {item.discussUrl && item.discussUrl !== item.url && (
          <a
            href={item.discussUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ai-discuss-link mono"
            title="View discussion"
          >
            DISCUSS <ExternalLink size={11} />
          </a>
        )}
      </div>

      <div className="card-glitch" />
    </motion.article>
  );
};

const SkeletonCard = ({ i }) => (
  <div className="ai-card skeleton" style={{ '--delay': `${i * 0.08}s` }}>
    <div className="skel skel-row" />
    <div className="skel skel-title" />
    <div className="skel skel-title short" />
    <div className="skel skel-desc" />
    <div className="skel skel-meta" />
    <div className="skel skel-btn" />
  </div>
);

/* ─── Main component ────────────────────────────────────────────────────── */

const AIHub = () => {
  const [active, setActive] = useState('ALL');
  const [feeds, setFeeds] = useState({ AI: [], DEV: [], SECURITY: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [synced, setSynced] = useState(null);

  const loadFeeds = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [hnAI, devAI, hnSec, devSec, hnDev, devDev] = await Promise.all([
        fetchHN('artificial intelligence LLM GPT',  6),
        fetchDevTo('ai',       6),
        fetchHN('cybersecurity vulnerability hack',  5),
        fetchDevTo('security', 5),
        fetchHN('programming software engineering',  5),
        fetchDevTo('webdev',   5),
      ]);
      setFeeds({
        AI:       [...hnAI,  ...devAI],
        SECURITY: [...hnSec, ...devSec],
        DEV:      [...hnDev, ...devDev],
      });
      setSynced(new Date());
    } catch (e) {
      setError('FEED_SYNC_FAILED — check connection or try refresh');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadFeeds(); }, [loadFeeds]);

  /* Build display list */
  const displayItems =
    active === 'ALL'
      ? [
          ...feeds.AI.slice(0, 4).map((i) => ({ ...i, _cat: 'AI' })),
          ...feeds.DEV.slice(0, 4).map((i) => ({ ...i, _cat: 'DEV' })),
          ...feeds.SECURITY.slice(0, 4).map((i) => ({ ...i, _cat: 'SECURITY' })),
        ]
      : (feeds[active] || []).map((i) => ({ ...i, _cat: active }));

  const counts = {
    ALL:      feeds.AI.length + feeds.DEV.length + feeds.SECURITY.length,
    AI:       feeds.AI.length,
    DEV:      feeds.DEV.length,
    SECURITY: feeds.SECURITY.length,
  };

  return (
    <PageTransition className="page-container ai-hub-page">

      {/* ── Header ── */}
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

        {/* Status bar */}
        <div className="hub-statusbar mono">
          <span className={`hub-dot ${!loading && !error ? 'online' : error ? 'err' : ''}`} />
          <span className="hub-src-label">SOURCES: HACKER NEWS + DEV.TO</span>
          {synced && !loading && (
            <span className="hub-synced">
              SYNCED: {synced.toLocaleTimeString('en-US', { hour12: false })}
            </span>
          )}
          {loading && <span className="hub-fetching">FETCHING...</span>}
          <button
            className="hub-refresh mono"
            onClick={loadFeeds}
            disabled={loading}
            title="Refresh feeds"
          >
            <RefreshCw size={12} className={loading ? 'spin' : ''} />
            REFRESH
          </button>
        </div>
      </header>

      {/* ── Category tabs ── */}
      <motion.div
        className="hub-tabs"
        initial={{ opacity: 0, y: 10 }}
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

      {/* ── Error banner ── */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="hub-error mono"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <WifiOff size={15} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Feed grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="hub-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {loading ? (
            Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} i={i} />)
          ) : displayItems.length > 0 ? (
            displayItems.map((item, idx) => (
              <NewsCard
                key={item.id}
                item={item}
                catKey={item._cat}
                index={idx}
              />
            ))
          ) : (
            <div className="hub-empty mono">
              <Wifi size={22} />
              <span>NO_DATA — FEED_EMPTY</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── External Sources (X + YouTube) ── */}
      <motion.section
        className="hub-external"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -50px 0px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="hub-ext-header mono">
          <AlertTriangle size={16} className="card-icon" />
          <span>LIVE_FEEDS_ON_X_AND_YOUTUBE</span>
          <span className="hub-ext-note">// links open in new tab</span>
        </div>

        <div className="hub-ext-grid">
          {EXTERNAL.map(({ platform, icon: PIcon, color, links }) => (
            <div key={platform} className={`hub-ext-card ${color}`}>
              <div className="hub-ext-card-hd mono">
                <PIcon size={16} className="card-icon" />
                {platform}
              </div>
              <ul className="hub-ext-links">
                {links.map(({ label, url }) => (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hub-ext-link mono"
                    >
                      <ArrowUpRight size={12} />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>

    </PageTransition>
  );
};

export default AIHub;
