import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Projects from './pages/Projects';
import GamingHub from './pages/GamingHub';
import Contact from './pages/Contact';

import Navbar from './components/Navbar';
import TerminalOverlay from './components/TerminalOverlay';
import ScrollProgress from './components/ScrollProgress';
import BootLoader from './components/BootLoader';

import CyberBackground from './components/CyberBackground';
import MusicPlayer from './components/MusicPlayer';
import MatrixRain from './components/MatrixRain';
import { MapPin, ShieldCheck, Cpu } from 'lucide-react';
import './App.css';

const PLANETS = [
    'MARS', 'JUPITER', 'SATURN', 'NEPTUNE', 'VENUS', 'MERCURY',
    'TITAN', 'EUROPA', 'PROXIMA-B', 'KEPLER-442B', 'TRAPPIST-1E',
    'PLUTO', 'GANYMEDE', 'ENCELADUS', 'TATOOINE', 'ARRAKIS'
];
const randomPlanet = () => PLANETS[Math.floor(Math.random() * PLANETS.length)];

function App() {
    const [isBooting, setIsBooting] = useState(() => {
        return !sessionStorage.getItem('booted');
    });
    const [ip, setIp] = useState('FETCHING...');
    const [locationData] = useState(randomPlanet);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [showMatrix, setShowMatrix] = useState(false);
    const [vpnWarning, setVpnWarning] = useState(false);
    const [vpnDismissed, setVpnDismissed] = useState(false);
    const [vpnInfo, setVpnInfo] = useState(null);
    const [isSpidoMode, setIsSpidoMode] = useState(false);
    const [discordAvatar, setDiscordAvatar] = useState(null);
    const routerLocation = useLocation();
    const DISCORD_USER_ID = "577248513654784020";

    const toggleMusic = () => setIsMusicPlaying(!isMusicPlaying);

    useEffect(() => {
        const fetchDiscordAvatar = async () => {
            try {
                const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
                if (res.ok) {
                    const json = await res.json();
                    if (json.success && json.data.discord_user.avatar) {
                        setDiscordAvatar(
                            `https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/${json.data.discord_user.avatar}.png?size=512`
                        );
                    }
                }
            } catch (e) {
                console.warn('Lanyard API error:', e);
            }
        };
        fetchDiscordAvatar();
    }, []);

    useEffect(() => {
        const detectVPN = async () => {
            try {
                // Using ipapi.co which is more reliable for free lookups
                const res = await fetch('https://ipapi.co/json/');
                const data = await res.json();

                if (data.ip) {
                    setIp(data.ip);

                    // Basic detection for free tier providers
                    const isVPN = data.security?.is_vpn || data.security?.is_proxy ||
                        data.org?.toLowerCase().includes('vpn') ||
                        data.org?.toLowerCase().includes('proxy') ||
                        data.org?.toLowerCase().includes('hosting');

                    if (isVPN) {
                        setVpnWarning(true);
                        setVpnInfo({
                            ip: data.ip,
                            type: data.org?.toLowerCase().includes('vpn') ? 'VPN' : 'PROXY',
                            provider: data.org || 'Unknown',
                            country: data.country_name || 'Unknown',
                        });
                    }
                } else {
                    setIp('UNKNOWN');
                }
            } catch (error) {
                console.error('IP/VPN Detection failed:', error);
                setIp('UNKNOWN');
            }
        };
        detectVPN();
    }, []);

    useEffect(() => {
        let keySequence = '';
        const secretCode = 'matrix';

        const handleKeyPress = (e) => {
            keySequence += e.key.toLowerCase();
            if (keySequence.length > secretCode.length) {
                keySequence = keySequence.slice(-secretCode.length);
            }
            if (keySequence === secretCode) {
                setShowMatrix(true);
                keySequence = '';
            }
        };

        window.addEventListener('keypress', handleKeyPress);
        return () => window.removeEventListener('keypress', handleKeyPress);
    }, []);

    // Delay scroll-to-top by the exit animation duration (220 ms)
    // so the outgoing page fades out before the position jumps
    useEffect(() => {
        const t = setTimeout(() => {
            // Temporarily disable smooth scroll behavior to prevent smooth-scroll jumps/stuttering during page transition
            const originalScrollBehavior = document.documentElement.style.scrollBehavior;
            document.documentElement.style.scrollBehavior = 'auto';
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            
            // Restore smooth scrolling after a small frame delay
            requestAnimationFrame(() => {
                document.documentElement.style.scrollBehavior = originalScrollBehavior;
            });
        }, 220);
        return () => clearTimeout(t);
    }, [routerLocation.pathname]);

    return (
        <div className="app-container">
            <AnimatePresence mode="wait">
                {isBooting ? (
                    <BootLoader key="bootloader" onDone={() => setIsBooting(false)} />
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <ScrollProgress />
                        <CyberBackground />
                        <div className="crt-overlay"></div>
                        <div className="scanline"></div>

                        <AnimatePresence>
                            {vpnWarning && !vpnDismissed && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    className="vpn-status-toast mono"
                                >
                                    <div className="vpn-toast-content">
                                        <span className="blink">▲</span>
                                        <span>[VPN_NODE: {vpnInfo?.type}] {vpnInfo?.provider?.toUpperCase()}</span>
                                        <button className="close-toast" onClick={() => setVpnDismissed(true)}>×</button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Navbar
                            toggleMusic={toggleMusic}
                            isMusicPlaying={isMusicPlaying}
                            isSpidoMode={isSpidoMode}
                            discordAvatar={discordAvatar}
                        />
                        <main>
                            <AnimatePresence mode="wait">
                                <Routes location={routerLocation} key={routerLocation.pathname}>
                                    <Route
                                        path="/"
                                        element={
                                            <Home
                                                isSpidoMode={isSpidoMode}
                                                setIsSpidoMode={setIsSpidoMode}
                                                discordAvatar={discordAvatar}
                                            />
                                        }
                                    />
                                    <Route path="/projects" element={<Projects />} />
                                    <Route path="/gaming" element={<GamingHub />} />
                                                    <Route path="/contact" element={<Contact />} />
                                </Routes>
                            </AnimatePresence>
                        </main>

                        <footer className="footer">
                            <div className="mono text-xs opacity-50 footer-stats">
                                <span className="footer-stat-item"><ShieldCheck size={10} /> SYSTEM: STABLE</span>
                                <span className="separator">|</span>
                                <span className={`footer-stat-item ${vpnWarning ? "text-warn blink" : ""}`}>
                                    <Cpu size={10} /> GATEWAY: {vpnWarning ? `UNSECURE_${vpnInfo?.type || 'VPN'}` : "SECURE"}
                                </span>
                                <span className="separator">|</span>
                                <span className="footer-stat-item"><MapPin size={10} /> LOC: {locationData.toUpperCase()}</span>
                            </div>
                        </footer>

                        <MusicPlayer isPlaying={isMusicPlaying} />
                    </motion.div>
                )}
            </AnimatePresence>

            <MatrixRain isActive={showMatrix} onClose={() => setShowMatrix(false)} />

            <style>{`
                .vpn-status-toast {
                    position: fixed; bottom: 80px; right: 20px; z-index: 10000;
                    background: rgba(255, 0, 60, 0.1);
                    border: 1px solid rgba(255, 0, 60, 0.5);
                    color: #ff003c;
                    padding: 8px 12px;
                    font-size: 0.65rem;
                    backdrop-filter: blur(8px);
                    border-radius: 4px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
                }
                .vpn-toast-content {
                    display: flex; align-items: center; gap: 10px;
                }
                .close-toast {
                    background: none; border: none; color: #ff003c;
                    font-size: 1rem; cursor: pointer; padding: 0 0 0 5px;
                    opacity: 0.7; transition: opacity 0.2s;
                }
                .close-toast:hover { opacity: 1; }
                .text-warn { color: #ff003c; text-shadow: 0 0 5px rgba(255,0,60,0.5); }
                .blink { animation: vpnBlink 1.5s infinite; }
                @keyframes vpnBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
                .footer-stats {
                    display: flex; align-items: center; justify-content: center; gap: 10px;
                    flex-wrap: wrap; padding: 0 10px;
                }
                .footer-stat-item {
                    display: flex; align-items: center; gap: 5px;
                }
                .footer-stats span { transition: all 0.3s ease; }
            `}</style>
        </div >
    );
}

export default App;
