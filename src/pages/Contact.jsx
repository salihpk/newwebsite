import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Instagram, Linkedin, MapPin, ExternalLink, Send, MessageSquare, Terminal as TerminalIcon } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    email: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const RECIPIENT = "salihpk0138@gmail.com";
    const mailSubject = encodeURIComponent(formData.subject);
    const mailBody = encodeURIComponent(
      `From: ${formData.email}\n\n${formData.message}`
    );

    window.location.href = `mailto:${RECIPIENT}?subject=${mailSubject}&body=${mailBody}`;

    setIsSubmitted(true);
    setFormData({ email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <PageTransition className="page-container contact-page">
      <div className="contact-grid">
        <motion.div 
           className="contact-info"
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
           initial={{ opacity: 0, x: 30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-header mono">SEND_DATA_PACKET</div>

            <div className="input-group">
              <label className="mono">IDENTIFIER_EMAIL:</label>
              <input
                type="email"
                required
                className="mono"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label className="mono">DATA_SUBJECT:</label>
              <input
                type="text"
                required
                className="mono"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label className="mono">PAYLOAD_MESSAGE:</label>
              <textarea
                required
                className="mono"
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <button type="submit" className="cyber-btn mono" disabled={isSubmitted}>
              {isSubmitted ? "TRANSMISSION_COMPLETE" : "TRANSMIT()"}
            </button>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mono text-xs mt-4"
                style={{ color: 'var(--primary-color)' }}
              >
                {'>'} PACKET_RECEIVED: ENCRYPTED_AND_STORED
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Contact;
