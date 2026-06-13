import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCTFState, CTF_TOTAL } from '../ctf/ctf';
import './CTFTracker.css';

// Listens to the CTF engine's window events and renders:
//   • a small progress HUD once the first fragment is captured
//   • a full-screen ACCESS_GRANTED overlay when all fragments are in
const CTFTracker = () => {
  const [count, setCount] = useState(() => getCTFState().found);
  const [complete, setComplete] = useState(() => getCTFState().complete);
  const [flag, setFlag] = useState(() => getCTFState().flag);
  const [showOverlay, setShowOverlay] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const onFound = (e) => {
      setCount(e.detail.found);
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    };
    const onComplete = (e) => {
      setComplete(true);
      setFlag(e.detail.flag);
      setCount(CTF_TOTAL);
      if (!e.detail.silent) setShowOverlay(true);
    };
    const onReset = () => {
      setCount(0);
      setComplete(false);
      setFlag(null);
      setShowOverlay(false);
    };
    window.addEventListener('ctf:found', onFound);
    window.addEventListener('ctf:complete', onComplete);
    window.addEventListener('ctf:reset', onReset);
    return () => {
      window.removeEventListener('ctf:found', onFound);
      window.removeEventListener('ctf:complete', onComplete);
      window.removeEventListener('ctf:reset', onReset);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {count > 0 && (
          <motion.button
            type="button"
            className={`ctf-hud mono ${complete ? 'ctf-hud--done' : ''} ${pulse ? 'ctf-hud--pulse' : ''}`}
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            onClick={() => complete && setShowOverlay(true)}
            aria-label={`CTF progress ${count} of ${CTF_TOTAL} fragments`}
            title={complete ? 'ACCESS GRANTED — view flag' : 'Intrusion challenge in progress'}
          >
            <span className="ctf-hud-icon">{complete ? '✓' : '⌖'}</span>
            <span className="ctf-hud-label">CTF</span>
            <span className="ctf-hud-bars" aria-hidden="true">
              {Array.from({ length: CTF_TOTAL }).map((_, i) => (
                <span key={i} className={`ctf-bar ${i < count ? 'on' : ''}`} />
              ))}
            </span>
            <span className="ctf-hud-count">{count}/{CTF_TOTAL}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showOverlay && complete && (
          <motion.div
            className="ctf-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowOverlay(false)}
          >
            <motion.div
              className="ctf-panel mono"
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="ctf-panel-scan" aria-hidden="true" />
              <div className="ctf-panel-tag">root@spido:~#</div>
              <h2 className="ctf-panel-title">ACCESS_GRANTED</h2>
              <p className="ctf-panel-sub">All 3 fragments recovered. Core breached.</p>
              <div className="ctf-flag">{flag}</div>
              <p className="ctf-panel-note">
                Nicely done, operator. You read the source, found the hidden node,
                and decoded the signature. That&apos;s the mindset I build with.
              </p>
              <button type="button" className="ctf-close" onClick={() => setShowOverlay(false)}>
                CLOSE_SESSION
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CTFTracker;
