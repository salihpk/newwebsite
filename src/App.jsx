import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Home     = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const GamingHub = lazy(() => import('./pages/GamingHub'));
const Contact  = lazy(() => import('./pages/Contact'));
const Admin     = lazy(() => import('./pages/Admin'));
const NotFound  = lazy(() => import('./pages/NotFound'));

import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import ScrollSidebar from './components/ScrollSidebar';
import BootLoader from './components/BootLoader';
import { useLenis } from './hooks/useLenis';

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
    const [isBooting, setIsBooting] = useState(() => !sessionStorage.getItem('booted'));
    const [locationData] = useState(randomPlanet);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [showMatrix, setShowMatrix] = useState(false);
    const [vpnWarning, setVpnWarning] = useState(false);
    const [vpnDismissed, setVpnDismissed] = useState(false);
    const [vpnInfo, setVpnInfo] = useState(null);
    const routerLocation = useLocation();

    // Lenis smooth scroll — only active after boot
    useLenis();

    const toggleMusic = () => setIsMusicPlaying(p => !p);

    useEffect(() => {
        const detectVPN = async () => {
            try {
                const res = await fetch('https://ipapi.co/json/');
                const data = await res.json();
                if (data.ip) {
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
                }
            } catch {
                // silent — VPN detection is best-effort
            }
        };
        detectVPN();
    }, []);

    useEffect(() => {
        let keySequence = '';
        const secretCode = 'matrix';
        const handleKeyPress = (e) => {
            keySequence += e.key.toLowerCase();
            if (keySequence.length > secretCode.length)
                keySequence = keySequence.slice(-secretCode.length);
            if (keySequence === secretCode) {
                setShowMatrix(true);
                keySequence = '';
            }
        };
        window.addEventListener('keypress', handleKeyPress);
        return () => window.removeEventListener('keypress', handleKeyPress);
    }, []);

    useEffect(() => {
        const t = setTimeout(() => {
            // If Lenis is running, use its scrollTo for instant reset
            const lenis = window.__lenis;
            if (lenis) {
                lenis.scrollTo(0, { immediate: true });
            } else {
                const orig = document.documentElement.style.scrollBehavior;
                document.documentElement.style.scrollBehavior = 'auto';
                window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
                requestAnimationFrame(() => {
                    document.documentElement.style.scrollBehavior = orig;
                });
            }
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
                        <ScrollSidebar />
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

                        <Navbar toggleMusic={toggleMusic} isMusicPlaying={isMusicPlaying} />

                        <main>
                            <AnimatePresence mode="wait">
                                <Suspense fallback={null}>
                                    <Routes location={routerLocation} key={routerLocation.pathname}>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/projects" element={<Projects />} />
                                        <Route path="/gaming" element={<GamingHub />} />
                                        <Route path="/contact" element={<Contact />} />
                                        <Route path="/admin" element={<Admin />} />
                                        <Route path="*" element={<NotFound />} />
                                    </Routes>
                                </Suspense>
                            </AnimatePresence>
                        </main>

                        <footer className="footer">
                            <div className="mono text-xs opacity-50 footer-stats">
                                <span className="footer-stat-item"><ShieldCheck size={10} /> SYSTEM: STABLE</span>
                                <span className="separator">|</span>
                                <span className={`footer-stat-item ${vpnWarning ? 'text-warn blink' : ''}`}>
                                    <Cpu size={10} /> GATEWAY: {vpnWarning ? `UNSECURE_${vpnInfo?.type || 'VPN'}` : 'SECURE'}
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
        </div>
    );
}

export default App;
