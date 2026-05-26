import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Gamepad2, ShieldCheck, Music2 } from 'lucide-react';
import './GamingHub.css';

const GamingHub = () => {
    const DISCORD_USER_ID = "577248513654784020";

    const [discordData, setDiscordData] = useState(null);
    const [discordLoading, setDiscordLoading] = useState(true);
    const [steamGames, setSteamGames] = useState([]);
    const [steamLoading, setSteamLoading] = useState(true);
    const [steamError, setSteamError] = useState(null);
    const [steamTotal, setSteamTotal] = useState(0);

    useEffect(() => {
        const fetchDiscord = async () => {
            try {
                const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
                if (res.ok) {
                    const json = await res.json();
                    if (json.success) setDiscordData(json.data);
                }
            } catch (e) {
                console.warn('Lanyard error:', e);
            } finally {
                setDiscordLoading(false);
            }
        };
        fetchDiscord();
        const interval = setInterval(fetchDiscord, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchSteam = async () => {
            try {
                const res = await fetch('/api/steam');
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                setSteamGames(data.games || []);
                setSteamTotal(data.total || 0);
            } catch {
                setSteamError('UNABLE_TO_FETCH_LIBRARY');
            } finally {
                setSteamLoading(false);
            }
        };
        fetchSteam();
    }, []);

    const discordActivity = discordData?.activities?.find(a => a.type === 0) || null;
    const discordSpotify = discordData?.listening_to_spotify ? discordData.spotify : null;
    const discordStatusColor = {
        online: '#43b581', idle: '#faa61a', dnd: '#f04747', offline: '#747f8d',
    }[discordData?.discord_status] || '#747f8d';
    const statusLabel = discordLoading
        ? 'CONNECTING...'
        : ({ online: 'ONLINE', idle: 'IDLE', dnd: 'DO_NOT_DISTURB', offline: 'OFFLINE' }[discordData?.discord_status] || 'OFFLINE');

    const formatElapsed = (ts) => {
        if (!ts) return null;
        const diff = Math.floor((Date.now() - ts) / 1000);
        const h = Math.floor(diff / 3600);
        const m = Math.floor((diff % 3600) / 60);
        const s = diff % 60;
        return h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`;
    };

    const formatHours = (minutes) => {
        if (!minutes) return 'NOT PLAYED';
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        if (h === 0) return `${m}m`;
        if (m === 0) return `${h}h`;
        return `${h}h ${m}m`;
    };

    const getActivityImage = () => {
        const img = discordActivity?.assets?.large_image;
        if (!img) return null;
        if (img.startsWith('mp:external/'))
            return `https://media.discordapp.net/external/${img.replace('mp:external/', '')}`;
        return `https://cdn.discordapp.com/app-assets/${discordActivity.application_id}/${img}.png`;
    };

    const activityLabel = discordActivity
        ? discordActivity.name.toUpperCase()
        : discordSpotify ? 'SPOTIFY' : 'IDLE';

    const activityArt = getActivityImage();

    // Custom Discord status (type 4 = custom status activity)
    const customStatus = discordData?.activities?.find(a => a.type === 4)?.state || null;

    // Active platform
    const platform = discordData?.active_on_discord_mobile
        ? 'MOBILE'
        : discordData?.active_on_discord_desktop
        ? 'DESKTOP'
        : discordData?.active_on_discord_web
        ? 'WEB'
        : discordData ? '—' : '...';

    // Steam aggregates
    const topGame = !steamLoading && steamGames.length > 0
        ? steamGames.reduce((a, b) => (b.playtime > a.playtime ? b : a))
        : null;
    const totalHours = !steamLoading && steamGames.length > 0
        ? Math.floor(steamGames.reduce((sum, g) => sum + (g.playtime || 0), 0) / 60)
        : 0;
    const totalHoursDisplay = totalHours >= 1000
        ? `${(totalHours / 1000).toFixed(1)}K HRS`
        : `${totalHours} HRS`;

    return (
        <PageTransition className="page-container gaming-page">

            {/* ── Hero ── */}
            <motion.div
                className="gaming-hero"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
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
                            transition={{ duration: 0.9, delay: 0.5 }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* ── Dashboard ── */}
            <motion.div
                className="dashboard-layout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.35 }}
            >
                {/* ── TOP GRID: Operator + Live Activity ── */}
                <div className="top-grid">

                    {/* Operator card */}
                    <motion.div
                        className="glass-card operator-card"
                        style={{ '--status-color': discordStatusColor }}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45, type: 'spring', stiffness: 80, damping: 16 }}
                    >
                        <div className="card-label-row mono">
                            <ShieldCheck size={12} className="label-icon" />
                            <span>OPERATOR</span>
                            <span
                                className="status-dot-sm"
                                style={{ background: discordStatusColor, boxShadow: `0 0 8px ${discordStatusColor}` }}
                            />
                        </div>

                        {/* Banner + avatar */}
                        <div className="op-banner">
                            <div className="op-banner-glow" />
                            <div className="op-banner-grid" />
                            <div className="op-scan-line" />
                            <div className="op-avatar-zone">
                                <div
                                    className="op-avatar-frame"
                                    style={{ boxShadow: `0 0 0 2px ${discordStatusColor}, 0 0 22px ${discordStatusColor}55` }}
                                >
                                    <img
                                        src={
                                            discordData?.discord_user?.avatar
                                                ? `https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/${discordData.discord_user.avatar}.png?size=256`
                                                : '/profile2.png'
                                        }
                                        alt="Avatar"
                                        className="op-avatar"
                                        onError={e => { e.target.src = '/profile2.png'; }}
                                    />
                                </div>
                                <span
                                    className="op-status-dot"
                                    style={{ background: discordStatusColor, boxShadow: `0 0 8px ${discordStatusColor}` }}
                                />
                            </div>
                        </div>

                        {/* Identity */}
                        <div className="op-identity">
                            <h2 className="mono op-name">
                                {discordData?.discord_user?.global_name || discordData?.discord_user?.username || 'SPIDO'}
                            </h2>
                            <p className="mono op-username">
                                @{discordData?.discord_user?.username || '---'}
                            </p>
                            <p className="mono op-operator-id">
                                ID:{DISCORD_USER_ID.slice(-8)}
                            </p>
                            <span
                                className="op-status-badge mono"
                                style={{ color: discordStatusColor, borderColor: `${discordStatusColor}50` }}
                            >
                                <span className="op-status-pip" style={{ background: discordStatusColor }} />
                                {statusLabel}
                            </span>
                            {customStatus && (
                                <p className="op-custom-status mono">
                                    <span className="op-custom-status-quote">"</span>
                                    {customStatus}
                                    <span className="op-custom-status-quote">"</span>
                                </p>
                            )}
                        </div>

                        {/* Stat rows — terminal key → value */}
                        <div className="op-stats">
                            <div className="op-stat">
                                <span className="op-stat-key mono">PLATFORM</span>
                                <span className="op-stat-val mono">{platform}</span>
                            </div>
                            <div className="op-stat">
                                <span className="op-stat-key mono">DEVICE</span>
                                <span className="op-stat-val mono device-glow">Lenovo LOQ</span>
                            </div>
                            <div className="op-stat">
                                <span className="op-stat-key mono">LIBRARY</span>
                                <span className="op-stat-val mono">
                                    {steamLoading ? '...' : `${steamTotal} GAMES`}
                                </span>
                            </div>
                            <div className="op-stat">
                                <span className="op-stat-key mono">TOTAL_HRS</span>
                                <span className="op-stat-val mono">
                                    {steamLoading ? '...' : totalHoursDisplay}
                                </span>
                            </div>
                            <div className="op-stat op-stat--top">
                                <span className="op-stat-key mono">TOP_GAME</span>
                                <span className="op-stat-val mono op-top-game">
                                    {steamLoading ? '...' : topGame ? topGame.name : '—'}
                                </span>
                            </div>
                        </div>

                        <div className="operator-actions">
                            <a
                                href="https://discord.gg/zcXGkH98Qk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cyber-btn sm mono"
                            >
                                JOIN_DISCORD
                            </a>
                            <a
                                href={`https://discord.com/users/${DISCORD_USER_ID}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mono subtle-link"
                            >
                                VIEW_PROFILE ↗
                            </a>
                        </div>
                    </motion.div>

                    {/* Live activity card */}
                    <motion.div
                        className="glass-card live-activity-card"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.55, type: 'spring', stiffness: 80, damping: 16 }}
                    >
                        <div className="card-label-row mono live-label">
                            <span className="live-dot" />
                            LIVE_ACTIVITY
                        </div>

                        <AnimatePresence mode="wait">
                            {discordActivity ? (
                                <motion.div
                                    key="game"
                                    className="la-game"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.35 }}
                                >
                                    {activityArt && <img src={activityArt} alt="" className="la-art-bg" />}
                                    <div className="la-art-overlay" />
                                    <div className="la-game-body">
                                        <div className="la-thumb-wrap">
                                            {activityArt
                                                ? <img src={activityArt} alt={discordActivity.name} className="la-thumb" />
                                                : <div className="la-thumb-fallback mono">{discordActivity.name.charAt(0)}</div>
                                            }
                                        </div>
                                        <div className="la-game-info">
                                            <span className="la-playing-badge mono">
                                                <span className="la-live-pip" />
                                                PLAYING
                                            </span>
                                            <h3 className="la-game-title mono">{discordActivity.name}</h3>
                                            {discordActivity.details && (
                                                <span className="la-detail mono">{discordActivity.details}</span>
                                            )}
                                            {discordActivity.state && (
                                                <span className="la-state mono">{discordActivity.state}</span>
                                            )}
                                            {discordActivity.timestamps?.start && (
                                                <span className="la-elapsed mono">
                                                    ⏱ {formatElapsed(discordActivity.timestamps.start)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : discordSpotify ? (
                                <motion.div
                                    key="spotify"
                                    className="la-spotify"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.35 }}
                                >
                                    {discordSpotify.album_art_url && (
                                        <img src={discordSpotify.album_art_url} alt="" className="la-spotify-bg" />
                                    )}
                                    <div className="la-spotify-overlay" />
                                    <div className="la-spotify-content">
                                        {discordSpotify.album_art_url && (
                                            <div className="la-spotify-art-wrap">
                                                <img src={discordSpotify.album_art_url} alt="" className="la-spotify-art" />
                                                <div className="la-spotify-art-shine" />
                                            </div>
                                        )}
                                        <div className="la-spotify-info">
                                            <span className="la-spotify-badge mono">
                                                <Music2 size={10} />
                                                LISTENING ON SPOTIFY
                                            </span>
                                            <span className="la-spotify-song mono">{discordSpotify.song}</span>
                                            <span className="la-spotify-artist mono">{discordSpotify.artist}</span>
                                            <span className="la-spotify-album mono">{discordSpotify.album}</span>
                                        </div>
                                    </div>
                                    <div className="la-spotify-footer">
                                        <div className="la-waveform">
                                            {Array.from({ length: 22 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="la-waveform-bar"
                                                    style={{ animationDelay: `${(i * 0.08) % 1.2}s` }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="idle"
                                    className="la-idle"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="la-idle-grid" />
                                    <div className="la-idle-inner">
                                        <span className="la-idle-signal mono">SIGNAL_LOST</span>
                                        <div className="la-idle-scanner">
                                            <div className="la-idle-ring la-idle-ring-1" />
                                            <div className="la-idle-ring la-idle-ring-2" />
                                            <div className="la-idle-ring la-idle-ring-3" />
                                            <div className="la-idle-sweep" />
                                            <Gamepad2 size={22} className="la-idle-icon" />
                                        </div>
                                        <span className="la-idle-text mono">NO_ACTIVE_SESSION</span>
                                        <span className="la-idle-sub mono">SCANNING<span className="la-idle-dots" /></span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* ── BOTTOM: Steam library full-width ── */}
                <motion.div
                    className="glass-card library-panel"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, type: 'spring', stiffness: 70, damping: 16 }}
                >
                    <div className="library-header mono">
                        <span className="header-accent" />
                        <span className="library-title">STEAM.LIB</span>
                        {steamTotal > 0 && (
                            <span className="library-count-pill">{steamTotal} GAMES</span>
                        )}
                    </div>

                    {steamLoading ? (
                        <div className="steam-status-msg mono">
                            <span className="live-dot" />
                            FETCHING_LIBRARY...
                        </div>
                    ) : steamError ? (
                        <div className="steam-status-msg steam-err mono">{steamError}</div>
                    ) : steamGames.length === 0 ? (
                        <div className="steam-status-msg mono">NO_GAMES_FOUND</div>
                    ) : (
                        <div className="steam-grid">
                            {steamGames.map((game, i) => (
                                <motion.a
                                    key={game.appid}
                                    href={`https://store.steampowered.com/app/${game.appid}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="steam-card"
                                    initial={{ opacity: 0, scale: 0.94 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: Math.min(i * 0.02, 0.4), duration: 0.28 }}
                                    whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <div className="steam-cover-wrap">
                                        <img
                                            src={game.cover}
                                            alt={game.name}
                                            className="steam-cover"
                                            loading="lazy"
                                            onError={e => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                        <div className="steam-fallback mono">{game.name.charAt(0)}</div>
                                        {game.playtime > 0 && (
                                            <span className="steam-hours-pill mono">{formatHours(game.playtime)}</span>
                                        )}
                                    </div>
                                    <div className="steam-card-footer">
                                        <span className="steam-name mono">{game.name}</span>
                                        <span className="steam-time mono">{formatHours(game.playtime)}</span>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </PageTransition>
    );
};

export default GamingHub;
