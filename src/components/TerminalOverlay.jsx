import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TerminalOverlay = () => {
  const [lines, setLines] = useState([]);
  const terminalMessages = [
    "INITIALIZING SYSTEM BOOT...",
    "LOADING KERNEL MODULES...",
    "ESTABLISHING SECURE CONNECTION...",
    "BYPASSING FIREWALLS...",
    "ACCESS GRANTED.",
    "WELCOME, MUHAMMED SALIH P K.",
    "READY FOR INPUT."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < terminalMessages.length) {
        setLines(prev => [...prev, terminalMessages[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="terminal-loader"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="terminal-window">
        {lines.map((line, i) => (
          <div key={i} className="mono terminal-line">
            <span className="prompt">{'>'}</span> {line}
          </div>
        ))}
        <div className="mono terminal-line">
          <span className="prompt">{'>'}</span><span className="blink-cursor">_</span>
        </div>
      </div>

      <style jsx>{`
        .terminal-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          padding: 20px;
        }

        .terminal-window {
          max-width: 600px;
          width: 100%;
          font-size: 1rem;
        }

        .terminal-line {
          margin-bottom: 8px;
          color: var(--primary-color);
          text-shadow: 0 0 5px var(--primary-glow);
        }

        .prompt {
          margin-right: 10px;
          opacity: 0.7;
        }

        .blink-cursor {
          display: inline-block;
          width: 8px;
          height: 18px;
          background: var(--primary-color);
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
};

export default TerminalOverlay;
