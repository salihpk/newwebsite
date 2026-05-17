import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import profileDefault from '../assets/profile.png';
import { Gamepad2, Activity, Monitor, ShieldCheck, Zap, Disc } from 'lucide-react';
import './GamingHub.css';

const GamingHub = () => {
    const DISCORD_USER_ID = "577248513654784020";
    const [discordData, setDiscordData] = useState(null);
    const [discordLoading, setDiscordLoading] = useState(true);
    const [libraryGames, setLibraryGames] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('discord_game_library') || '[]');
        } catch { return []; }
    });

    // Discord Presence via Lanyard API
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

    // Track game sessions from Discord activity
    useEffect(() => {
        if (!discordData?.activities) return;
        const game = discordData.activities.find(a => a.type === 0);
        if (!game) return;

        setLibraryGames(prev => {
            const existing = prev.find(g => g.name === game.name);
            const now = Date.now();
            let updated;

            if (existing) {
                // Update last seen and accumulate play time (add ~30s per poll)
                updated = prev.map(g => g.name === game.name ? {
                    ...g,
                    lastPlayed: now,
                    totalSeconds: g.totalSeconds + 30,
                    details: game.details || g.details,
                    largeImage: game.assets?.large_image || g.largeImage,
                    applicationId: game.application_id || g.applicationId,
                } : g);
            } else {
                // Add new game entry to library
                const newGame = {
                    name: game.name,
                    firstSeen: now,
                    lastPlayed: now,
                    totalSeconds: 0,
                    details: game.details || '',
                    largeImage: game.assets?.large_image || null,
                    applicationId: game.application_id || null,
                };
                updated = [newGame, ...prev];
            }

            // Sort by last played
            updated.sort((a, b) => b.lastPlayed - a.lastPlayed);
            localStorage.setItem('discord_game_library', JSON.stringify(updated));
            return updated;
        });
    }, [discordData]);

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

    const formatPlayTime = (seconds) => {
        if (seconds < 60) return 'JUST_STARTED';
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        return h > 0 ? `${h}h ${m}m` : `${m}m`;
    };

    const formatLastPlayed = (timestamp) => {
        const diff = Math.floor((Date.now() - timestamp) / 1000);
        if (diff < 60) return 'NOW';
        if (diff < 3600) return `${Math.floor(diff / 60)}m AGO`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h AGO`;
        return `${Math.floor(diff / 86400)}d AGO`;
    };

    const getGameImage = (game) => {
        if (!game.largeImage) return null;

        // Handle external proxy images
        if (game.largeImage.startsWith('mp:external/')) {
            return `https://media.discordapp.net/external/${game.largeImage.replace('mp:external/', '')}`;
        }
        if (game.largeImage.startsWith('external/')) {
            return `https://media.discordapp.net/external/${game.largeImage.replace('external/', '')}`;
        }

        // Handle Spotify assets specifically
        if (game.largeImage.startsWith('spotify:')) {
            return `https://i.scdn.co/image/${game.largeImage.replace('spotify:', '')}`;
        }

        // Handle standard Discord application assets
        if (game.applicationId) {
            // Support both old and new asset ID formats
            const assetId = game.largeImage;
            return `https://cdn.discordapp.com/app-assets/${game.applicationId}/${assetId}.png`;
        }

        return null;
    };

    const GameImage = ({ game }) => {
        const [error, setError] = useState(false);
        const imgUrl = getGameImage(game);

        if (!imgUrl || error) {
            return <div className="game-thumb-placeholder mono">{game.name.charAt(0)}</div>;
        }

        return (
            <img
                src={imgUrl}
                alt={game.name}
                className="game-thumb"
                onError={() => setError(true)}
            />
        );
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
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1, y: 0,
            transition: { type: "spring", stiffness: 100, damping: 12 }
        }
    };

    const heroVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1, scale: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1, x: 0,
            transition: { type: "spring", stiffness: 80, damping: 15 }
        }
    };

    const statsVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i) => ({
            opacity: 1, scale: 1,
            transition: { delay: i * 0.1, type: "spring", stiffness: 100 }
        })
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
                    <motion.div
                        className="arena-sub mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ duration: 0.5, delay: 1.1 }}
                    >
                        DISCORD_PRESENCE_MONITOR — v2.0
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                className="gaming-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Discord Profile Card */}
                <motion.section
                    className="discord-profile-card"
                    variants={cardVariants}
                >
                    <div className="card-header mono">
                        <div className="header-left-gaming">
                            <motion.div
                                className="desktop-icon"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                            >
                                <ShieldCheck className="card-icon" size={14} />
                            </motion.div>
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
                                @{discordData?.discord_user?.username || '---'} • <a href={`https://discord.com/users/${DISCORD_USER_ID}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>VIEW_PROFILE</a>
                            </p>
                            <div className="profile-actions">
                                <a href="https://discord.gg/zcXGkH98Qk" target="_blank" rel="noopener noreferrer" className="cyber-btn sm mono discord-btn">
                                    JOIN_DISCORD
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Stats Strip */}
                <motion.section
                    className="stats-strip"
                    variants={itemVariants}
                >
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            className="stat-node"
                            custom={i}
                            variants={statsVariants}
                            whileHover={{
                                scale: 1.05,
                                borderColor: "var(--primary-color)",
                                transition: { duration: 0.2 }
                            }}
                        >
                            <motion.div
                                className="desktop-icon node-icon-gaming"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                            >
                                {s.icon}
                            </motion.div>
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
                                        {s.value}
                                        <span className="link-icon">↗</span>
                                    </a>
                                ) : (
                                    <span className="node-value mono terminal-text">{s.value}</span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.section>

                {/* Activity Section - Combined */}
                <motion.section
                    className="discord-activity-section"
                    variants={cardVariants}
                >
                    <h3 className="mono border-title">ACTIVITY.LOG</h3>
                    <div className="discord-activity-content">
                        {/* Current Activity */}
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

                        {/* Full Game Library */}
                        {libraryGames.length > 0 && (
                            <>
                                <div className="recent-games-divider mono">MY_LIBRARY</div>
                                <div className="games-list">
                                    {libraryGames.map((game, i) => (
                                        <motion.div
                                            key={game.name}
                                            className="game-item"
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: i * 0.1,
                                                type: "spring",
                                                stiffness: 100,
                                                damping: 15
                                            }}
                                            whileHover={{
                                                scale: 1.02,
                                                x: 10,
                                                transition: { duration: 0.2 }
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="game-img-wrap">
                                                <GameImage game={game} />
                                            </div>
                                            <div className="game-details">
                                                <div className="game-name mono">{game.name}</div>
                                                <div className="play-time mono text-xs">TOTAL_RUNTIME: {formatPlayTime(game.totalSeconds)}</div>
                                            </div>
                                            <div className="game-last-played mono">{formatLastPlayed(game.lastPlayed)}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </motion.section>
            </motion.div>
        </PageTransition>
    );
};

export default GamingHub;
