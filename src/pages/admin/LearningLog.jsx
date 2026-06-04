import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useLocalStorage from '../../hooks/useLocalStorage';

const today = () => new Date().toISOString().split('T')[0];

const EMPTY = { entry_date: today(), content: '', tags: '' };

function LogForm({ initial = EMPTY, onSave, onCancel }) {
    const [form, setForm] = useState({ ...initial });
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const submit = (e) => {
        e.preventDefault();
        if (!form.content.trim()) return;
        onSave({ ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) });
    };

    const tagsVal = Array.isArray(form.tags) ? form.tags.join(', ') : form.tags;

    return (
        <form onSubmit={submit} className="admin-card" style={{ marginBottom: 20 }}>
            <div className="admin-form-row cols-2">
                <div>
                    <label className="admin-label">DATE *</label>
                    <input className="admin-input" type="date" value={form.entry_date} onChange={e => set('entry_date', e.target.value)} required />
                </div>
                <div>
                    <label className="admin-label">TAGS (comma-separated)</label>
                    <input className="admin-input" value={tagsVal} onChange={e => set('tags', e.target.value)} placeholder="web, network, AD" />
                </div>
            </div>
            <div className="admin-form-row">
                <div>
                    <label className="admin-label">CONTENT *</label>
                    <textarea className="admin-textarea" style={{ minHeight: 100 }} value={form.content}
                        onChange={e => set('content', e.target.value)} placeholder="What did you study / practice today?" required />
                </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit" className="admin-btn"><Check size={13} /> SAVE</button>
                <button type="button" className="admin-btn danger" onClick={onCancel}><X size={13} /> CANCEL</button>
            </div>
        </form>
    );
}

export default function LearningLog() {
    const [entries, setEntries] = useLocalStorage('admin_log', []);
    const [adding, setAdding]   = useState(false);
    const [editId, setEditId]   = useState(null);
    const [search, setSearch]   = useState('');
    const [tagFilter, setTagFilter] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo]     = useState('');

    const addEntry = (data) => {
        setEntries(e => [{ ...data, id: Date.now(), created_at: new Date().toISOString() }, ...e]);
        setAdding(false);
    };

    const updateEntry = (id, data) => {
        setEntries(e => e.map(x => x.id === id ? { ...x, ...data } : x));
        setEditId(null);
    };

    const deleteEntry = (id) => {
        if (confirm('Delete this entry?')) setEntries(e => e.filter(x => x.id !== id));
    };

    // All unique tags
    const allTags = [...new Set(entries.flatMap(e => e.tags || []))].sort();

    const filtered = entries
        .filter(e => !search || e.content.toLowerCase().includes(search.toLowerCase()))
        .filter(e => !tagFilter || (e.tags || []).includes(tagFilter))
        .filter(e => !dateFrom || e.entry_date >= dateFrom)
        .filter(e => !dateTo   || e.entry_date <= dateTo)
        .sort((a, b) => b.entry_date.localeCompare(a.entry_date));

    return (
        <div>
            <p className="admin-section-title mono">// 02_LEARNING_LOG</p>

            <div className="admin-filter-row">
                <div className="admin-search" style={{ position: 'relative' }}>
                    <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                    <input className="admin-input" style={{ paddingLeft: 28 }} placeholder="Search entries..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <select className="admin-select" style={{ width: 'auto', minWidth: 120 }} value={tagFilter} onChange={e => setTagFilter(e.target.value)}>
                    <option value="">All Tags</option>
                    {allTags.map(t => <option key={t}>{t}</option>)}
                </select>
                <input className="admin-input" type="date" style={{ width: 'auto' }} value={dateFrom} onChange={e => setDateFrom(e.target.value)} title="From" />
                <input className="admin-input" type="date" style={{ width: 'auto' }} value={dateTo} onChange={e => setDateTo(e.target.value)} title="To" />
                <button className="admin-btn" style={{ marginLeft: 'auto' }} onClick={() => { setAdding(true); setEditId(null); }}>
                    <Plus size={13} /> NEW_ENTRY
                </button>
            </div>

            <AnimatePresence>
                {adding && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                        <LogForm onSave={addEntry} onCancel={() => setAdding(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {filtered.length === 0 ? (
                <div className="admin-empty">&gt; NO_ENTRIES_FOUND</div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {filtered.map(entry => (
                        <AnimatePresence key={entry.id}>
                            {editId === entry.id ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <LogForm initial={{ ...entry, tags: (entry.tags || []).join(', ') }}
                                        onSave={d => updateEntry(entry.id, d)} onCancel={() => setEditId(null)} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="admin-card"
                                    style={{ margin: 0 }}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                                <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--primary-color)' }}>{entry.entry_date}</span>
                                                {(entry.tags || []).length > 0 && (
                                                    <div className="tag-list">
                                                        {(entry.tags || []).map(t => <span key={t} className="tag">{t}</span>)}
                                                    </div>
                                                )}
                                            </div>
                                            <p style={{ margin: 0, fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--text-color)', whiteSpace: 'pre-wrap' }}>{entry.content}</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                                            <button className="admin-btn sm" onClick={() => { setEditId(entry.id); setAdding(false); }}><Pencil size={11} /></button>
                                            <button className="admin-btn sm danger" onClick={() => deleteEntry(entry.id)}><Trash2 size={11} /></button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    ))}
                </div>
            )}
        </div>
    );
}
