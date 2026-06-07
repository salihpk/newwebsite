import React, { useEffect, useRef } from 'react';

const CyberBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: false, alpha: true });
        let animationFrameId;

        // Read theme color once, refresh only when the theme actually changes
        let primaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary-color').trim();
        const themeObserver = new MutationObserver(() => {
            primaryColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--primary-color').trim();
        });
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        });

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Lighter particle field (was 40)
        const particleCount = window.innerWidth < 768 ? 16 : 24;
        const connectionDistSq = 160 * 160;
        const particles = [];

        const resetParticle = (p) => {
            p.x = Math.random() * canvas.width;
            p.y = Math.random() * canvas.height;
            p.vx = (Math.random() - 0.5) * 0.5;
            p.vy = (Math.random() - 0.5) * 0.5;
            p.size = Math.random() * 2;
            p.alpha = Math.random() * 0.5 + 0.2;
        };

        for (let i = 0; i < particleCount; i++) {
            const p = {};
            resetParticle(p);
            particles.push(p);
        }

        const drawGrid = () => {
            ctx.strokeStyle = primaryColor;
            ctx.lineWidth = 0.5;

            const gridSize = 100;
            const scrollSpeed = 0.5;
            const offset = (performance.now() * scrollSpeed / 50) % gridSize;

            ctx.globalAlpha = 0.05;

            // Batch every grid line into a single path (was one stroke per line)
            ctx.beginPath();
            for (let x = offset; x < canvas.width; x += gridSize) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
            }
            for (let y = offset; y < canvas.height; y += gridSize) {
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
            }
            ctx.stroke();
        };

        // ~30 fps cap — background animation doesn't need 60 fps
        const TARGET_INTERVAL = 1000 / 30;
        let lastFrameTime = 0;

        const animate = (timestamp) => {
            animationFrameId = requestAnimationFrame(animate);
            if (timestamp - lastFrameTime < TARGET_INTERVAL) return;
            lastFrameTime = timestamp;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawGrid();

            ctx.fillStyle = primaryColor;
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
                    resetParticle(p);
                }
                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }

            // Connect particles (squared distance avoids per-pair sqrt)
            ctx.strokeStyle = primaryColor;
            ctx.globalAlpha = 0.03;
            ctx.beginPath();
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    if (dx * dx + dy * dy < connectionDistSq) {
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                    }
                }
            }
            ctx.stroke();
        };

        animate();

        // Pause animation when tab is hidden to save CPU
        const handleVisibility = () => {
            if (document.hidden) {
                cancelAnimationFrame(animationFrameId);
            } else {
                animate();
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
            document.removeEventListener('visibilitychange', handleVisibility);
            themeObserver.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                pointerEvents: 'none',
                opacity: 0.6
            }}
        />
    );
};

export default CyberBackground;
