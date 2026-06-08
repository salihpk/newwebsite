import React, { useEffect, useRef } from 'react';

const TARGET_FPS  = 30;
const INTERVAL_MS = 1000 / TARGET_FPS;

const CyberBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx    = canvas.getContext('2d', { alpha: true });
        let   rafId;
        let   lastTime = 0;

        /* ── Resize ─────────────────────────────────────────── */
        const resize = () => {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        /* ── Stars ──────────────────────────────────────────── */
        const COUNT  = window.innerWidth < 768 ? 90 : 160;
        const stars  = [];

        const initStar = (s, randomY = true) => {
            s.x      = Math.random() * canvas.width;
            s.y      = randomY ? Math.random() * canvas.height : -4;
            s.depth  = Math.random();               // 0 = far, 1 = near
            s.r      = 0.25 + s.depth * 1.6;       // 0.25 – 1.85 px
            s.speed  = 0.06 + s.depth * 0.22;      // slow drift down
            s.drift  = (Math.random() - 0.5) * 0.04; // tiny horizontal wander
            s.base   = 0.15 + s.depth * 0.55;      // base opacity
            s.phase  = Math.random() * Math.PI * 2;
            s.freq   = 0.004 + Math.random() * 0.008; // twinkle speed
        };

        for (let i = 0; i < COUNT; i++) {
            const s = {};
            initStar(s, true);
            stars.push(s);
        }

        /* ── Occasional shooting star ───────────────────────── */
        let shoot    = null;
        let nextShoot = 4000 + Math.random() * 8000;

        const spawnShoot = () => {
            shoot = {
                x:  Math.random() * canvas.width  * 0.7,
                y:  Math.random() * canvas.height * 0.4,
                vx: 4 + Math.random() * 4,
                vy: 2 + Math.random() * 2,
                len: 80 + Math.random() * 60,
                life: 1,
            };
            nextShoot = 5000 + Math.random() * 12000;
        };

        /* ── Draw loop ──────────────────────────────────────── */
        const draw = (now) => {
            rafId = requestAnimationFrame(draw);
            if (now - lastTime < INTERVAL_MS) return;
            const dt = now - lastTime;
            lastTime = now;

            const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
            const RGB    = getComputedStyle(document.documentElement)
                               .getPropertyValue('--primary-color-rgb').trim() || (isDark ? '0,255,65' : '37,99,235');
            const glowA  = isDark ? 0.18 : 0.08;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            /* Stars */
            stars.forEach(s => {
                s.phase += s.freq * dt;
                s.y     += s.speed;
                s.x     += s.drift;

                if (s.y > canvas.height + 4) initStar(s, false);
                if (s.x < -4)               s.x = canvas.width  + 4;
                if (s.x > canvas.width  + 4) s.x = -4;

                const alpha = s.base * (0.65 + 0.35 * Math.sin(s.phase));

                /* Glow halo for bright/near stars */
                if (s.depth > 0.65) {
                    const gr = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
                    gr.addColorStop(0, `rgba(${RGB},${alpha * glowA * 2})`);
                    gr.addColorStop(1, `rgba(${RGB},0)`);
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
                    ctx.fillStyle = gr;
                    ctx.fill();
                }

                /* Star dot */
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${RGB},${alpha})`;
                ctx.fill();
            });

            /* Shooting star */
            nextShoot -= dt;
            if (nextShoot <= 0 && !shoot) spawnShoot();

            if (shoot) {
                shoot.x    += shoot.vx * (dt / 16);
                shoot.y    += shoot.vy * (dt / 16);
                shoot.life -= 0.018 * (dt / 16);

                if (shoot.life > 0) {
                    const tail = { x: shoot.x - shoot.vx * shoot.len / 10, y: shoot.y - shoot.vy * shoot.len / 10 };
                    const gr   = ctx.createLinearGradient(tail.x, tail.y, shoot.x, shoot.y);
                    gr.addColorStop(0, `rgba(${RGB},0)`);
                    gr.addColorStop(1, `rgba(${RGB},${shoot.life * (isDark ? 0.85 : 0.4)})`);
                    ctx.beginPath();
                    ctx.moveTo(tail.x, tail.y);
                    ctx.lineTo(shoot.x, shoot.y);
                    ctx.strokeStyle = gr;
                    ctx.lineWidth   = 1.5;
                    ctx.stroke();
                } else {
                    shoot = null;
                }
            }
        };

        rafId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
};

export default CyberBackground;
