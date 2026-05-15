import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const CyberSecurity = () => {
  const [activeChallenge, setActiveChallenge] = useState(null);

  const challenges = [
    {
      id: "SEC-01",
      title: "SQL_INJECTION_PROTECTION",
      status: "COMPLETED",
      details: "Hardening backend APIs against advanced SQL injection vectors using parameterized queries and ORM layers."
    },
    {
      id: "SEC-02",
      title: "ZERO_TRUST_ARCHITECTURE",
      status: "IN_PROGRESS",
      details: "Implementing granular access controls and identity verification for distributed microservices."
    },
    {
      id: "SEC-03",
      title: "MALWARE_REVERSING",
      status: "ANALYSIS",
      details: "Deconstructing localized ransomware samples to understand propagation methods and encryption keys."
    }
  ];

  return (
    <PageTransition className="page-container security-page">
      <div className="security-hero">
        <h1 className="mono">CYBER_SECURITY.EXE</h1>
        <p className="mono terminal-text">AUTHORIZED ACCESS ONLY // LEVEL_05_CLEARANCE</p>
      </div>

      <div className="security-content">
        <section className="terminal-display">
          <div className="terminal-header mono">
            <span>TERMINAL_V1.0.4</span>
            <div className="controls">
              <span>●</span><span>●</span><span>●</span>
            </div>
          </div>
          <div className="terminal-body mono">
            <div className="log-entry">
              <span className="timestamp">[18:01:45]</span>
              <span className="info"> INITIALIZING SECURITY OVERVIEW...</span>
            </div>
            <div className="log-entry">
              <span className="timestamp">[18:01:46]</span>
              <span className="success"> CORE DEFENSES ACTIVE.</span>
            </div>

            <div className="challenges-list">
              {challenges.map(c => (
                <motion.div
                  key={c.id}
                  className={`challenge-item ${activeChallenge === c.id ? 'active' : ''}`}
                  onClick={() => setActiveChallenge(c.id)}
                  whileHover={{ x: 10 }}
                >
                  <div className="challenge-id">{c.id}</div>
                  <div className="challenge-title">{c.title}</div>
                  <div className={`challenge-status ${c.status.toLowerCase()}`}>{c.status}</div>
                </motion.div>
              ))}
            </div>

            {activeChallenge && (
              <motion.div
                className="challenge-details"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="details-header">--- DETAILED ANALYSIS ---</div>
                <p>{challenges.find(c => c.id === activeChallenge).details}</p>
                <div className="action-row">
                  <span className="blink">_</span>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        <aside className="security-stats">
          <div className="stat-box">
            <div className="stat-label mono">THREATS_NEUTRALIZED</div>
            <div className="stat-value mono terminal-text">1,248</div>
          </div>
          <div className="stat-box">
            <div className="stat-label mono">UPTIME_PERCENTAGE</div>
            <div className="stat-value mono terminal-text">99.998%</div>
          </div>
          <div className="stat-box">
            <div className="stat-label mono">ENCRYPTION_STRENGTH</div>
            <div className="stat-value mono terminal-text">RSA_4096</div>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .security-page {
          padding-bottom: 100px;
        }

        .security-hero {
          margin-bottom: 50px;
          text-align: center;
        }

        .security-hero h1 {
          font-size: 3.5rem;
          margin-bottom: 10px;
        }

        .security-content {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 40px;
        }

        .terminal-display {
          border: 1px solid var(--border-color);
          background: var(--surface-color);
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
        }

        .terminal-header {
          background: var(--border-color);
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-dim);
        }

        .terminal-body {
          padding: 30px;
          min-height: 400px;
        }

        .log-entry {
          margin-bottom: 15px;
          font-size: 0.9rem;
        }

        .timestamp { color: var(--text-dim); opacity: 0.5; }
        .success { color: var(--primary-color); }
        .info { color: var(--glitch-blue); }

        .challenges-list {
          margin: 40px 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .challenge-item {
          padding: 15px 20px;
          background: var(--bg-color);
          opacity: 0.8;
          display: grid;
          grid-template-columns: 80px 1fr 120px;
          cursor: pointer;
          transition: all 0.3s ease;
          border-left: 2px solid transparent;
        }

        .challenge-item:hover, .challenge-item.active {
          opacity: 1;
          background: var(--surface-color);
          border-left-color: var(--primary-color);
          transform: translateX(5px);
        }

        .challenge-id { color: var(--text-dim); }
        .challenge-status { font-size: 0.75rem; text-align: right; }
        .challenge-status.completed { color: var(--primary-color); }
        .challenge-status.in_progress { color: var(--accent-color); }
        .challenge-status.analysis { color: var(--glitch-blue); }

        .challenge-details {
          margin-top: 40px;
          padding: 20px;
          border: 1px dashed var(--border-color);
          background: var(--bg-color);
          opacity: 0.9;
        }

        .details-header {
          margin-bottom: 15px;
          color: var(--text-dim);
          font-size: 0.8rem;
        }

        .security-stats {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .stat-box {
          border: 1px solid var(--border-color);
          padding: 25px;
          background: var(--surface-color);
        }

        .stat-label {
          font-size: 0.7rem;
          color: var(--text-dim);
          margin-bottom: 10px;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }

        @media (max-width: 968px) {
          .security-content { grid-template-columns: 1fr; }
          .security-hero h1 { font-size: 2.5rem; }
        }
      `}</style>
    </PageTransition>
  );
};

export default CyberSecurity;
