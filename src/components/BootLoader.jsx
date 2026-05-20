import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  'INITIALIZING_KERNEL...',
  'LOADING_MODULES...',
  'MOUNTING_FILESYSTEM...',
  'ESTABLISHING_SECURE_LINK...',
  'SYSTEM_READY',
];

const BootLoader = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Already shown this session — skip immediately
    if (sessionStorage.getItem('booted')) {
      setVisible(false);
      onDone();
      return;
    }

    // Drive progress from 0 → 100 over ~1.4 s
    const start = performance.now();
    const duration = 1400;

    const tick = (now) => {
      const elapsed = now - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      setLineIdx(Math.floor((p / 100) * (BOOT_LINES.length - 1)));

      if (p < 100) {
        requestAnimationFrame(tick);
      } else {
        // Short pause at 100 %, then fade out
        setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem('booted', '1');
          setTimeout(onDone, 500); // matches exit duration
        }, 280);
      }
    };

    requestAnimationFrame(tick);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Animated grid lines */}
          <div className="boot-grid" aria-hidden="true" />

          <div className="boot-inner">
            {/* Logo */}
            <motion.div
              className="boot-logo mono"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              SYS<span className="boot-sep">://</span>BOOT
            </motion.div>

            {/* Progress bar */}
            <div className="boot-bar-track">
              <motion.div
                className="boot-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Status line */}
            <motion.p
              className="boot-status mono"
              key={lineIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="boot-prompt">{'>'}</span>
              {BOOT_LINES[lineIdx]}
              <span className="boot-cursor" />
            </motion.p>

            {/* Percentage */}
            <p className="boot-pct mono">{Math.floor(progress)}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootLoader;
