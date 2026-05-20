import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import {
  Zap, Globe, FlaskConical, Cpu,
  RefreshCw, ArrowUpRight, Calendar,
  Wifi, WifiOff, ImageOff,
} from 'lucide-react';
import './AIHub.css';

/* ─── API ────────────────────────────────────────────────────────────────── */

const BASE = 'https://saurav.tech/NewsAPI';

const load = async (path) => {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`fetch failed: ${path}`);
  const json = await res.json();
  return (json.articles || []).filter((a) => a.title && a.url);
};

/* ─── Category config ────────────────────────────────────────────────────── */

const CATEGORIES = [
  { id: 'ALL',      label: 'ALL_FEEDS',   icon: Zap,          color: 'cat-all'  },
  { id: 'TECH',     label: 'TECHNOLOGY',  icon: Cpu,          color: 'cat-tech' },
  { id: 'SCIENCE',  label: 'SCIENCE',     icon: FlaskConical, color: 'cat-sci'  },
  { id: 'GLOBAL',   label: 'GLOBAL_NEWS', icon: Globe,        color: 'cat-glob' },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */

const fmtDate = (iso) => {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
};

/* ─── Sub-components ─────────────────────────────────────────────────────── */

const ImgWithFallback = ({ src, alt }) => {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className="ai-card-no-img">
        <ImageOff size={22} />
      </div>
    );
  }
  return (
    <img
      className="ai-card-img"
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
};

const NewsCard = ({ item, catId, index }) => {
  const cat = CATEGORIES.find((c) => c.id === catId) || CATEGORIES[0];

  return (
    <motion.article
      className="ai-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ delay: index * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="ai-card-glow" />

      {/* Thumbnail */}
      <div className="ai-card-thumb">
        <ImgWithFallback src={item.urlToImage} alt={item.title} />
      </div>

      {/* Body */}
      <div className="ai-card-body">
        {/* Source + Category badges */}
        <div className="ai-card-top">
          {item.source?.name && (
            <span className="ai-tag src-tag mono">{item.source.name.toUpperCase()}</span>
          )}
          <span className={`ai-tag mono ${cat.color}`}>{cat.label}</span>
        </div>

        {/* Title */}
        <h3 className="ai-card-title">
          {item.title?.replace(/\s*-\s*[^-]+$/, '')}
        </h3>

        {/* Description */}
        {item.description && (
          <p className="ai-card-desc">{item.description}</p>
        )}

        {/* Meta */}
        <div className="ai-card-meta mono">
          <span className="ai-meta-item">
            <Calendar size={11} />
            {fmtDate(item.publishedAt)}
          </span>
          {item.author && (
            <span className="ai-meta-author">
              {item.author.split(',')[0].slice(0, 28)}
            </span>
          )}
        </div>

        {/* CTA */}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="cyber-btn sm mono ai-read-btn"
        >
          READ_ARTICLE <ArrowUpRight size={13} />
        </a>
      </div>

      <div className="card-glitch" />
    </motion.article>
  );
};

const SkeletonCard = ({ i }) => (
  <div className="ai-card skeleton" style={{ '--delay': `${i * 0.07}s` }}>
    <div className="skel skel-thumb" />
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

/* ─── Main ───────────────────────────────────────────────────────────────── */

const AIHub = () => {
  const [active, setActive] = useState('ALL');
  const [feeds, setFeeds] = useState({ TECH: [], SCIENCE: [], GLOBAL: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [synced, setSynced] = useState(null);

  const loadFeeds = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [techUS, techGB, sci, bbc, cnn] = await Promise.all([
        load('/top-headlines/category/technology/us.json'),
        load('/top-headlines/category/technology/gb.json'),
        load('/top-headlines/category/science/us.json'),
        load('/everything/bbc-news.json'),
        load('/everything/cnn.json'),
      ]);

      // Deduplicate by URL across sources
      const dedup = (arr) => {
        const seen = new Set();
        return arr.filter((a) => {
          if (seen.has(a.url)) return false;
          seen.add(a.url);
          return true;
        });
      };

      setFeeds({
        TECH:    dedup([...techUS, ...techGB]),
        SCIENCE: dedup([...sci]),
        GLOBAL:  dedup([...bbc, ...cnn]),
      });
      setSynced(new Date());
    } catch (e) {
      setError('FEED_SYNC_FAILED — check connection or try refresh');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadFeeds(); }, [loadFeeds]);

  const displayItems =
    active === 'ALL'
      ? [
          ...feeds.TECH.slice(0, 4).map((i) => ({ ...i, _cat: 'TECH' })),
          ...feeds.SCIENCE.slice(0, 4).map((i) => ({ ...i, _cat: 'SCIENCE' })),
          ...feeds.GLOBAL.slice(0, 4).map((i) => ({ ...i, _cat: 'GLOBAL' })),
        ]
      : (feeds[active] || []).map((i) => ({ ...i, _cat: active }));

  const counts = {
    ALL:     feeds.TECH.length + feeds.SCIENCE.length + feeds.GLOBAL.length,
    TECH:    feeds.TECH.length,
    SCIENCE: feeds.SCIENCE.length,
    GLOBAL:  feeds.GLOBAL.length,
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
          <span className="hub-src-label">BBC · CNN · THE VERGE · TECHRADAR · +MORE</span>
          {synced && !loading && (
            <span className="hub-synced">
              SYNCED {synced.toLocaleTimeString('en-US', { hour12: false })}
            </span>
          )}
          {loading && <span className="hub-fetching">FETCHING...</span>}
          <button
            className="hub-refresh mono"
            onClick={loadFeeds}
            disabled={loading}
          >
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
          <motion.div
            className="hub-error mono"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <WifiOff size={15} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="hub-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {loading
            ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} i={i} />)
            : displayItems.length > 0
              ? displayItems.map((item, idx) => (
                  <NewsCard key={item.url} item={item} catId={item._cat} index={idx} />
                ))
              : (
                <div className="hub-empty mono">
                  <Wifi size={22} />
                  <span>NO_DATA — FEED_EMPTY</span>
                </div>
              )
          }
        </motion.div>
      </AnimatePresence>

    </PageTransition>
  );
};

export default AIHub;
