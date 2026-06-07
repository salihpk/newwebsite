import React, { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { ShieldAlert, BrainCircuit, ShieldCheck } from 'lucide-react';
import './Home.css';

const ThreeCanvas = lazy(() => import('./HomeThreeCanvas'));

const DISCORD_USER_ID = '577248513654784020';

const Home = () => {
  const [coreScale, setCoreScale] = useState(2.4);
  const [themeColor, setThemeColor] = useState('#00ff41');
  const [discordAvatar, setDiscordAvatar] = useState(null);

  useEffect(() => {
    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`)
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        if (json?.success && json.data.discord_user.avatar) {
          setDiscordAvatar(
            `https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/${json.data.discord_user.avatar}.png?size=512`
          );
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const updateThemeColor = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setThemeColor(theme === 'light' ? '#2563eb' : '#00ff41');
    };
    updateThemeColor();
    const observer = new MutationObserver(updateThemeColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCoreScale(2.8);
      else if (window.innerWidth < 1024) setCoreScale(3.2);
      else setCoreScale(2.4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const triggerGlitch = (target, targetText) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let iteration = 0;
    if (target.interval) clearInterval(target.interval);
    target.interval = setInterval(() => {
      target.innerText = targetText
        .split('')
        .map((letter, index) => {
          if (index < iteration) return targetText[index];
          return letters[Math.floor(Math.random() * 26)];
        })
        .join('');
      if (iteration >= targetText.length) clearInterval(target.interval);
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <PageTransition className="page-container home-page">
      <div className="hero-section" data-section="HOME">
        <div className="hero-content">
          <motion.h1
            className="glitch-text"
            data-value="MUHAMMED SALIH"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={(e) => triggerGlitch(e.target, 'MUHAMMED SALIH')}
            onMouseLeave={(e) => triggerGlitch(e.target, 'MUHAMMED SALIH')}
          >
            MUHAMMED SALIH
          </motion.h1>
          <motion.p
            className="hero-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Cyber security Aspirant | AI Enthusiast | Creative Developer
          </motion.p>
          <div className="hero-cta">
            <Link to="/projects" className="cyber-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="btn-glitch"></span>
              VIEW_PROJECTS()
            </Link>
            <a
              href="https://drive.google.com/file/d/1gcZ111j45Flnmv1ONI9QW-4nryojKrH4/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn secondary"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              DOWNLOAD_CV
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <Suspense fallback={null}>
            <ThreeCanvas scale={coreScale} color={themeColor} />
          </Suspense>
          <div className="profile-container">
            <motion.img
              src={discordAvatar || '/profile2.png'}
              alt="Muhammad Salih P.K."
              className="profile-img"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              onError={e => { e.target.src = '/profile2.png'; }}
            />
            <div className="profile-shader"></div>
          </div>
        </div>
      </div>

      <section className="info-grid" data-section="SKILLS">
        <motion.div
          className="info-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -50px 0px' }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02, y: -8 }}
        >
          <div className="card-icon-header">
            <div className="desktop-icon icon-anim-rock">
              <ShieldAlert className="card-icon" size={24} />
            </div>
            <h3 className="mono">01_VULN_RESEARCH</h3>
          </div>
          <p>Analyzing and identifying security flaws through ethical hacking and deep system inspection.</p>
        </motion.div>
        <motion.div
          className="info-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -50px 0px' }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02, y: -8 }}
        >
          <div className="card-icon-header">
            <div className="desktop-icon icon-anim-pulse">
              <BrainCircuit className="card-icon" size={24} />
            </div>
            <h3 className="mono">02_AI_LOGIC</h3>
          </div>
          <p>Integrating artificial intelligence into cybersecurity workflows for predictive analysis.</p>
        </motion.div>
        <motion.div
          className="info-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -50px 0px' }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02, y: -8 }}
        >
          <div className="card-icon-header">
            <div className="desktop-icon icon-anim-float">
              <ShieldCheck className="card-icon" size={24} />
            </div>
            <h3 className="mono">03_SECURE_BUILD</h3>
          </div>
          <p>Architecting hardened, scalable web applications with a focus on security by design.</p>
        </motion.div>
      </section>
    </PageTransition>
  );
};

export default Home;
