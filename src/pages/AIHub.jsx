import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Zap, Brain, Shield, Code2, AlertTriangle, ExternalLink, Clock, RefreshCw } from 'lucide-react';
import './AIHub.css';

const CATEGORIES = [
  { id: 'ALL',      label: 'ALL_FEEDS',     icon: Zap },
  { id: 'AI',       label: 'AI_NEWS',       icon: Brain },
  { id: 'DEV',      label: 'DEV_TIPS',      icon: Code2 },
  { id: 'SECURITY', label: 'SECURITY',      icon: Shield },
];

const QUERIES = {
  AI:       'artificial intelligence LLM',
  DEV:      'programming developer tools',
  SECURITY: 'cybersecurity vulnerability',
};

const fetchHN = async (query, count = 6) => {
  const url = `https://hn.algolia.com/api/v1/search?tags=story&query=${encodeURIComponent(query)}&hitsPerPage=${count}&numericFilters=points>10`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('fetch failed');
  const data = await res.json();
  return data.hits.filter(h => h.title && h.url).map(h => ({
    id: h.objectID,
    title: h.title,
    url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
    points: h.points,
    comments: h.num_comments,
    time: h.created_at,
    author: h.author,
  }));
};

const timeAgo = (iso) => {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return `${Math.floor(diff / 60000)}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

const NewsCard = ({ item, index, category }) => (
  <motion.article
    className="news-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -4 }}
  >
    <div className="news-card-top">
      <span className={`news-badge mono ${category.toLowerCase()}`}>
        {category === 'AI' ? 'AI' : category === 'DEV' ? 'DEV' : 'SEC'}
      </span>
      <span className="news-time mono">
        <Clock size={12} />
        {timeAgo(item.time)}
      </span>
    </div>

    <h3 className="news-title">{item.title}</h3>

    <div className="news-meta mono">
      <span>▲ {item.points}</span>
      <span>{item.comments} comments</span>
      <span className="news-author">@{item.author}</span>
    </div>

    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="news-link mono"
    >
      READ_SOURCE <ExternalLink size={12} />
    </a>
  </motion.article>
);

const SkeletonCard = ({ index }) => (
  <div className="news-card skeleton" style={{ animationDelay: `${index * 0.1}s` }}>
    <div className="skel-line short" />
    <div className="skel-line long" />
    <div className="skel-line mid" />
    <div className="skel-line short" />
  </div>
);

const AIHub = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [feeds, setFeeds] = useState({ AI: [], DEV: [], SECURITY: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadFeeds = async () => {
    setLoading(true);
    setError(null);
    try {
      const [ai, dev, sec] = await Promise.all([
        fetchHN(QUERIES.AI, 6),
        fetchHN(QUERIES.DEV, 6),
        fetchHN(QUERIES.SECURITY, 6),
      ]);
      setFeeds({ AI: ai, DEV: dev, SECURITY: sec });
      setLastUpdated(new Date());
    } catch (e) {
      setError('FEED_FETCH_FAILED');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadFeeds(); }, []);

  const displayItems =
    activeCategory === 'ALL'
      ? [
          ...feeds.AI.slice(0, 3).map(i => ({ ...i, _cat: 'AI' })),
          ...feeds.DEV.slice(0, 3).map(i => ({ ...i, _cat: 'DEV' })),
          ...feeds.SECURITY.slice(0, 3).map(i => ({ ...i, _cat: 'SECURITY' })),
        ]
      : feeds[activeCategory]?.map(i => ({ ...i, _cat: activeCategory })) ?? [];

  return (
    <PageTransition className="page-container">
      <section className="ai-hub-section">

        {/* Header */}
        <motion.header
          className="ai-hub-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="header-title-flex">
            <div className="desktop-icon title-icon">
              <Zap size={32} className="card-icon" />
            </div>
            <h1 className="mono border-title">AI_HUB://LIVE</h1>
          </div>
          <div className="hub-meta mono">
            <span>HACKER_NEWS_FEED</span>
            {lastUpdated && (
              <span className="hub-updated">
                UPDATED: {lastUpdated.toLocaleTimeString('en-US', { hour12: false })}
              </span>
            )}
            <button className="refresh-btn mono" onClick={loadFeeds} disabled={loading}>
              <RefreshCw size={13} className={loading ? 'spin' : ''} />
              {loading ? 'FETCHING...' : 'REFRESH'}
            </button>
          </div>
        </motion.header>

        {/* Tabs */}
        <motion.div
          className="hub-tabs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          {CATEGORIES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`hub-tab mono ${activeCategory === id ? 'active' : ''}`}
              onClick={() => setActiveCategory(id)}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            className="hub-error mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AlertTriangle size={16} />
            {error} — CHECK CONNECTION OR TRY REFRESH
          </motion.div>
        )}

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="news-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {loading
              ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} index={i} />)
              : displayItems.length > 0
                ? displayItems.map((item, i) => (
                    <NewsCard key={item.id} item={item} index={i} category={item._cat} />
                  ))
                : (
                  <div className="hub-empty mono">NO_DATA_AVAILABLE</div>
                )
            }
          </motion.div>
        </AnimatePresence>

      </section>
    </PageTransition>
  );
};

export default AIHub;
