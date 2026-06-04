import React, { useState } from 'react';
import { Plus, Trash2, X, Check, Trophy, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useLocalStorage from '../../hooks/useLocalStorage';

const EMPTY_CERT = { cert_name: '', issuer: '', date_obtained: '', credential_url: '' };

function CertForm({ onSave, onCancel }) {
    const [form, setForm] = useState({ ...EMPTY_CERT });
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const submit = (e) => {
        e.preventDefault();
        if (!form.cert_name.trim()) return;
        onSave({ ...form, id: Date.now() });
    };

    return (
        <form onSubmit={submit} className="admin-card" style={{ marginBottom: 20 }}>
            <div className="admin-form-row cols-2">
                <div>
                    <label className="admin-label">CERT / ACHIEVEMENT NAME *</label>
                    <input className="admin-input" value={form.cert_name} onChange={e => set('cert_name', e.target.value)} placeholder="e.g. CompTIA Security+" required />
                </div>
                <div>
                    <label className="admin-label">ISSUER</label>
                    <input className="admin-input" value={form.issuer} onChange={e => set('issuer', e.target.value)} placeholder="e.g. CompTIA" />
                </div>
            </div>
            <div className="admin-form-row cols-2">
                <div>
                    <label className="admin-label">DATE OBTAINED</label>
                    <input className="admin-input" type="date" value={form.date_obtained} onChange={e => set('date_obtained', e.target.value)} />
                </div>
                <div>
                    <label className="admin-label">CREDENTIAL URL</label>
                    <input className="admin-input" value={form.credential_url} onChange={e => set('credential_url', e.target.value)} placeholder="https://..." />
                </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit" className="admin-btn"><Check size={13} /> SAVE</button>
                <button type="button" className="admin-btn danger" onClick={onCancel}><X size={13} /> CANCEL</button>
            </div>
        </form>
    );
}

export default function Achievements() {
    const [certs, setCerts]       = useLocalStorage('admin_certs', []);
    const [modules]               = useLocalStorage('admin_modules', []);
    const [adding, setAdding]     = useState(false);

    const addCert = (data) => {
        setCerts(c => [...c, data]);
        setAdding(false);
    };

    const deleteCert = (id) => {
        if (confirm('Remove this achievement?')) setCerts(c => c.filter(x => x.id !== id));
    };

    const completedModules = modules.filter(m => m.status === 'Complete');

    return (
        <div>
            <p className="admin-section-title mono">// 03_ACHIEVEMENT_DASHBOARD</p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
                {[
                    ['MODULES DONE', completedModules.length],
                    ['CERTIFICATIONS', certs.length],
                    ['TOTAL ACHIEVEMENTS', completedModules.length + certs.length],
                ].map(([label, val]) => (
                    <div key={label} className="admin-card" style={{ padding: '16px', textAlign: 'center', margin: 0 }}>
                        <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--primary-color)', fontFamily: 'Fira Code' }}>{val}</div>
                        <div className="admin-label" style={{ margin: 0 }}>{label}</div>
                    </div>
                ))}
            </div>

            {/* Certifications */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>CERTIFICATIONS &amp; BADGES</span>
                <button className="admin-btn" onClick={() => setAdding(true)}><Plus size={13} /> ADD_CERT</button>
            </div>

            <AnimatePresence>
                {adding && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                        <CertForm onSave={addCert} onCancel={() => setAdding(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {certs.length === 0 ? (
                <div className="admin-empty" style={{ marginBottom: 24 }}>&gt; NO_CERTIFICATIONS_YET</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12, marginBottom: 24 }}>
                    {certs.map(cert => (
                        <motion.div key={cert.id} className="admin-card" style={{ margin: 0, position: 'relative' }}
                            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
                            <button className="admin-btn sm danger" style={{ position: 'absolute', top: 10, right: 10 }} onClick={() => deleteCert(cert.id)}><Trash2 size={11} /></button>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(var(--primary-color-rgb),0.12)', border: '1px solid rgba(var(--primary-color-rgb),0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)', flexShrink: 0 }}>
                                    <Trophy size={16} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.82rem', paddingRight: 28 }}>{cert.cert_name}</div>
                                    {cert.issuer && <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{cert.issuer}</div>}
                                </div>
                            </div>
                            {cert.date_obtained && (
                                <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginBottom: 4 }}>
                                    OBTAINED: {cert.date_obtained}
                                </div>
                            )}
                            {cert.credential_url && (
                                <a href={cert.credential_url} target="_blank" rel="noopener noreferrer"
                                    className="admin-btn sm" style={{ textDecoration: 'none', display: 'inline-flex', marginTop: 6 }}>
                                    <ExternalLink size={11} /> VERIFY
                                </a>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Completed Modules */}
            <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: 12 }}>
                COMPLETED MODULES (from tracker)
            </div>
            {completedModules.length === 0 ? (
                <div className="admin-empty">&gt; NO_COMPLETED_MODULES_YET</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
                    {completedModules.map(mod => (
                        <div key={mod.id} className="admin-card" style={{ margin: 0, padding: '12px 14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ color: 'var(--primary-color)', fontSize: '1rem' }}>✓</span>
                                <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{mod.title}</span>
                            </div>
                            {mod.finish_date && <div className="mono" style={{ fontSize: '0.63rem', color: 'var(--text-dim)', marginTop: 4 }}>FINISHED: {mod.finish_date}</div>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
