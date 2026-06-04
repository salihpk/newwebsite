import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldX, RotateCcw } from 'lucide-react';
import './NotFound.css';

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

function useGlitch(text, running) {
    const [display, setDisplay] = useState(text);

    useEffect(() => {
        if (!running) { setDisplay(text); return; }
        let frame = 0;
        const total = 18;
        const id = setInterval(() => {
            frame++;
            setDisplay(
                text.split('').map((ch, i) => {
                    if (ch === ' ') return ' ';
                    if (frame / total > i / text.length) return ch;
                    return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                }).join('')
            );
            if (frame >= total) clearInterval(id);
        }, 45);
        return () => clearInterval(id);
    }, [text, running]);

    return display;
}

const LOGS = [
    'INIT: kernel panic — route not found',
    'TRACE: scanning fallback nodes...',
    'WARN: no valid destination at requested path',
    'ERR:  navigation aborted [0x404]',
    'INFO: suggesting safe redirect to /home',
];

export default function NotFound() {
    const [glitching, setGlitching] = useState(true);
    const [logs, setLogs]           = useState([]);

    const label404 = useGlitch('404', glitching);
    const labelAD  = useGlitch('ACCESS DENIED', glitching);

    // Stream fake log lines in one by one
    useEffect(() => {
        let i = 0;
        const id = setInterval(() => {
            if (i >= LOGS.length) { clearInterval(id); return; }
            setLogs(l => [...l, LOGS[i]]);
            i++;
        }, 380);
        return () => clearInterval(id);
    }, []);

    // Periodic glitch burst
    useEffect(() => {
        const id = setInterval(() => {
            setGlitching(true);
            setTimeout(() => setGlitching(false), 900);
        }, 4000);
        setGlitching(false); // stop the initial one after mount
        return () => clearInterval(id);
    }, []);

    return (
        <div className="nf-wrap">
            <motion.div
                className="nf-card glass-card"
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Icon */}
                <motion.div
                    className="nf-icon"
                    animate={{ rotate: [0, -4, 4, -2, 2, 0] }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <ShieldX size={36} />
                </motion.div>

                {/* 404 */}
                <div className="nf-code mono" data-value="404">{label404}</div>
                <div className="nf-title mono" data-value="ACCESS DENIED">{labelAD}</div>
                <p className="nf-sub">The path you requested does not exist in this system.</p>

                {/* Fake terminal log */}
                <div className="nf-terminal mono">
                    {logs.map((line, i) => (
                        <motion.div
                            key={i}
                            className="nf-log-line"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className="nf-log-prefix">&gt;</span> {line}
                        </motion.div>
                    ))}
                    {logs.length === LOGS.length && (
                        <motion.div
                            className="nf-log-line nf-cursor-line"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <span className="nf-log-prefix">&gt;</span> <span className="nf-blink">_</span>
                        </motion.div>
                    )}
                </div>

                {/* Actions */}
                <div className="nf-actions">
                    <Link to="/" className="cyber-btn" style={{ textDecoration: 'none' }}>
                        <RotateCcw size={14} /> RETURN_HOME
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
