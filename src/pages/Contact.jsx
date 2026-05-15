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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const GOOGLE_FORM_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfPSPD3Rw36VP0tEDpGm4x-STrA85Gui3YmNaONa-oHMm-wRg/formResponse";

    const formDataBody = new FormData();
    formDataBody.append("entry.1070221655", formData.email);
    formDataBody.append("entry.536187874", formData.subject);
    formDataBody.append("entry.894360633", formData.message);

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: formDataBody
      });
      setIsSubmitted(true);
      setFormData({ email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Transmission Error:", error);
      alert("DATA_TRANSMISSION_FAILED_RETRY_LATER");
    }
  };

  return (
    <PageTransition className="page-container contact-page">
      <div className="contact-grid">
        <div className="contact-info">
          <div className="header-title-flex">
            <motion.div
              className="desktop-icon"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <TerminalIcon size={40} className="card-icon" />
            </motion.div>
            <h1 className="mono">CONNECT_</h1>
          </div>
          <p className="mono terminal-text">ESTABLISHING PEER-TO-PEER ENCRYPTION...</p>

          <div className="social-links mono">
            <div className="social-item">
              <span className="label">
                <motion.div
                  className="desktop-icon"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <Instagram size={16} className="card-icon" />
                </motion.div>
                INSTAGRAM:
              </span>
              <a href="https://www.instagram.com/_sali___h?igsh=eXZhcm54MHQxYXhw" target="_blank" rel="noopener noreferrer">
                @_sali___h <ExternalLink size={10} />
              </a>
            </div>
            <div className="social-item">
              <span className="label">
                <motion.div
                  className="desktop-icon"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                >
                  <Linkedin size={16} className="card-icon" />
                </motion.div>
                LINKEDIN:
              </span>
              <a href="https://www.linkedin.com/in/muhammed-salih-p-k" target="_blank" rel="noopener noreferrer">
                in/muhammed-salih-p-k <ExternalLink size={10} />
              </a>
            </div>
            <div className="social-item">
              <span className="label">
                <motion.div
                  className="desktop-icon"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                >
                  <MapPin size={16} className="card-icon" />
                </motion.div>
                LOCATION:
              </span>
              <a href="https://maps.app.goo.gl/gN8rQi3eZUN84p7d8" target="_blank" rel="noopener noreferrer">
                11°14'55.8"N 75°47'01.9"E <ExternalLink size={10} />
              </a>
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
        </div>

        <div className="contact-form-container">
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
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
