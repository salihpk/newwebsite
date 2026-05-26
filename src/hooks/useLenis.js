// useLenis — sets up Lenis smooth scroll for the entire app.
// Call once at the app root (after boot) so the RAF loop is shared.
// The lenis instance is exposed as window.__lenis so ScrollSidebar
// can call lenis.scrollTo() for section navigation.

import { useEffect } from 'react';
import Lenis from 'lenis';

export function useLenis() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            // Expo-out easing — fast start, silky decel
            easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.85,
            touchMultiplier: 1.5,
            infinite: false,
        });

        window.__lenis = lenis;

        let rafId;
        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            window.__lenis = null;
        };
    }, []);
}
