import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Layers, Gamepad2, Mail, Menu } from 'lucide-react';
import './Navbar.css';

const DISCORD_USER_ID = '577248513654784020';

const Navbar = () => {
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [discordAvatar, setDiscordAvatar] = useState(null);

  useEffect(() => {
    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`)
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        if (json?.success && json.data.discord_user.avatar) {
          setDiscordAvatar(
            `https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/${json.data.discord_user.avatar}.png?size=128`
          );
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // ── Auto-hide on scroll ───────────────────────────────────────
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY  = useRef(0);
  const rafPending   = useRef(false);
  const visibleRef   = useRef(true); // track without re-render cost

  useEffect(() => {
    const onScroll = () => {
      if (rafPending.current) return;
      rafPending.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        let next = visibleRef.current;

        if (y < 60) {
          next = true;                        // always show near top
        } else if (y > lastScrollY.current + 10) {
          next = false;                       // scrolling down  → hide
        } else if (y < lastScrollY.current - 10) {
          next = true;                        // scrolling up    → show
        }

        if (next !== visibleRef.current) {
          visibleRef.current = next;
          setNavVisible(next);               // only setState when it actually changes
        }
        lastScrollY.current = y;
        rafPending.current  = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { name: 'HOME', path: '/', icon: <Home size={20} /> },
    { name: 'PROJECTS', path: '/projects', icon: <Layers size={20} /> },
    { name: 'ARENA', path: '/gaming', icon: <Gamepad2 size={20} /> },
    { name: 'CONTACT', path: '/contact', icon: <Mail size={20} /> },
  ];

  // Shared theme-switch logic (accepts coordinates directly)
  const applyThemeSwitch = (x, y) => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.style.setProperty('--theme-x', `${x}px`);
    document.documentElement.style.setProperty('--theme-y', `${y}px`);
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }
    document.startViewTransition(() => {
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      setTheme(newTheme);
    });
  };

  // ── Touch handler (mobile tap → toggle theme) ────────────────
  const handleTouchEnd = (e) => {
    const touch = e.changedTouches?.[0];
    applyThemeSwitch(
      touch?.clientX ?? window.innerWidth / 2,
      touch?.clientY ?? window.innerHeight / 2,
    );
    e.preventDefault(); // block ghost click that follows touchend
  };

  return (
    <nav className={`navbar${navVisible ? '' : ' navbar--hidden'}`}>
      <div className="nav-logo">
        <motion.div
          className="nav-profile-link"
          style={{ cursor: 'pointer', touchAction: 'manipulation' }}
          /* Click / tap → toggle theme */
          onClick={(e) => {
            e.preventDefault();
            applyThemeSwitch(e.clientX ?? window.innerWidth / 2, e.clientY ?? window.innerHeight / 2);
          }}
          onTouchEnd={handleTouchEnd}
          whileTap={{ scale: 0.9 }}
        >
          <motion.img
            src={discordAvatar || '/profile2.png'}
            alt="Toggle theme"
            className="nav-avatar"
            onError={e => { e.target.src = '/profile2.png'; }}
          />
          <div className="theme-tooltip mono">
            <span className="desktop-info">CLICK: THEME</span>
            <span className="mobile-info">TAP: THEME</span>
          </div>
        </motion.div>
      </div>

      <div className="mobile-toggle" onClick={toggleMenu}>
        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="nav-links desktop-only">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item mono ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.name}
            {location.pathname === item.path && (
              <motion.div layoutId="nav-underline" className="nav-underline" initial={false} />
            )}
          </Link>
        ))}
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => {
              if (e.target.classList.contains('mobile-menu-overlay')) setIsMenuOpen(false);
            }}
          >
            <div className="mobile-menu-bg-graphic">
              <img src={discordAvatar || '/profile2.png'} alt="" style={{ opacity: 0.1 }} />
            </div>

            <div className="mobile-menu-content">
              <motion.div
                className="mobile-menu-header mono"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="menu-title">
                  <Menu size={20} className="accent" />
                  NAVIGATION_MENU
                </div>
                <div className="menu-subtitle">SELECT_DESTINATION</div>
              </motion.div>

              {navItems.map((item, idx) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 + 0.2 }}
                >
                  <Link
                    to={item.path}
                    className={`mobile-nav-item mono ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="item-index accent">0{idx + 1}</span>
                    <span className="item-icon">{item.icon}</span>
                    <span className="item-name">{item.name}</span>
                    <div className="hover-indicator"></div>
                    {location.pathname === item.path && (
                      <motion.div className="active-badge mono" layoutId="active-badge">
                        ACTIVE
                      </motion.div>
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="mobile-menu-footer mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="footer-line"></div>
                <p>CORE_INTERFACE_v4.2</p>
                <p className="opacity-50">STATUS: ENCRYPTED</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
