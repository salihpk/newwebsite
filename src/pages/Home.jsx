import React, { Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { Link } from 'react-router-dom';
import profileImg from '../assets/profile.png';
import PageTransition from '../components/PageTransition';
import { ShieldAlert, BrainCircuit, ShieldCheck, Zap, Search, Fingerprint } from 'lucide-react';
import './Home.css';

const DigitalCore = ({ scale = 2.4, color = "#00ff41" }) => {
  return (
    <Float speed={0.8} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere args={[1, 100, 200]} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0}
          emissive={color}
          emissiveIntensity={1.2}
          wireframe
        />
      </Sphere>
    </Float>
  );
};

const Home = ({ isSpidoMode, setIsSpidoMode, discordAvatar }) => {

  const [coreScale, setCoreScale] = useState(2.4);
  const [themeColor, setThemeColor] = useState("#00ff41");
  const [cvOpen, setCvOpen] = useState(false);




  useEffect(() => {
    const updateThemeColor = () => {
      if (isSpidoMode) {
        setThemeColor("#ff003c");
        return;
      }
      const theme = document.documentElement.getAttribute('data-theme');
      setThemeColor(theme === 'light' ? '#2563eb' : '#00ff41');
    };

    updateThemeColor();

    const observer = new MutationObserver(updateThemeColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, [isSpidoMode]);

  useEffect(() => {
    if (isSpidoMode) {
      document.body.classList.add('spido-mode');
    } else {
      document.body.classList.remove('spido-mode');
    }
  }, [isSpidoMode]);









  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCoreScale(2.8); // Further decreased for mobile visibility
      } else if (window.innerWidth < 1024) {
        setCoreScale(3.2);
      } else {
        setCoreScale(2.4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const triggerGlitch = (target, targetText) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iteration = 0;
    if (target.interval) clearInterval(target.interval);

    target.interval = setInterval(() => {
      target.innerText = targetText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return targetText[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= targetText.length) {
        clearInterval(target.interval);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <>
    <PageTransition className="page-container home-page">


      <div className="hero-section">
        <div className="hero-content">

          <motion.h1
            className="glitch-text"
            data-value={isSpidoMode ? "SPIDO" : "MUHAMMED SALIH"}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => {
              const newMode = !isSpidoMode;
              setIsSpidoMode(newMode);
              triggerGlitch(event.target, newMode ? "SPIDO" : "MUHAMMED SALIH");
              if (newMode) {
                const sfx = new Audio('/newsound.wav');
                sfx.volume = 0.6;
                sfx.play().catch(() => { });
              }
            }}
            onMouseEnter={(event) => {
              if (!isSpidoMode) triggerGlitch(event.target, "SPIDO");
            }}
            onMouseLeave={(event) => {
              if (!isSpidoMode) triggerGlitch(event.target, "MUHAMMED SALIH");
            }}
            style={{ cursor: 'pointer' }}
          >
            {isSpidoMode ? "SPIDO" : "MUHAMMED SALIH"}
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
            <AnimatePresence mode="wait">
              {!isSpidoMode ? (
                <motion.button
                  key="cv-btn"
                  onClick={() => setCvOpen(true)}
                  className="cyber-btn secondary"
                  style={{ cursor: 'pointer', background: 'none', fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  DOWNLOAD_CV
                </motion.button>
              ) : (
                <motion.div
                  key="arena-btn"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to="/gaming"
                    className="cyber-btn"
                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    ENTER_ARENA
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="hero-visual">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} color={themeColor} />
            <Suspense fallback={null}>
              <DigitalCore scale={coreScale} color={themeColor} />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          </Canvas>
          <div className="profile-container">
            <AnimatePresence mode="wait">
              {!isSpidoMode ? (
                <motion.img
                  key="normal-profile"
                  src={profileImg}
                  alt="Muhammad Salih P.K."
                  className="profile-img"
                  initial={{ opacity: 0, scale: 0.8, filter: 'grayscale(100%)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'grayscale(100%)' }}
                  exit={{ opacity: 0, scale: 1.1, filter: 'grayscale(0%)' }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              ) : (
                <motion.img
                  key="spido-profile"
                  src={discordAvatar || profileImg}
                  alt="SPIDO"
                  className="profile-img spido-avatar"
                  initial={{ opacity: 0, scale: 1.2, filter: 'grayscale(0%)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'grayscale(0%)' }}
                  exit={{ opacity: 0, scale: 0.9, filter: 'grayscale(100%)' }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>
            <div className="profile-shader"></div>
          </div>
        </div>
      </div>

      <section className="info-grid">
        <motion.div
          className="info-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02, y: -8 }}
        >
          <div className="card-icon-header">
            <motion.div
              className="desktop-icon"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <ShieldAlert className="card-icon" size={24} />
            </motion.div>
            <h3 className="mono">01_VULN_RESEARCH</h3>
          </div>
          <p>Analyzing and identifying security flaws through ethical hacking and deep system inspection.</p>
        </motion.div>
        <motion.div
          className="info-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02, y: -8 }}
        >
          <div className="card-icon-header">
            <motion.div
              className="desktop-icon"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <BrainCircuit className="card-icon" size={24} />
            </motion.div>
            <h3 className="mono">02_AI_LOGIC</h3>
          </div>
          <p>Integrating artificial intelligence into cybersecurity workflows for predictive analysis.</p>
        </motion.div>
        <motion.div
          className="info-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02, y: -8 }}
        >
          <div className="card-icon-header">
            <motion.div
              className="desktop-icon"
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              <ShieldCheck className="card-icon" size={24} />
            </motion.div>
            <h3 className="mono">03_SECURE_BUILD</h3>
          </div>
          <p>Architecting hardened, scalable web applications with a focus on security by design.</p>
        </motion.div>
      </section>
    </PageTransition>

    {/* CV Modal */}
    <AnimatePresence>
      {cvOpen && (
        <motion.div
          className="cv-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setCvOpen(false)}
        >
          <motion.div
            className="cv-modal-inner"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <div className="cv-modal-header mono">
              <span>CV.SYS://MUHAMMED_SALIH_PK</span>
              <div className="cv-modal-actions">
                <a
                  href="https://drive.google.com/uc?export=download&id=1gcZ111j45Flnmv1ONI9QW-4nryojKrH4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cv-dl-btn mono"
                  onClick={e => e.stopPropagation()}
                >
                  DOWNLOAD
                </a>
                <button className="cv-close-btn mono" onClick={() => setCvOpen(false)}>✕ CLOSE</button>
              </div>
            </div>
            <div className="cv-modal-body">
              <img
                src="https://drive.google.com/uc?id=1gcZ111j45Flnmv1ONI9QW-4nryojKrH4&export=view"
                alt="Muhammed Salih PK — CV"
                className="cv-modal-img"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default Home;
