// ════════════════════════════════════════════════════════════════
// SPIDO // INTRUSION CHALLENGE  —  hidden CTF flag hunt
// 3 fragments are scattered across the site. Each is found with a
// different recon technique (view-source → hidden route → base64).
// Players submit fragments from the devtools console via window.ctf().
// Progress persists in localStorage; events drive the on-screen HUD.
// ════════════════════════════════════════════════════════════════

const STORAGE_KEY = 'spido-ctf';

// Submittable fragment codes → display label. Order = discovery order.
const FRAGMENTS = {
  'ALPHA-7F3A':   { id: 1, label: 'ALPHA' },
  'BRAVO-2C9D':   { id: 2, label: 'BRAVO' },
  'CHARLIE-E11E': { id: 3, label: 'CHARLIE' },
};
const TOTAL = Object.keys(FRAGMENTS).length;
const MASTER_FLAG = 'flag{r3con_m4st3r_2026}';

const GREEN = 'color:#00ff41;font-family:monospace';
const DIM   = 'color:#888;font-family:monospace';
const RED   = 'color:#ff003c;font-family:monospace';
const GOLD  = 'color:#d1ff00;font-family:monospace';

const load = () => {
  try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []); }
  catch { return new Set(); }
};
const save = (set) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...set])); } catch { /* ignore */ }
};

let found = load();

const emit = (type, detail) => window.dispatchEvent(new CustomEvent(type, { detail }));

const snapshot = () => ({
  found: found.size,
  total: TOTAL,
  complete: found.size === TOTAL,
  fragments: [...found].map((c) => FRAGMENTS[c].label),
});

const banner = () => {
  console.log(
    '%c\n  SPIDO // INTRUSION CHALLENGE\n  ───────────────────────────',
    'color:#00ff41;font-family:monospace;font-size:13px;font-weight:bold'
  );
  console.log('%c  3 access fragments are hidden in this system.', GREEN);
  console.log('%c  Recover all 3 to breach the core.\n', GREEN);
  console.log('%c    ctf(\'<FRAGMENT>\')%c   submit a recovered fragment', GOLD, DIM);
  console.log('%c    ctf.status()%c        view your progress', GOLD, DIM);
  console.log('%c    ctf.help()%c          rules + first lead\n', GOLD, DIM);
  console.log('%c  FIRST LEAD: the source always tells the truth.', DIM);
};

const help = () => {
  console.log('%c[CTF] How to play:', GREEN);
  console.log('%c  • Find 3 hidden fragments using recon, not luck.', DIM);
  console.log('%c  • Submit each with ctf(\'CODE\'). Order does not matter.', DIM);
  console.log('%c  • ctf.status() shows progress. ctf.reset() wipes it.', DIM);
  console.log('%c  LEAD 1/3 → View this page\'s source (Ctrl+U) and read the comments.', GOLD);
  return snapshot();
};

const status = () => {
  const s = snapshot();
  console.log(
    `%c[CTF] ${s.found}/${s.total} fragments captured — ${s.fragments.join(', ') || 'none yet'}`,
    s.complete ? GREEN : GOLD
  );
  return s;
};

const submit = (code) => {
  if (typeof code !== 'string') {
    console.log('%cUsage: ctf(\'FRAGMENT-CODE\')  — try ctf.help()', DIM);
    return false;
  }
  const key = code.trim().toUpperCase();
  const frag = FRAGMENTS[key];
  if (!frag) {
    console.log('%c[CTF] ✗ invalid fragment. Keep hunting.', RED);
    return false;
  }
  if (found.has(key)) {
    console.log(`%c[CTF] ${frag.label} already captured. (${found.size}/${TOTAL})`, GOLD);
    return true;
  }
  found.add(key);
  save(found);
  console.log(`%c[CTF] ✓ ${frag.label} captured!  (${found.size}/${TOTAL})`, GREEN + ';font-weight:bold');
  emit('ctf:found', { label: frag.label, ...snapshot() });
  if (found.size === TOTAL) {
    console.log(`%c[CTF] ACCESS GRANTED → ${MASTER_FLAG}`, 'color:#00ff41;font-family:monospace;font-size:14px;font-weight:bold');
    emit('ctf:complete', { flag: MASTER_FLAG });
  }
  return true;
};

const reset = () => {
  found = new Set();
  save(found);
  emit('ctf:reset', snapshot());
  console.log('%c[CTF] progress wiped. Good luck, operator.', DIM);
  return snapshot();
};

let initialized = false;

export function initCTF() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  const ctf = (code) => submit(code);
  ctf.status = status;
  ctf.help = help;
  ctf.reset = reset;
  window.ctf = ctf;

  banner();
  // Replay completion state for late-mounting listeners (e.g. after reload).
  if (found.size === TOTAL) emit('ctf:complete', { flag: MASTER_FLAG, silent: true });
}

export function getCTFState() {
  return { ...snapshot(), flag: found.size === TOTAL ? MASTER_FLAG : null };
}

export { TOTAL as CTF_TOTAL };
