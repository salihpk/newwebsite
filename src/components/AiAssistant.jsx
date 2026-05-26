import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, ChevronDown } from 'lucide-react';
import './AiAssistant.css';

const WELCOME = {
    role: 'assistant',
    content: `> SPIDO-AI // ONLINE\n> Ready. Ask me anything about Muhammed Salih — skills, projects, hiring, or just chat.`,
};

const SUGGESTIONS = [
    'Who is SPIDO?',
    'What are his skills?',
    'Can I hire him?',
    'Download his CV',
];

function TypingIndicator() {
    return (
        <div className="ai-msg ai-msg--bot ai-typing">
            <span /><span /><span />
        </div>
    );
}

function Message({ msg }) {
    const isBot = msg.role === 'assistant';
    return (
        <motion.div
            className={`ai-msg ${isBot ? 'ai-msg--bot' : 'ai-msg--user'}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
        >
            {msg.content.split('\n').map((line, i) => (
                <span key={i}>
                    {line}
                    {i < msg.content.split('\n').length - 1 && <br />}
                </span>
            ))}
        </motion.div>
    );
}

export default function AiAssistant() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([WELCOME]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    // Scroll to bottom on new messages
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    // Focus input when opening
    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 300);
    }, [open]);

    const send = useCallback(async (text) => {
        const content = (text || input).trim();
        if (!content || loading) return;

        setInput('');
        setError('');
        const userMsg = { role: 'user', content };
        const nextMessages = [...messages, userMsg];
        setMessages(nextMessages);
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: nextMessages.filter(m => m !== WELCOME),
                }),
            });

            const data = await res.json();
            if (!res.ok || !data.reply) throw new Error(data.error || 'No reply');

            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        } catch (err) {
            setError('> CONNECTION_ERROR: ' + (err.message || 'Try again'));
        } finally {
            setLoading(false);
        }
    }, [input, loading, messages]);

    const handleKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };

    return (
        <>
            {/* Floating trigger button */}
            <motion.button
                className="ai-fab"
                onClick={() => setOpen(o => !o)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.93 }}
                aria-label="Open AI Assistant"
            >
                <AnimatePresence mode="wait" initial={false}>
                    {open ? (
                        <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                            <ChevronDown size={20} />
                        </motion.span>
                    ) : (
                        <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                            <Bot size={20} />
                        </motion.span>
                    )}
                </AnimatePresence>
                {!open && <span className="ai-fab-pip" />}
            </motion.button>

            {/* Chat panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="ai-panel"
                        initial={{ opacity: 0, y: 20, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.96 }}
                        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Header */}
                        <div className="ai-header">
                            <div className="ai-header-left">
                                <span className="ai-status-pip" />
                                <span className="ai-header-title mono">SPIDO-AI</span>
                                <span className="ai-header-sub mono">// ONLINE</span>
                            </div>
                            <button className="ai-close" onClick={() => setOpen(false)} aria-label="Close">
                                <X size={14} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="ai-messages">
                            {messages.map((msg, i) => (
                                <Message key={i} msg={msg} />
                            ))}
                            {loading && <TypingIndicator />}
                            {error && (
                                <div className="ai-error mono">{error}</div>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        {/* Suggestions (only when just welcome message) */}
                        {messages.length === 1 && (
                            <div className="ai-suggestions">
                                {SUGGESTIONS.map(s => (
                                    <button
                                        key={s}
                                        className="ai-suggestion mono"
                                        onClick={() => send(s)}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="ai-input-row">
                            <span className="ai-prompt-prefix mono">&gt;</span>
                            <textarea
                                ref={inputRef}
                                className="ai-input mono"
                                placeholder="Type a message..."
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKey}
                                rows={1}
                                disabled={loading}
                            />
                            <button
                                className="ai-send"
                                onClick={() => send()}
                                disabled={!input.trim() || loading}
                                aria-label="Send"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
