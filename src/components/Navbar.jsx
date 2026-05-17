import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Layers, Gamepad2, Mail, Menu } from 'lucide-react';
import profileImg from '../assets/profile.png';
import './Navbar.css';

const Navbar = ({ toggleMusic, isMusicPlaying, isSpidoMode, discordAvatar }) => {
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (e) => {
    e.preventDefault();
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'HOME', path: '/', icon: <Home size={20} /> },
    { name: 'PROJECTS', path: '/projects', icon: <Layers size={20} /> },
    { name: 'ARENA', path: '/gaming', icon: <Gamepad2 size={20} /> },
    { name: 'CONTACT', path: '/contact', icon: <Mail size={20} /> },
  ];

  const pressTimerRef = useRef(null);
  const isLongPressActive = useRef(false);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <motion.div
          className="nav-profile-link"
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.preventDefault();
            if (isLongPressActive.current) {
              isLongPressActive.current = false;
              return;
            }
            toggleTheme(e);
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            toggleMusic();
          }}
          onPointerDown={() => {
            isLongPressActive.current = false;
            pressTimerRef.current = setTimeout(() => {
              toggleMusic();
              isLongPressActive.current = true;
            }, 600);
          }}
          onPointerUp={() => {
            clearTimeout(pressTimerRef.current);
          }}
          onPointerLeave={() => {
            clearTimeout(pressTimerRef.current);
          }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {!isSpidoMode ? (
              <motion.img
                key="normal-nav"
                src={profileImg}
                alt="System Controls"
                className={`nav-avatar ${isMusicPlaying ? 'playing' : ''}`}
                initial={{ opacity: 0, scale: 0.8, filter: 'grayscale(100%)' }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: 'grayscale(100%)',
                  rotate: isMusicPlaying ? 360 : 0
                }}
                exit={{ opacity: 0, scale: 1.1, filter: 'grayscale(0%)' }}
                transition={{
                  rotate: isMusicPlaying ? { duration: 4, repeat: Infinity, ease: "linear" } : { duration: 0.5 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 }
                }}
              />
            ) : (
              <motion.img
                key="spido-nav"
                src={discordAvatar || profileImg}
                alt="SPIDO"
                className={`nav-avatar ${isMusicPlaying ? 'playing' : ''} spido-nav-avatar`}
                initial={{ opacity: 0, scale: 1.2, filter: 'grayscale(0%)' }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: 'grayscale(0%)',
                  rotate: isMusicPlaying ? 360 : 0
                }}
                exit={{ opacity: 0, scale: 0.9, filter: 'grayscale(100%)' }}
                transition={{
                  rotate: isMusicPlaying ? { duration: 4, repeat: Infinity, ease: "linear" } : { duration: 0.5 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 }
                }}
              />
            )}
          </AnimatePresence>
          <span className={`mono status-indicator ${isMusicPlaying ? 'active' : ''}`}></span>
          <div className="theme-tooltip mono">
            <span className="desktop-info">{isMusicPlaying ? "L: THEME | R: PAUSE" : "L: THEME | R: PLAY"}</span>
            <span className="mobile-info">{isMusicPlaying ? "TAP: THEME | HOLD: PAUSE" : "TAP: THEME | HOLD: PLAY"}</span>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="mobile-toggle" onClick={toggleMenu}>
        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="nav-links desktop-only">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item mono ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.name}
            {location.pathname === item.path && (
              <motion.div
                layoutId="nav-underline"
                className="nav-underline"
                initial={false}
              />
            )}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => {
              // Close menu when clicking the overlay background
              if (e.target.classList.contains('mobile-menu-overlay')) {
                setIsMenuOpen(false);
              }
            }}
          >
            <div className="mobile-menu-bg-graphic">
              <AnimatePresence mode="wait">
                <motion.img
                  key={isSpidoMode ? 'spido-bg' : 'normal-bg'}
                  src={isSpidoMode ? (discordAvatar || profileImg) : profileImg}
                  alt=""
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
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
                      <motion.div
                        className="active-badge mono"
                        layoutId="active-badge"
                      >
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
