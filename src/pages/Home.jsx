import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { ShieldAlert, BrainCircuit, ShieldCheck } from 'lucide-react';
import HeroVisual from '../components/HeroVisual';
import './Home.css';

const spring = (delay = 0, stiffness = 300, damping = 22) => ({
  type: 'spring', stiffness, damping, delay,
});

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 22 } },
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

      {/* ── Cipher hero ── */}
      <section className="cipher-hero" data-section="HERO" aria-label="Profile">
        <div className="bracket bracket-tl" aria-hidden="true" />
        <div className="bracket bracket-tr" aria-hidden="true" />
        <div className="bracket bracket-bl" aria-hidden="true" />
        <div className="bracket bracket-br" aria-hidden="true" />
        <div className="cipher-grid-h" aria-hidden="true" />
        <div className="cipher-grid-v" aria-hidden="true" />

        {/* Central portrait */}
        <div className="cipher-visual">
          <HeroVisual />
          <div className="profile-container">
            <motion.img
              src={discordAvatar || '/profile2.png'}
              alt="Muhammad Salih P.K."
              className="profile-img"
              initial={{ opacity: 0, scale: 0.72 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={spring(0.08, 220, 18)}
              onError={e => { e.target.src = '/profile2.png'; }}
            />
            <div className="profile-shader" aria-hidden="true" />
          </div>
        </div>

        {/* Name bar */}
        <motion.div
          className="cipher-name-bar"
          initial={{ opacity: 0, scaleX: 0.55 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={spring(0.2, 300, 24)}
        >
          <h1
            className="mono cipher-name"
            onMouseEnter={e => triggerGlitch(e.target, 'MUHAMMED SALIH')}
            onMouseLeave={e => triggerGlitch(e.target, 'MUHAMMED SALIH')}
          >
            MUHAMMED SALIH
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="mono cipher-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={spring(0.32, 320, 28)}
        >
          CYBERSEC_ASPIRANT · AI_ENTHUSIAST · CREATIVE_DEV
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="cipher-cta"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring(0.42, 300, 26)}
        >
          <Link
            to="/projects"
            className="cyber-btn"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <span className="btn-glitch" />
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
            <div className="card-label-row">
              <span className="mono skill-id">{id}_</span>
              <span className="mono skill-name">{label}</span>
            </div>
            <div className="skill-body">
              <div className={`desktop-icon ${anim}`}>
                <Icon className="card-icon" size={24} />
              </div>
              <p>{desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>

    </PageTransition>
  );
};

export default Home;
