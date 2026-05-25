import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import profileDefault from '../assets/profile.png';
import { Gamepad2, Activity, Monitor, ShieldCheck, Library, Radio } from 'lucide-react';
import './GamingHub.css';

const GamingHub = () => {
    const DISCORD_USER_ID = "577248513654784020";

    // Tab state
    const [activeTab, setActiveTab] = useState('activity');

    // Discord state
    const [discordData, setDiscordData] = useState(null);
    const [discordLoading, setDiscordLoading] = useState(true);

    // Steam state
    const [steamGames, setSteamGames] = useState([]);
    const [steamLoading, setSteamLoading] = useState(true);
    const [steamError, setSteamError] = useState(null);
    const [steamTotal, setSteamTotal] = useState(0);

    // Discord Presence via Lanyard API — poll every 30 s
    useEffect(() => {
        const fetchDiscord = async () => {
            try {
                const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
                if (res.ok) {
                    const json = await res.json();
                    if (json.success) setDiscordData(json.data);
                }
            } catch (e) {
                console.warn('Lanyard API error:', e);
            } finally {
                setDiscordLoading(false);
            }
        };
        fetchDiscord();
        const dcInterval = setInterval(fetchDiscord, 30000);
        return () => clearInterval(dcInterval);
    }, []);

    // Fetch Steam library once on mount
    useEffect(() => {
        const fetchSteam = async () => {
            try {
                const res = await fetch('/api/steam');
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                setSteamGames(data.games || []);
                setSteamTotal(data.total || 0);
            } catch (err) {
                console.error('Steam fetch error:', err);
                setSteamError('UNABLE_TO_FETCH_STEAM_DATA');
            } finally {
                setSteamLoading(false);
            }
        };
        fetchSteam();
    }, []);

    // Discord helpers
    const getDiscordStatus = () => {
        if (discordLoading) return 'CONNECTING...';
        if (!discordData) return 'UNAVAILABLE';
        const map = { online: 'ONLINE', idle: 'IDLE', dnd: 'DO_NOT_DISTURB', offline: 'OFFLINE' };
        return map[discordData.discord_status] || 'OFFLINE';
    };

    const getDiscordActivity = () => {
        if (!discordData?.activities) return null;
        return discordData.activities.find(a => a.type === 0) || null;
    };

    const getDiscordListening = () => {
        if (!discordData?.listening_to_spotify) return null;
        return discordData.spotify;
    };

    const formatElapsed = (startTimestamp) => {
        if (!startTimestamp) return null;
        const diff = Math.floor((Date.now() - startTimestamp) / 1000);
        const h = Math.floor(diff / 3600);
        const m = Math.floor((diff % 3600) / 60);
        const s = diff % 60;
        return h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`;
    };

    const formatSteamHours = (minutes) => {
        if (!minutes || minutes === 0) return 'NOT_PLAYED';
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        if (h === 0) return `${m}m`;
        if (m === 0) return `${h}h`;
        return `${h}h ${m}m`;
    };

    const discordActivity = getDiscordActivity();
    const discordSpotify = getDiscordListening();
    const discordStatusColor = {
        online: '#43b581', idle: '#faa61a', dnd: '#f04747', offline: '#747f8d'
    }[discordData?.discord_status] || '#747f8d';

    const stats = [
        { label: "DISCORD_STATUS", value: getDiscordStatus(), icon: <Activity className="card-icon" size={16} /> },
        { label: "ACTIVITY", value: discordActivity ? discordActivity.name.toUpperCase() : (discordSpotify ? "SPOTIFY" : "IDLE"), icon: <Gamepad2 className="card-icon" size={16} /> },
        { label: "DEVICE", value: "Lenovo LOQ", icon: <Monitor className="card-icon" size={16} /> },
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }
    };

    const heroVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const cardVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
    };

    const statsVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i) => ({
            opacity: 1, scale: 1,
            transition: { delay: i * 0.1, type: "spring", stiffness: 100 }
        })
    };

    const tabContentVariants = {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
    };

    return (
        <PageTransition className="page-container gaming-page">
            <motion.div
                className="gaming-hero"
                variants={heroVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="arena-title-wrap">
                    <motion.div
                        className="arena-prefix-row"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="arena-prefix mono">SPIDO://</span>
                        <span className="arena-cursor mono">_</span>
                    </motion.div>
                    <div className="arena-name-wrap">
                        <motion.h1
                            className="mono arena-name"
                            data-text="ARENA"
                            initial={{ opacity: 0, y: 40, scale: 0.85 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                            ARENA
                        </motion.h1>
                        <motion.div
                            className="arena-scan-line"
                            initial={{ scaleX: 0, opacity: 0.8 }}
                            animate={{ scaleX: 1, opacity: 0 }}
                            transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="gaming-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Discord Profile Card */}
                <motion.section className="discord-profile-card" variants={cardVariants}>
                    <div className="card-header mono">
                        <div className="header-left-gaming">
                            <div className="desktop-icon">
                                <ShieldCheck className="card-icon" size={14} />
                            </div>
                            <span>CONNECTION: {discordData ? 'SECURE' : 'PENDING'}</span>
                        </div>
                        <div className="status-dot" style={{ background: discordStatusColor, boxShadow: `0 0 10px ${discordStatusColor}` }}></div>
                    </div>
                    <div className="card-body">
                        <div className="avatar-wrapper">
                            {discordData?.discord_user?.avatar ? (
                                <img
                                    src={`https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/${discordData.discord_user.avatar}.png?size=256`}
                                    alt="Discord Avatar"
                                    className="discord-main-avatar"
                                    onError={(e) => e.target.src = profileDefault}
                                />
                            ) : (
                                <img src={profileDefault} alt="Avatar" className="discord-main-avatar" />
                            )}
                            <span className="avatar-status-ring" style={{ borderColor: discordStatusColor, boxShadow: `0 0 12px ${discordStatusColor}` }} />
                            <div className="avatar-glitch"></div>
                        </div>
                        <div className="profile-info">
                            <h2 className="mono">
                                {discordData?.discord_user?.global_name || discordData?.discord_user?.username || "SPIDO"}
                            </h2>
                            <p className="mono text-xs opacity-50">
                                @{discordData?.discord_user?.username || '---'} •{' '}
                                <a
                                    href={`https://discord.com/users/${DISCORD_USER_ID}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'var(--primary-color)', textDecoration: 'none' }}
                                >
                                    VIEW_PROFILE
                                </a>
                            </p>
                            <div className="profile-actions">
                                <a
                                    href="https://discord.gg/zcXGkH98Qk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cyber-btn sm mono discord-btn"
                                >
                                    JOIN_DISCORD
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Stats Strip */}
                <motion.section className="stats-strip" variants={itemVariants}>
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            className="stat-node"
                            custom={i}
                            variants={statsVariants}
                            whileHover={{ scale: 1.05, borderColor: "var(--primary-color)", transition: { duration: 0.2 } }}
                        >
                            <div className="desktop-icon node-icon-gaming">{s.icon}</div>
                            <span className="node-label mono">{s.label}</span>
                            <div className="value-container">
                                {s.link ? (
                                    <a
                                        href={s.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="node-value mono terminal-text spec-link"
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        {s.value}<span className="link-icon">↗</span>
                                    </a>
                                ) : (
                                    <span className={`node-value mono terminal-text ${s.label === 'DEVICE' ? 'device-glow' : ''}`}>{s.value}</span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.section>

                {/* Tab Section */}
                <motion.section className="tab-section" variants={cardVariants}>
                    {/* Tab Switcher */}
                    <div className="tab-switcher mono">
                        <button
                            className={`tab-btn ${activeTab === 'activity' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('activity')}
                        >
                            <Radio size={13} />
                            ACTIVITY.LOG
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'steam' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('steam')}
                        >
                            <Library size={13} />
                            STEAM.LIB
                            {steamTotal > 0 && (
                                <span className="tab-badge">{steamTotal}</span>
                            )}
                        </button>
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'activity' ? (
                            <motion.div
                                key="activity"
                                variants={tabContentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="tab-content"
                            >
                                <div className="discord-activity-content">
                                    {discordActivity ? (
                                        <motion.div
                                            className="discord-game-card"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <div className="discord-game-header mono">
                                                <span className="game-pulse" />
                                                CURRENTLY_PLAYING
                                            </div>
                                            <div className="discord-game-body">
                                                {discordActivity.assets?.large_image && (
                                                    <img
                                                        src={
                                                            discordActivity.assets.large_image.startsWith('mp:external/')
                                                                ? `https://media.discordapp.net/external/${discordActivity.assets.large_image.replace('mp:external/', '')}`
                                                                : `https://cdn.discordapp.com/app-assets/${discordActivity.application_id}/${discordActivity.assets.large_image}.png`
                                                        }
                                                        alt=""
                                                        className="discord-game-img"
                                                    />
                                                )}
                                                <div className="discord-game-details">
                                                    <span className="discord-game-name mono">{discordActivity.name}</span>
                                                    {discordActivity.details && (
                                                        <span className="discord-game-detail mono">{discordActivity.details}</span>
                                                    )}
                                                    {discordActivity.state && (
                                                        <span className="discord-game-state mono">{discordActivity.state}</span>
                                                    )}
                                                    {discordActivity.timestamps?.start && (
                                                        <span className="discord-elapsed mono">
                                                            ELAPSED: {formatElapsed(discordActivity.timestamps.start)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : discordSpotify ? (
                                        <motion.div
                                            className="discord-game-card spotify-card"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <div className="discord-game-header mono">
                                                <span className="game-pulse spotify-pulse" />
                                                LISTENING_TO_SPOTIFY
                                            </div>
                                            <div className="discord-game-body">
                                                {discordSpotify.album_art_url && (
                                                    <img src={discordSpotify.album_art_url} alt="" className="discord-game-img" />
                                                )}
                                                <div className="discord-game-details">
                                                    <span className="discord-game-name mono">{discordSpotify.song}</span>
                                                    <span className="discord-game-detail mono">BY: {discordSpotify.artist}</span>
                                                    <span className="discord-game-state mono">ALBUM: {discordSpotify.album}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="discord-idle mono">NO_ACTIVE_SESSION</div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="steam"
                                variants={tabContentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="tab-content"
                            >
                                {steamLoading ? (
                                    <div className="steam-loading mono">
                                        <span className="game-pulse" style={{ display: 'inline-block', marginRight: 10 }} />
                                        FETCHING_STEAM_LIBRARY...
                                    </div>
                                ) : steamError ? (
                                    <div className="steam-error mono">{steamError}</div>
                                ) : steamGames.length === 0 ? (
                                    <div className="discord-idle mono">NO_GAMES_FOUND</div>
                                ) : (
                                    <>
                                        <div className="steam-meta mono">
                                            TOTAL_GAMES: {steamTotal} — SORTED_BY_PLAYTIME
                                        </div>
                                        <div className="steam-grid">
                                            {steamGames.map((game, i) => (
                                                <motion.a
                                                    key={game.appid}
                                                    href={`https://store.steampowered.com/app/${game.appid}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="steam-game-card"
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: Math.min(i * 0.03, 0.6), duration: 0.3 }}
                                                    whileHover={{ scale: 1.04, transition: { duration: 0.18 } }}
                                                    whileTap={{ scale: 0.97 }}
                                                >
                                                    <div className="steam-cover-wrap">
                                                        <img
                                                            src={game.cover}
                                                            alt={game.name}
                                                            className="steam-cover"
                                                            loading="lazy"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.nextSibling.style.display = 'flex';
                                                            }}
                                                        />
                                                        <div className="steam-cover-placeholder mono" style={{ display: 'none' }}>
                                                            {game.name.charAt(0)}
                                                        </div>
                                                        {game.playtime > 0 && (
                                                            <div className="steam-hours-badge mono">
                                                                {formatSteamHours(game.playtime)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="steam-game-info">
                                                        <span className="steam-game-name mono">{game.name}</span>
                                                        <span className="steam-game-hours mono">
                                                            {game.playtime > 0
                                                                ? `${formatSteamHours(game.playtime)} played`
                                                                : 'NOT PLAYED'}
                                                        </span>
                                                    </div>
                                                </motion.a>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.section>
            </motion.div>
        </PageTransition>
    );
};

export default GamingHub;
