import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useLocalStorage from '../../hooks/useLocalStorage';

const SEVERITIES = ['Low', 'Medium', 'High', 'Critical'];
const EMPTY = { name: '', severity: 'Medium', affected_system: '', description: '', remediation: '' };

function sevBadge(s) {
    const map = { Low: 'badge-low', Medium: 'badge-medium', High: 'badge-high', Critical: 'badge-critical' };
    return `badge ${map[s] || 'badge-low'}`;
}

function VulnForm({ initial = EMPTY, onSave, onCancel }) {
    const [form, setForm] = useState({ ...initial });
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const submit = (e) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        onSave(form);
    };

    return (
        <form onSubmit={submit} className="admin-card" style={{ marginBottom: 20 }}>
            <div className="admin-form-row cols-3">
                <div>
                    <label className="admin-label">VULN NAME / TYPE *</label>
                    <input className="admin-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. SQL Injection" required />
                </div>
                <div>
                    <label className="admin-label">SEVERITY</label>
                    <select className="admin-select" value={form.severity} onChange={e => set('severity', e.target.value)}>
                        {SEVERITIES.map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                    <label className="admin-label">AFFECTED SYSTEM / LAB</label>
                    <input className="admin-input" value={form.affected_system} onChange={e => set('affected_system', e.target.value)} placeholder="e.g. HackTheBox — Lame" />
                </div>
            </div>
            <div className="admin-form-row cols-2">
                <div>
                    <label className="admin-label">DESCRIPTION</label>
                    <textarea className="admin-textarea" value={form.description} onChange={e => set('description', e.target.value)} placeholder="What the vulnerability is, how it was found..." />
                </div>
                <div>
                    <label className="admin-label">REMEDIATION NOTES</label>
                    <textarea className="admin-textarea" value={form.remediation} onChange={e => set('remediation', e.target.value)} placeholder="How to fix / mitigate..." />
                </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit" className="admin-btn"><Check size={13} /> SAVE</button>
                <button type="button" className="admin-btn danger" onClick={onCancel}><X size={13} /> CANCEL</button>
            </div>
        </form>
    );
}

export default function VulnLog() {
    const [vulns, setVulns]     = useLocalStorage('admin_vulns', []);
    const [adding, setAdding]   = useState(false);
    const [editId, setEditId]   = useState(null);
    const [search, setSearch]   = useState('');
    const [sevFilter, setSev]   = useState('');
    const [sysFilter, setSys]   = useState('');

    const addVuln    = (data) => { setVulns(v => [...v, { ...data, id: Date.now(), created_at: new Date().toISOString() }]); setAdding(false); };
    const updateVuln = (id, data) => { setVulns(v => v.map(x => x.id === id ? { ...x, ...data } : x)); setEditId(null); };
    const deleteVuln = (id) => { if (confirm('Delete this entry?')) setVulns(v => v.filter(x => x.id !== id)); };

    const systems = [...new Set(vulns.map(v => v.affected_system).filter(Boolean))].sort();

    const filtered = vulns
        .filter(v => !sevFilter || v.severity === sevFilter)
        .filter(v => !sysFilter || v.affected_system === sysFilter)
        .filter(v => !search || v.name.toLowerCase().includes(search.toLowerCase()) || v.description?.toLowerCase().includes(search.toLowerCase()));

    const counts = SEVERITIES.reduce((a, s) => ({ ...a, [s]: vulns.filter(v => v.severity === s).length }), {});

    return (
        <div>
            <p className="admin-section-title mono">// 07_VULNERABILITY_LOG</p>

            {/* Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 10, marginBottom: 20 }}>
                {SEVERITIES.map(s => (
                    <div key={s} className="admin-card" style={{ margin: 0, padding: '12px 14px', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'Fira Code', color: 'var(--text-color)' }}>{counts[s]}</div>
                        <span className={sevBadge(s)} style={{ marginTop: 4, display: 'inline-block' }}>{s}</span>
                    </div>
                ))}
            </div>

            <div className="admin-filter-row">
                <div className="admin-search" style={{ position: 'relative' }}>
                    <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                    <input className="admin-input" style={{ paddingLeft: 28 }} placeholder="Search vulns..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <select className="admin-select" style={{ width: 'auto', minWidth: 110 }} value={sevFilter} onChange={e => setSev(e.target.value)}>
                    <option value="">All Severity</option>
                    {SEVERITIES.map(s => <option key={s}>{s}</option>)}
                </select>
                <select className="admin-select" style={{ width: 'auto', minWidth: 140 }} value={sysFilter} onChange={e => setSys(e.target.value)}>
                    <option value="">All Systems</option>
                    {systems.map(s => <option key={s}>{s}</option>)}
                </select>
                <button className="admin-btn" style={{ marginLeft: 'auto' }} onClick={() => { setAdding(true); setEditId(null); }}>
                    <Plus size={13} /> LOG_VULN
                </button>
            </div>

            <AnimatePresence>
                {adding && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                        <VulnForm onSave={addVuln} onCancel={() => setAdding(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {filtered.length === 0 ? (
                <div className="admin-empty">&gt; NO_VULNERABILITIES_LOGGED</div>
            ) : (
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr><th>VULN / TYPE</th><th>SEVERITY</th><th>AFFECTED SYSTEM</th><th>DESCRIPTION</th><th>REMEDIATION</th><th>ACTIONS</th></tr>
                        </thead>
                        <tbody>
                            {filtered.map(vuln => (
                                <React.Fragment key={vuln.id}>
                                    <tr>
                                        <td style={{ fontWeight: 500, maxWidth: 160 }}>{vuln.name}</td>
                                        <td><span className={sevBadge(vuln.severity)}>{vuln.severity}</span></td>
                                        <td style={{ fontSize: '0.75rem', color: 'var(--text-dim)', maxWidth: 140 }}>{vuln.affected_system || '—'}</td>
                                        <td style={{ fontSize: '0.75rem', maxWidth: 200, color: 'var(--text-dim)' }}>{vuln.description || '—'}</td>
                                        <td style={{ fontSize: '0.75rem', maxWidth: 180, color: 'var(--text-dim)' }}>{vuln.remediation || '—'}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: 6 }}>
                                                <button className="admin-btn sm" onClick={() => { setEditId(vuln.id); setAdding(false); }}><Pencil size={11} /></button>
                                                <button className="admin-btn sm danger" onClick={() => deleteVuln(vuln.id)}><Trash2 size={11} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                    {editId === vuln.id && (
                                        <tr>
                                            <td colSpan={6} style={{ padding: '12px 0' }}>
                                                <VulnForm initial={vuln} onSave={d => updateVuln(vuln.id, d)} onCancel={() => setEditId(null)} />
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
