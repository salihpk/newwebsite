import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, Search, Copy, CheckCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useLocalStorage from '../../hooks/useLocalStorage';

const CATEGORIES = ['networking', 'web', 'linux', 'windows', 'AD', 'crypto', 'forensics', 'tools', 'other'];
const EMPTY = { title: '', category: 'linux', snippet: '', description: '' };

function SnippetCopy({ text }) {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        });
    };
    return (
        <button className="snippet-copy" onClick={copy} title="Copy">
            {copied ? <CheckCheck size={13} style={{ color: 'var(--primary-color)' }} /> : <Copy size={13} />}
        </button>
    );
}

function CheatForm({ initial = EMPTY, onSave, onCancel }) {
    const [form, setForm] = useState({ ...initial });
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const submit = (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.snippet.trim()) return;
        onSave(form);
    };

    return (
        <form onSubmit={submit} className="admin-card" style={{ marginBottom: 20 }}>
            <div className="admin-form-row cols-2">
                <div>
                    <label className="admin-label">TITLE *</label>
                    <input className="admin-input" value={form.title} onChange={e => set('title', e.target.value)} placeholder="Short label" required />
                </div>
                <div>
                    <label className="admin-label">CATEGORY</label>
                    <select className="admin-select" value={form.category} onChange={e => set('category', e.target.value)}>
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                </div>
            </div>
            <div className="admin-form-row">
                <div>
                    <label className="admin-label">COMMAND / SNIPPET *</label>
                    <textarea className="admin-textarea" style={{ fontFamily: 'Fira Code', minHeight: 70 }}
                        value={form.snippet} onChange={e => set('snippet', e.target.value)} placeholder="nmap -sV -p- target" required />
                </div>
            </div>
            <div className="admin-form-row">
                <div>
                    <label className="admin-label">DESCRIPTION</label>
                    <textarea className="admin-textarea" value={form.description} onChange={e => set('description', e.target.value)} placeholder="What it does / when to use" />
                </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit" className="admin-btn"><Check size={13} /> SAVE</button>
                <button type="button" className="admin-btn danger" onClick={onCancel}><X size={13} /> CANCEL</button>
            </div>
        </form>
    );
}

export default function CheatSheet() {
    const [sheets, setSheets]   = useLocalStorage('admin_cheat', []);
    const [adding, setAdding]   = useState(false);
    const [editId, setEditId]   = useState(null);
    const [search, setSearch]   = useState('');
    const [catFilter, setCat]   = useState('');

    const addSheet  = (data) => { setSheets(s => [...s, { ...data, id: Date.now() }]); setAdding(false); };
    const updateSheet = (id, data) => { setSheets(s => s.map(x => x.id === id ? { ...x, ...data } : x)); setEditId(null); };
    const deleteSheet = (id) => { if (confirm('Delete entry?')) setSheets(s => s.filter(x => x.id !== id)); };

    const filtered = sheets
        .filter(s => !catFilter || s.category === catFilter)
        .filter(s => !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.snippet.toLowerCase().includes(search.toLowerCase()) || s.description?.toLowerCase().includes(search.toLowerCase()));

    const usedCats = [...new Set(sheets.map(s => s.category))].sort();

    return (
        <div>
            <p className="admin-section-title mono">// 06_CHEAT_SHEET_SECTION</p>

            <div className="admin-filter-row">
                <div className="admin-search" style={{ position: 'relative' }}>
                    <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                    <input className="admin-input" style={{ paddingLeft: 28 }} placeholder="Search commands..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <select className="admin-select" style={{ width: 'auto', minWidth: 120 }} value={catFilter} onChange={e => setCat(e.target.value)}>
                    <option value="">All Categories</option>
                    {usedCats.map(c => <option key={c}>{c}</option>)}
                </select>
                <button className="admin-btn" style={{ marginLeft: 'auto' }} onClick={() => { setAdding(true); setEditId(null); }}>
                    <Plus size={13} /> ADD_ENTRY
                </button>
            </div>

            <AnimatePresence>
                {adding && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                        <CheatForm onSave={addSheet} onCancel={() => setAdding(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {filtered.length === 0 ? (
                <div className="admin-empty">&gt; NO_ENTRIES_FOUND</div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {filtered.map(entry => (
                        <React.Fragment key={entry.id}>
                            {editId === entry.id ? (
                                <CheatForm initial={entry} onSave={d => updateSheet(entry.id, d)} onCancel={() => setEditId(null)} />
                            ) : (
                                <motion.div className="admin-card" style={{ margin: 0 }}
                                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span style={{ fontWeight: 600, fontSize: '0.84rem' }}>{entry.title}</span>
                                            <span className="tag">{entry.category}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                                            <button className="admin-btn sm" onClick={() => { setEditId(entry.id); setAdding(false); }}><Pencil size={11} /></button>
                                            <button className="admin-btn sm danger" onClick={() => deleteSheet(entry.id)}><Trash2 size={11} /></button>
                                        </div>
                                    </div>
                                    <div className="snippet-wrap">
                                        {entry.snippet}
                                        <SnippetCopy text={entry.snippet} />
                                    </div>
                                    {entry.description && (
                                        <p style={{ margin: '8px 0 0', fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>{entry.description}</p>
                                    )}
                                </motion.div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
}
