import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import PageTransition from '../components/PageTransition';
import { Instagram, Linkedin, MapPin, ExternalLink, Terminal as TerminalIcon } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [state, handleSubmit] = useForm('xojbqjgv');

  const [logs, setLogs] = useState([
    "> SYSTEM_INIT: COMPLETE",
    "> CONNECTING_TO_HOST...",
    "> CONNECTION_ESTABLISHED"
  ]);

  useEffect(() => {
    const messages = [
      "PACKET_VERIFIED: OK",
      "PING: 24ms",
      "UPDATING_CACHE...",
      "VIRUS_DB: UPDATED",
      "FIREWALL_STATUS: NOMINAL",
      "ENCRYPTING_TRAFFIC...",
      "HANDSHAKE_ACK: RECEIVED",
      "SCANNING_PORTS: 443 OPEN",
      "LATENCY_CHECK: PASS",
      "SYNCING_NODES..."
    ];

    const timer = setInterval(() => {
      setLogs(prev => {
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const newLog = `> [${timestamp}] ${messages[Math.floor(Math.random() * messages.length)]}`;
        const newLogs = [...prev, newLog];
        if (newLogs.length > 5) return newLogs.slice(1);
        return newLogs;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <PageTransition className="page-container contact-page">
      <div className="contact-grid" data-section="CONNECT">
        <motion.div
           className="contact-info"
           initial={{ opacity: 0, x: -40 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        >
          <div className="header-title-flex">
            <div className="desktop-icon">
              <TerminalIcon size={40} className="card-icon" />
            </div>
            <h1 className="mono">CONNECT_</h1>
          </div>
          <p className="mono terminal-text">ESTABLISHING PEER-TO-PEER ENCRYPTION...</p>

          <div className="social-links mono">
            <div className="social-item">
              <span className="label">
                <div className="desktop-icon">
                  <Instagram size={16} className="card-icon" />
                </div>
                INSTAGRAM:
              </span>
              <a href="https://www.instagram.com/_sali___h" target="_blank" rel="noopener noreferrer">
                @_sali___h <ExternalLink size={10} />
              </a>
            </div>
            <div className="social-item">
              <span className="label">
                <div className="desktop-icon">
                  <Linkedin size={16} className="card-icon" />
                </div>
                LINKEDIN:
              </span>
              <a href="https://www.linkedin.com/in/muhammed-salih-p-k" target="_blank" rel="noopener noreferrer">
                in/muhammed-salih-p-k <ExternalLink size={10} />
              </a>
            </div>
            <div className="social-item">
              <span className="label">
                <div className="desktop-icon">
                  <MapPin size={16} className="card-icon" />
                </div>
                LOCATION:
              </span>
              <span>KOZHIKODE, KERALA</span>
            </div>
          </div>

          <div className="system-status mono">
            <h3>SYSTEM_LOG:</h3>
            <div className="log-scroll">
              {logs.map((log, index) => (
                <div key={index} className="log-line">{log}</div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
           className="contact-form-container"
           initial={{ opacity: 0, x: 40 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.12 }}
        >
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-header mono">SEND_DATA_PACKET</div>

            <div className="input-group">
              <label htmlFor="email" className="mono">IDENTIFIER_EMAIL:</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="mono"
              />
              <ValidationError field="email" errors={state.errors}
                className="mono form-feedback error" />
            </div>

            <div className="input-group">
              <label htmlFor="subject" className="mono">DATA_SUBJECT:</label>
              <input
                id="subject"
                type="text"
                name="subject"
                required
                className="mono"
              />
              <ValidationError field="subject" errors={state.errors}
                className="mono form-feedback error" />
            </div>

            <div className="input-group">
              <label htmlFor="message" className="mono">PAYLOAD_MESSAGE:</label>
              <textarea
                id="message"
                name="message"
                required
                className="mono"
                rows="5"
              ></textarea>
              <ValidationError field="message" errors={state.errors}
                className="mono form-feedback error" />
            </div>

            <button
              type="submit"
              className="cyber-btn mono"
              disabled={state.submitting || state.succeeded}
            >
              {state.submitting
                ? 'TRANSMITTING...'
                : state.succeeded
                  ? 'TRANSMISSION_COMPLETE'
                  : 'TRANSMIT()'}
            </button>

            {state.succeeded && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mono form-feedback success"
              >
                {'>'} PACKET_RECEIVED: ENCRYPTED_AND_STORED
              </motion.div>
            )}

            {state.errors && state.errors.length > 0 && !state.errors[0]?.field && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mono form-feedback error"
              >
                {'>'} TRANSMISSION_FAILED: {state.errors[0]?.message || 'UNKNOWN_ERROR'}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Contact;
