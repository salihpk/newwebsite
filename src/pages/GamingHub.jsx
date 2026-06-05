import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Gamepad2, Music2 } from 'lucide-react';
import './GamingHub.css';

const GamingHub = () => {
    const DISCORD_USER_ID = "577248513654784020";

    const [discordData, setDiscordData] = useState(null);
    const [discordLoading, setDiscordLoading] = useState(true);
    const [steamGames, setSteamGames] = useState([]);
    const [steamLoading, setSteamLoading] = useState(true);
    const [steamError, setSteamError] = useState(null);
    const [steamTotal, setSteamTotal] = useState(0);
    const [steamStatus, setSteamStatus] = useState(null); // live in-game presence

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

    // Poll Steam live presence every 30 s — fallback when Discord is closed
    useEffect(() => {
        const fetchSteamStatus = async () => {
            try {
                const res = await fetch('/api/steam-status');
                if (res.ok) {
                    const data = await res.json();
                    setSteamStatus(data);
                }
            } catch (e) {
                console.warn('Steam status error:', e);
            }
        };
        fetchSteamStatus();
        const interval = setInterval(fetchSteamStatus, 30000);
        return () => clearInterval(interval);
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

    const activityArt = getActivityImage();

    const customStatus = discordData?.activities?.find(a => a.type === 4)?.state || null;

    const platform = discordData?.active_on_discord_mobile
        ? 'MOBILE'
        : discordData?.active_on_discord_desktop
        ? 'DESKTOP'
        : discordData?.active_on_discord_web
        ? 'WEB'
        : discordData ? '—' : '...';

    const topGame = !steamLoading && steamGames.length > 0
        ? steamGames.reduce((a, b) => (b.playtime > a.playtime ? b : a))
        : null;
    const totalHours = !steamLoading && steamGames.length > 0
        ? Math.floor(steamGames.reduce((sum, g) => sum + (g.playtime || 0), 0) / 60)
        : 0;
    const totalHoursDisplay = totalHours >= 1000
        ? `${(totalHours / 1000).toFixed(1)}K HRS`
        : `${totalHours} HRS`;

    const avatarUrl = discordData?.discord_user?.avatar
        ? `https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/${discordData.discord_user.avatar}.png?size=256`
        : '/profile2.png';

    return (
        <PageTransition className="page-container gaming-page">
            <div className="gaming-layout">

                {/* ── Hero ── */}
                <motion.div
                    className="gaming-hero"
                    data-section="ARENA"
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

                {/* ── Discord-style Profile Card ── */}
                <motion.div
                    className="dc-card"
                    data-section="PROFILE"
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Banner */}
                    <div className="dc-banner">
                        <div className="dc-banner-gradient" />
                        <div className="dc-banner-scan" />
                    </div>

                    {/* Avatar row — overlaps banner */}
                    <div className="dc-avatar-row">
                        <div className="dc-avatar-wrap" style={{ boxShadow: `0 0 0 4px var(--dc-bg), 0 0 0 6px ${discordStatusColor}88` }}>
                            <img
                                src={avatarUrl}
                                alt="Avatar"
                                className="dc-avatar-img"
                                onError={e => { e.target.src = '/profile2.png'; }}
                            />
                            <span className="dc-status-dot" style={{ background: discordStatusColor, boxShadow: `0 0 8px ${discordStatusColor}` }} />
                        </div>
                        <div className="dc-avatar-actions">
                            <a href="https://discord.gg/zcXGkH98Qk" target="_blank" rel="noopener noreferrer" className="cyber-btn sm mono">
                                JOIN_DISCORD
                            </a>
                            <a href={`https://discord.com/users/${DISCORD_USER_ID}`} target="_blank" rel="noopener noreferrer" className="mono subtle-link">
                                VIEW_PROFILE ↗
                            </a>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="dc-body">
                        {/* Name + status */}
                        <div className="dc-name-row">
                            <h2 className="dc-display-name mono">
                                {discordData?.discord_user?.global_name || discordData?.discord_user?.username || 'SPIDO'}
                            </h2>
                            <span className="dc-status-badge mono" style={{ color: discordStatusColor, borderColor: `${discordStatusColor}44` }}>
                                <span className="dc-status-pip" style={{ background: discordStatusColor }} />
                                {statusLabel}
                            </span>
                        </div>

                        {/* Username */}
                        <p className="dc-username mono">
                            @{discordData?.discord_user?.username || '---'}
                            <span className="dc-uid mono"> · ID:{DISCORD_USER_ID.slice(-8)}</span>
                        </p>

                        {/* Badges row */}
                        <div className="dc-badges">
                            <span className="dc-badge mono" title="Cybersecurity">🛡️ SEC</span>
                            <span className="dc-badge mono" title="AI Enthusiast">🤖 AI</span>
                            <span className="dc-badge mono" title="Developer">⚡ DEV</span>
                            <span className="dc-badge dc-badge--device mono" title="Lenovo LOQ">💻 LOQ</span>
                        </div>

                        {/* Divider */}
                        <div className="dc-divider" />

                        {/* About / custom status */}
                        <div className="dc-section-label mono">ABOUT_ME</div>
                        <p className="dc-about mono">
                            {customStatus || 'Cybersecurity Aspirant · AI Enthusiast · Creative Developer'}
                        </p>

                        {/* Divider */}
                        <div className="dc-divider" />

                        {/* Stats */}
                        <div className="dc-section-label mono">STATS</div>
                        <div className="dc-stats">
                            <div className="dc-stat">
                                <span className="dc-stat-key mono">PLATFORM</span>
                                <span className="dc-stat-val mono">{platform}</span>
                            </div>
                            <div className="dc-stat">
                                <span className="dc-stat-key mono">DEVICE</span>
                                <span className="dc-stat-val mono">Lenovo LOQ</span>
                            </div>
                            <div className="dc-stat">
                                <span className="dc-stat-key mono">TOTAL_HRS</span>
                                <span className="dc-stat-val mono">{steamLoading ? '...' : totalHoursDisplay}</span>
                            </div>
                            <div className="dc-stat">
                                <span className="dc-stat-key mono">TOP_GAME</span>
                                <span className="dc-stat-val mono">{steamLoading ? '...' : topGame ? topGame.name : '—'}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Mission Control ── */}
                <motion.div
                    className="glass-card live-activity-full"
                    data-section="LIVE"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="card-label-row mono live-label">
                        <span className="live-dot" />
                        MISSION_CONTROL
                    </div>

                    <div className="mc-grid">

                        {/* ── Panel 1: Discord ── */}
                        <div className={`mc-panel mc-panel--discord ${discordData ? 'mc-active' : ''}`}>
                            <div className="mc-panel-header mono">
                                <span className="mc-pip" style={{ background: discordStatusColor, boxShadow: `0 0 6px ${discordStatusColor}` }} />
                                DISCORD
                            </div>
                            <div className="mc-panel-body">
                                {discordLoading ? (
                                    <span className="mc-idle-text mono">CONNECTING...</span>
                                ) : (
                                    <>
                                        <div className="mc-discord-status mono" style={{ color: discordStatusColor }}>
                                            {statusLabel}
                                        </div>
                                        <div className="mc-row mono">
                                            <span className="mc-key">USER</span>
                                            <span className="mc-val">{discordData?.discord_user?.username || '—'}</span>
                                        </div>
                                        <div className="mc-row mono">
                                            <span className="mc-key">PLATFORM</span>
                                            <span className="mc-val">{platform}</span>
                                        </div>
                                        {customStatus && (
                                            <div className="mc-custom-status mono">"{customStatus}"</div>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className="mc-panel-footer mono">
                                <span className="mc-footer-label">NODE_01</span>
                                <span className="mc-footer-dot" />
                            </div>
                        </div>

                        {/* ── Panel 2: Activity (centre) ── */}
                        <div className={`mc-panel mc-panel--activity ${(discordActivity || discordSpotify || steamStatus?.inGame) ? 'mc-active mc-hot' : ''}`}>
                            <div className="mc-panel-header mono">
                                <span className="mc-pip" style={{
                                    background: (discordActivity || steamStatus?.inGame) ? 'var(--primary-color)' : discordSpotify ? '#1db954' : '#555',
                                    boxShadow: (discordActivity || steamStatus?.inGame) ? '0 0 6px var(--primary-color)' : discordSpotify ? '0 0 6px #1db954' : 'none'
                                }} />
                                ACTIVITY_FEED
                            </div>

                            <div className="mc-panel-body mc-activity-body">
                                {discordActivity ? (
                                    <div className="mc-activity-content">
                                        {activityArt && <img src={activityArt} alt="" className="mc-activity-art" />}
                                        <div className="mc-activity-info">
                                            <span className="mc-badge mono">
                                                <span className="la-live-pip" /> PLAYING
                                            </span>
                                            <span className="mc-activity-title mono">{discordActivity.name}</span>
                                            {discordActivity.details && <span className="mc-activity-sub mono">{discordActivity.details}</span>}
                                            {discordActivity.timestamps?.start && (
                                                <span className="mc-activity-time mono">⏱ {formatElapsed(discordActivity.timestamps.start)}</span>
                                            )}
                                        </div>
                                    </div>
                                ) : discordSpotify ? (
                                    <div className="mc-activity-content">
                                        {discordSpotify.album_art_url && <img src={discordSpotify.album_art_url} alt="" className="mc-activity-art mc-art-round" />}
                                        <div className="mc-activity-info">
                                            <span className="mc-badge mc-badge--spotify mono">
                                                <Music2 size={9} /> SPOTIFY
                                            </span>
                                            <span className="mc-activity-title mono">{discordSpotify.song}</span>
                                            <span className="mc-activity-sub mono">{discordSpotify.artist}</span>
                                            <div className="mc-waveform">
                                                {Array.from({ length: 16 }).map((_, i) => (
                                                    <div key={i} className="mc-waveform-bar" style={{ animationDelay: `${(i * 0.09) % 1.2}s` }} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : steamStatus?.inGame ? (
                                    <div className="mc-activity-content">
                                        <img src={steamStatus.thumbUrl} alt="" className="mc-activity-art" onError={e => e.target.style.display='none'} />
                                        <div className="mc-activity-info">
                                            <span className="mc-badge mc-badge--steam mono">
                                                <span className="la-live-pip" style={{ background: '#6dcff6' }} /> STEAM
                                            </span>
                                            <span className="mc-activity-title mono">{steamStatus.gameName}</span>
                                            <span className="mc-activity-sub mono">via Steam</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mc-no-activity">
                                        <div className="mc-idle-scanner">
                                            <div className="la-idle-ring la-idle-ring-1" />
                                            <div className="la-idle-ring la-idle-ring-2" />
                                            <div className="la-idle-sweep" />
                                            <Gamepad2 size={18} className="la-idle-icon" />
                                        </div>
                                        <span className="mc-idle-text mono">NO_ACTIVE_SESSION</span>
                                    </div>
                                )}
                            </div>

                            <div className="mc-panel-footer mono">
                                <span className="mc-footer-label">NODE_02</span>
                                <span className="mc-footer-dot" />
                            </div>
                        </div>

                        {/* ── Panel 3: Steam ── */}
                        <div className={`mc-panel mc-panel--steam ${steamStatus?.inGame ? 'mc-active' : ''}`}>
                            <div className="mc-panel-header mono">
                                <span className="mc-pip" style={{
                                    background: steamStatus?.inGame ? '#6dcff6' : '#555',
                                    boxShadow: steamStatus?.inGame ? '0 0 6px #6dcff6' : 'none'
                                }} />
                                STEAM
                            </div>
                            <div className="mc-panel-body">
                                <div className="mc-row mono">
                                    <span className="mc-key">STATUS</span>
                                    <span className="mc-val" style={{ color: steamStatus?.inGame ? '#6dcff6' : 'var(--text-dim)' }}>
                                        {steamStatus?.inGame ? 'IN_GAME' : 'IDLE'}
                                    </span>
                                </div>
                                {steamStatus?.inGame && (
                                    <div className="mc-row mono">
                                        <span className="mc-key">GAME</span>
                                        <span className="mc-val mc-val--clamp">{steamStatus.gameName}</span>
                                    </div>
                                )}
                                <div className="mc-row mono">
                                    <span className="mc-key">LIBRARY</span>
                                    <span className="mc-val">{steamLoading ? '...' : `${steamTotal} GAMES`}</span>
                                </div>
                                <div className="mc-row mono">
                                    <span className="mc-key">TOTAL_HRS</span>
                                    <span className="mc-val">{steamLoading ? '...' : totalHoursDisplay}</span>
                                </div>
                            </div>
                            <div className="mc-panel-footer mono">
                                <span className="mc-footer-label">NODE_03</span>
                                <span className="mc-footer-dot" />
                            </div>
                        </div>

                    </div>
                </motion.div>

                {/* ── Steam Library (full-width) ── */}
                <motion.div
                    className="glass-card library-panel"
                    data-section="LIBRARY"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="library-header mono">
                        <span className="header-accent" />
                        <span className="library-title">STEAM.LIB</span>
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

            </div>
        </PageTransition>
    );
};

export default GamingHub;
