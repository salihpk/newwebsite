import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MatrixRain = ({ isActive, onClose }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!isActive) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        let animationId;

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#00ff41';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            animationId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, [isActive]);

    if (!isActive) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 9999,
                    cursor: 'pointer'
                }}
                onClick={onClose}
            >
                <canvas
                    ref={canvasRef}
                    style={{
                        display: 'block',
                        background: '#000'
                    }}
                />
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        color: 'var(--primary-color)',
                        fontFamily: 'monospace',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        textShadow: '0 0 20px var(--primary-glow)',
                        pointerEvents: 'none',
                        zIndex: 10000
                    }}
                >
                    <div style={{ marginBottom: '20px' }}>SYSTEM_BREACH_DETECTED</div>
                    <div style={{ fontSize: '1rem', opacity: 0.7 }}>
                        CLICK_ANYWHERE_TO_EXIT
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MatrixRain;
