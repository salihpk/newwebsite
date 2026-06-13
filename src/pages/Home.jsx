import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { ShieldAlert, BrainCircuit, ShieldCheck, ArrowRight } from 'lucide-react';
import './Home.css';

const spring = (delay = 0, stiffness = 300, damping = 22) => ({
  type: 'spring', stiffness, damping, delay,
});

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 22 } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 260, damping: 24 } },
};

const DISCORD_USER_ID = '577248513654784020';

const SKILLS = [
  {
    id: '01', label: 'VULN_RESEARCH', Icon: ShieldAlert, anim: 'icon-anim-rock',
    desc: 'Analyzing and identifying security flaws through ethical hacking and deep system inspection.',
  },
  {
    id: '02', label: 'AI_LOGIC', Icon: BrainCircuit, anim: 'icon-anim-pulse',
    desc: 'Integrating artificial intelligence into cybersecurity workflows for predictive analysis.',
  },
  {
    id: '03', label: 'SECURE_BUILD', Icon: ShieldCheck, anim: 'icon-anim-float',
    desc: 'Architecting hardened, scalable web applications with a focus on security by design.',
  },
];


const Home = () => {
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

      {/* ── Split hero ── */}
      <section className="split-hero" data-section="HERO" aria-label="Profile">
        <div className="hero-scan" aria-hidden="true" />

        {/* Left column */}
        <motion.div
          className="hero-left"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-status mono" variants={fadeLeft}>
            <div className="status-tags">
              <span className="status-dot" aria-hidden="true" />
              <span className="status-tag">CYBERSEC_ASPIRANT</span>
              <span className="status-sep" aria-hidden="true">·</span>
              <span className="status-tag">AI_ENTHUSIAST</span>
              <span className="status-sep" aria-hidden="true">·</span>
              <span className="status-tag">CREATIVE_DEV</span>
            </div>
          </motion.div>

          <motion.h1
            className="split-name mono"
            variants={fadeLeft}
            onMouseEnter={e => triggerGlitch(e.target, 'MUHAMMED SALIH')}
            onMouseLeave={e => triggerGlitch(e.target, 'MUHAMMED SALIH')}
          >
            MUHAMMED<br />SALIH
          </motion.h1>

          <motion.div className="name-divider" variants={fadeLeft} aria-hidden="true" />

          <motion.p className="hero-bio" variants={fadeLeft}>
            Security-first developer. I build things that don&apos;t break &mdash; and hunt the ones that do.
          </motion.p>


          <motion.div className="hero-cta" variants={fadeLeft}>
            <Link
              to="/projects"
              className="cyber-btn"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <span className="btn-glitch" />
              VIEW_PROJECTS()
              <ArrowRight size={14} />
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
          </motion.div>
        </motion.div>

        {/* Right column — portrait */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={spring(0.18, 220, 20)}
        >
          <div className="portrait-wrap">
            <div className="sonar-ring sonar-ring-1" aria-hidden="true" />
            <div className="sonar-ring sonar-ring-2" aria-hidden="true" />
            <div className="sonar-ring sonar-ring-3" aria-hidden="true" />
            <div className="portrait-container">
              <motion.img
                src={discordAvatar || '/profile2.png'}
                alt="Muhammad Salih P.K."
                className="portrait-img portrait-hologram"
                initial={{ opacity: 0, scaleY: 0.92 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={spring(0.28, 220, 18)}
                onError={e => { e.target.src = '/profile2.png'; }}
              />
              <div className="portrait-shader" aria-hidden="true" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Skills ── */}
      <motion.section
        className="skills-grid"
        data-section="SKILLS"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px 0px' }}
      >
        {SKILLS.map(({ id, label, Icon, anim, desc }) => (
          <motion.div
            key={id}
            className="glass-card skill-card"
            variants={fadeUp}
            whileHover={{ scale: 1.03, y: -8, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
          >
            <span className="skill-ghost-num mono" aria-hidden="true">{id}</span>
            <div className="skill-body">
              <div className={`desktop-icon ${anim}`}>
                <Icon className="card-icon" size={24} />
              </div>
              <span className="mono skill-name">{label}</span>
              <p>{desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>

    </PageTransition>
  );
};

export default Home;
