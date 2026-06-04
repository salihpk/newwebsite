import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useLocalStorage from '../../hooks/useLocalStorage';

const STATUS_OPTIONS = ['Not Started', 'In Progress', 'Complete'];

const EMPTY = { title: '', status: 'Not Started', percent_complete: 0, start_date: '', finish_date: '', notes: '' };

function statusBadgeClass(s) {
    if (s === 'Complete')   return 'badge badge-complete';
    if (s === 'In Progress') return 'badge badge-in-progress';
    return 'badge badge-not-started';
}

function ModuleForm({ initial = EMPTY, onSave, onCancel }) {
    const [form, setForm] = useState({ ...initial });
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const submit = (e) => {
        e.preventDefault();
        if (!form.title.trim()) return;
        onSave({ ...form, percent_complete: Number(form.percent_complete) });
    };

    return (
        <form onSubmit={submit} className="admin-card" style={{ marginBottom: 20 }}>
            <div className="admin-form-row cols-2">
                <div>
                    <label className="admin-label">TITLE *</label>
                    <input className="admin-input" value={form.title} onChange={e => set('title', e.target.value)} placeholder="Module name" required />
                </div>
                <div>
                    <label className="admin-label">STATUS</label>
                    <select className="admin-select" value={form.status} onChange={e => set('status', e.target.value)}>
                        {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>
            </div>
            <div className="admin-form-row cols-3">
                <div>
                    <label className="admin-label">PROGRESS ({form.percent_complete}%)</label>
                    <input type="range" min="0" max="100" value={form.percent_complete}
                        onChange={e => set('percent_complete', e.target.value)}
                        style={{ width: '100%', accentColor: 'var(--primary-color)' }} />
                </div>
                <div>
                    <label className="admin-label">START DATE</label>
                    <input className="admin-input" type="date" value={form.start_date} onChange={e => set('start_date', e.target.value)} />
                </div>
                <div>
                    <label className="admin-label">FINISH DATE</label>
                    <input className="admin-input" type="date" value={form.finish_date} onChange={e => set('finish_date', e.target.value)} />
                </div>
            </div>
            <div className="admin-form-row">
                <div>
                    <label className="admin-label">NOTES</label>
                    <textarea className="admin-textarea" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Optional notes..." />
                </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit" className="admin-btn"><Check size={13} /> SAVE</button>
                <button type="button" className="admin-btn danger" onClick={onCancel}><X size={13} /> CANCEL</button>
            </div>
        </form>
    );
}

export default function ModuleTracker() {
    const [modules, setModules] = useLocalStorage('admin_modules', []);
    const [adding, setAdding]   = useState(false);
    const [editId, setEditId]   = useState(null);
    const [filter, setFilter]   = useState('All');

    const addModule = (data) => {
        setModules(m => [...m, { ...data, id: Date.now() }]);
        setAdding(false);
    };

    const updateModule = (id, data) => {
        setModules(m => m.map(x => x.id === id ? { ...x, ...data } : x));
        setEditId(null);
    };

    const deleteModule = (id) => {
        if (confirm('Delete this module?')) setModules(m => m.filter(x => x.id !== id));
    };

    const filtered = filter === 'All' ? modules : modules.filter(m => m.status === filter);

    const total     = modules.length;
    const done      = modules.filter(m => m.status === 'Complete').length;
    const inProg    = modules.filter(m => m.status === 'In Progress').length;
    const avgPct    = total ? Math.round(modules.reduce((a, m) => a + m.percent_complete, 0) / total) : 0;

    return (
        <div>
            <p className="admin-section-title mono">// 01_MODULE_DEVELOPMENT_TRACKER</p>

            {/* Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12, marginBottom: 20 }}>
                {[
                    ['TOTAL', total],
                    ['COMPLETE', done],
                    ['IN PROGRESS', inProg],
                    ['AVG PROGRESS', `${avgPct}%`],
                ].map(([label, val]) => (
                    <div key={label} className="admin-card" style={{ padding: '14px 16px', textAlign: 'center', margin: 0 }}>
                        <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-color)', fontFamily: 'Fira Code' }}>{val}</div>
                        <div className="admin-label" style={{ margin: 0 }}>{label}</div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="admin-filter-row">
                {['All', ...STATUS_OPTIONS].map(s => (
                    <button key={s} className={`admin-btn sm ${filter === s ? 'active' : ''}`}
                        style={filter === s ? { background: 'rgba(var(--primary-color-rgb),0.2)', borderColor: 'var(--primary-color)' } : {}}
                        onClick={() => setFilter(s)}>{s}</button>
                ))}
                <button className="admin-btn" style={{ marginLeft: 'auto' }} onClick={() => { setAdding(true); setEditId(null); }}>
                    <Plus size={13} /> ADD_MODULE
                </button>
            </div>

            <AnimatePresence>
                {adding && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                        <ModuleForm onSave={addModule} onCancel={() => setAdding(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {filtered.length === 0 ? (
                <div className="admin-empty">&gt; NO_MODULES_FOUND</div>
            ) : (
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr><th>TITLE</th><th>STATUS</th><th>PROGRESS</th><th>START</th><th>FINISH</th><th>ACTIONS</th></tr>
                        </thead>
                        <tbody>
                            {filtered.map(mod => (
                                <React.Fragment key={mod.id}>
                                    <tr>
                                        <td style={{ maxWidth: 220 }}>
                                            <div style={{ fontWeight: 500 }}>{mod.title}</div>
                                            {mod.notes && <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: 2 }}>{mod.notes}</div>}
                                        </td>
                                        <td><span className={statusBadgeClass(mod.status)}>{mod.status}</span></td>
                                        <td style={{ minWidth: 100 }}>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{mod.percent_complete}%</span>
                                            <div className="admin-progress"><div className="admin-progress-fill" style={{ width: `${mod.percent_complete}%` }} /></div>
                                        </td>
                                        <td style={{ fontSize: '0.73rem', color: 'var(--text-dim)' }}>{mod.start_date || '—'}</td>
                                        <td style={{ fontSize: '0.73rem', color: 'var(--text-dim)' }}>{mod.finish_date || '—'}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: 6 }}>
                                                <button className="admin-btn sm" onClick={() => { setEditId(mod.id); setAdding(false); }}><Pencil size={11} /></button>
                                                <button className="admin-btn sm danger" onClick={() => deleteModule(mod.id)}><Trash2 size={11} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                    {editId === mod.id && (
                                        <tr>
                                            <td colSpan={6} style={{ padding: '12px 0' }}>
                                                <ModuleForm initial={mod} onSave={d => updateModule(mod.id, d)} onCancel={() => setEditId(null)} />
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
