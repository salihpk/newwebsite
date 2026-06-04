import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, LayoutDashboard, BookOpen, Trophy, FileText, Shield, Terminal, Bug, LogOut, Eye, EyeOff } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import './Admin.css';

// Lazy load each panel
const ModuleTracker   = lazy(() => import('./admin/ModuleTracker'));
const LearningLog     = lazy(() => import('./admin/LearningLog'));
const Achievements    = lazy(() => import('./admin/Achievements'));
const CheatSheet      = lazy(() => import('./admin/CheatSheet'));
const VulnLog         = lazy(() => import('./admin/VulnLog'));

const ADMIN_PASSWORD = 'spido2025';   // change this to whatever you want
const SESSION_KEY    = 'admin_session';

const NAV = [
    { id: 'modules',  label: 'Module Tracker',    icon: LayoutDashboard, phase: 'core' },
    { id: 'log',      label: 'Learning Log',       icon: BookOpen,        phase: 'core' },
    { id: 'achieve',  label: 'Achievements',       icon: Trophy,          phase: 'core' },
    { id: 'cheat',    label: 'Cheat Sheets',       icon: Terminal,        phase: 'core' },
    { id: 'vuln',     label: 'Vuln Log',           icon: Bug,             phase: 'core' },
    { id: 'ai',       label: 'AI Reports',         icon: FileText,        phase: 'phase2' },
    { id: 'security', label: 'Security Controls',  icon: Shield,          phase: 'phase2' },
];

function LoginScreen({ onLogin }) {
    const [pw, setPw]         = useState('');
    const [show, setShow]     = useState(false);
    const [error, setError]   = useState('');
    const [shake, setShake]   = useState(false);

    const attempt = (e) => {
        e.preventDefault();
        if (pw === ADMIN_PASSWORD) {
            sessionStorage.setItem(SESSION_KEY, '1');
            onLogin();
        } else {
            setError('ACCESS_DENIED: Invalid credentials');
            setShake(true);
            setTimeout(() => setShake(false), 600);
            setPw('');
        }
    };

    return (
        <div className="admin-login-wrap">
            <motion.div
                className={`admin-login-card glass-card ${shake ? 'shake' : ''}`}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="admin-login-icon">
                    <Lock size={28} />
                </div>
                <h2 className="mono admin-login-title">ADMIN_ACCESS</h2>
                <p className="admin-login-sub mono">Restricted — authenticate to continue</p>
                <form onSubmit={attempt} className="admin-login-form">
                    <div className="admin-pw-row">
                        <input
                            type={show ? 'text' : 'password'}
                            className="admin-pw-input mono"
                            placeholder="> enter_password"
                            value={pw}
                            onChange={e => { setPw(e.target.value); setError(''); }}
                            autoFocus
                        />
                        <button type="button" className="admin-pw-toggle" onClick={() => setShow(s => !s)}>
                            {show ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                    </div>
                    <AnimatePresence>
                        {error && (
                            <motion.p
                                className="admin-login-error mono"
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                {error}
                            </motion.p>
                        )}
                    </AnimatePresence>
                    <button type="submit" className="cyber-btn admin-login-btn">
                        AUTHENTICATE
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

function Phase2Placeholder({ label, icon: Icon }) {
    return (
        <div className="admin-ph2">
            <Icon size={40} className="admin-ph2-icon" />
            <h3 className="mono">{label.toUpperCase().replace(' ', '_')}</h3>
            <p className="mono admin-ph2-tag">// PHASE_2 — coming soon</p>
            <p>This feature is planned for Phase 2. Check back after the core modules are complete.</p>
        </div>
    );
}

export default function Admin() {
    const [authed, setAuthed]     = useState(() => !!sessionStorage.getItem(SESSION_KEY));
    const [active, setActive]     = useState('modules');
    const [sideOpen, setSideOpen] = useState(false);

    const logout = () => {
        sessionStorage.removeItem(SESSION_KEY);
        setAuthed(false);
    };

    if (!authed) return (
        <PageTransition className="page-container">
            <LoginScreen onLogin={() => setAuthed(true)} />
        </PageTransition>
    );

    const activeNav = NAV.find(n => n.id === active);

    const renderPanel = () => {
        switch (active) {
            case 'modules': return <ModuleTracker />;
            case 'log':     return <LearningLog />;
            case 'achieve': return <Achievements />;
            case 'cheat':   return <CheatSheet />;
            case 'vuln':    return <VulnLog />;
            case 'ai':      return <Phase2Placeholder label="AI Reports" icon={FileText} />;
            case 'security':return <Phase2Placeholder label="Security Controls" icon={Shield} />;
            default:        return null;
        }
    };

    return (
        <PageTransition className="page-container admin-page">
            <div className="admin-layout">
                {/* Sidebar */}
                <aside className={`admin-sidebar ${sideOpen ? 'open' : ''}`}>
                    <div className="admin-sidebar-header mono">
                        <span className="admin-sidebar-brand">SPIDO:// ADMIN</span>
                    </div>
                    <nav className="admin-nav">
                        {NAV.map(item => (
                            <button
                                key={item.id}
                                className={`admin-nav-item ${active === item.id ? 'active' : ''} ${item.phase === 'phase2' ? 'phase2' : ''}`}
                                onClick={() => { setActive(item.id); setSideOpen(false); }}
                            >
                                <item.icon size={16} />
                                <span className="mono">{item.label}</span>
                                {item.phase === 'phase2' && <span className="admin-nav-tag mono">P2</span>}
                            </button>
                        ))}
                    </nav>
                    <button className="admin-logout mono" onClick={logout}>
                        <LogOut size={14} /> LOGOUT
                    </button>
                </aside>

                {/* Main */}
                <div className="admin-main" onClick={() => sideOpen && setSideOpen(false)}>
                    {/* Topbar */}
                    <header className="admin-topbar">
                        <button className="admin-hamburger" onClick={e => { e.stopPropagation(); setSideOpen(s => !s); }}>
                            <span /><span /><span />
                        </button>
                        <div className="admin-topbar-title mono">
                            {activeNav?.icon && <activeNav.icon size={16} />}
                            {activeNav?.label.toUpperCase().replace(' ', '_')}
                        </div>
                        <button className="admin-logout-top mono" onClick={logout}>
                            <LogOut size={13} />
                        </button>
                    </header>

                    <div className="admin-content">
                        <Suspense fallback={<div className="admin-loading mono">&gt; LOADING MODULE...</div>}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.22 }}
                                >
                                    {renderPanel()}
                                </motion.div>
                            </AnimatePresence>
                        </Suspense>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
