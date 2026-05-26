import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import './ScrollSidebar.css';

export default function ScrollSidebar() {
    const [sections, setSections]         = useState([]);
    const [activeSection, setActiveSection] = useState('');
    const [scrollable, setScrollable]     = useState(false);
    const [visible, setVisible]           = useState(false);
    const [hovered, setHovered]           = useState(false);
    const obsRef                          = useRef(null);
    const location                        = useLocation();

    const { scrollYProgress } = useScroll();
    const springY = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

    // Derived motion values for fill height and thumb top position
    const fillHeight = useTransform(springY, [0, 1], ['0%', '100%']);
    const thumbTop   = useTransform(springY, [0, 1], ['0%', '100%']);

    // ── Section detection ──────────────────────────────────────────
    const detectSections = useCallback(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setScrollable(docHeight > 150);
        if (docHeight < 150) { setSections([]); return; }

        const els = document.querySelectorAll('[data-section]');
        setSections(
            Array.from(els).map(el => ({
                label: el.dataset.section,
                // Clamp to 0.97 so the last tick never overflows the track
                ratio: Math.min(el.offsetTop / docHeight, 0.97),
                el,
            }))
        );
    }, []);

    // Re-detect on route change (delayed to let the page render first)
    useEffect(() => {
        const t = setTimeout(detectSections, 350);
        return () => clearTimeout(t);
    }, [location.pathname, detectSections]);

    // Re-detect on window resize
    useEffect(() => {
        window.addEventListener('resize', detectSections, { passive: true });
        return () => window.removeEventListener('resize', detectSections);
    }, [detectSections]);

    // ── Active section via IntersectionObserver ──────────────────
    useEffect(() => {
        obsRef.current?.disconnect();
        if (!sections.length) return;

        obsRef.current = new IntersectionObserver(
            entries => {
                // Pick the most visible intersecting entry
                const hit = entries
                    .filter(e => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (hit) {
                    const sec = sections.find(s => s.el === hit.target);
                    if (sec) setActiveSection(sec.label);
                }
            },
            { rootMargin: '-10% 0px -50% 0px', threshold: [0.05, 0.3, 0.6] }
        );
        sections.forEach(s => obsRef.current.observe(s.el));
        return () => obsRef.current?.disconnect();
    }, [sections]);

    // ── Scroll visibility ────────────────────────────────────────
    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // ── Tick click — navigate to section ────────────────────────
    const goToSection = useCallback((el) => {
        const lenis = window.__lenis;
        if (lenis) {
            lenis.scrollTo(el, { offset: -80, duration: 1.0 });
        } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    if (!scrollable) return null;

    return (
        <motion.aside
            className={`scroll-sidebar${hovered ? ' hovered' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-hidden="true"
        >
            <div className="ss-container">
                {/* Dim background track line */}
                <div className="ss-track-bg" />

                {/* Filled progress */}
                <motion.div className="ss-fill" style={{ height: fillHeight }} />

                {/* Moving thumb dot */}
                <motion.div className="ss-thumb" style={{ top: thumbTop }} />

                {/* Section tick marks */}
                {sections.map((sec, i) => (
                    <button
                        key={sec.label + i}
                        className={`ss-tick${activeSection === sec.label ? ' active' : ''}`}
                        style={{ top: `${sec.ratio * 100}%` }}
                        onClick={() => goToSection(sec.el)}
                        aria-label={`Go to ${sec.label}`}
                        tabIndex={-1}
                    >
                        <motion.span
                            className="ss-tick-label mono"
                            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 6 }}
                            transition={{ duration: 0.2, delay: i * 0.04 }}
                        >
                            {sec.label}
                        </motion.span>
                        <span className="ss-tick-dash" />
                    </button>
                ))}
            </div>
        </motion.aside>
    );
}
