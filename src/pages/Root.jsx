import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import './Root.css';

// Hidden CTF node — not linked anywhere in the UI. Reached only by
// guessing/discovering the /root path (lead given in the ALPHA comment).
// Reveals fragment BRAVO and the lead to CHARLIE.
const BOOT_LINES = [
  '> establishing connection to access node...',
  '> bypassing perimeter...........[OK]',
  '> escalating privileges.........[OK]',
  '> mounting /root................[OK]',
  '',
  '  ACCESS NODE :: /root',
  '  ───────────────────',
  '  Fragment 2 / 3 recovered.',
  '',
  "  submit →  ctf('BRAVO-2C9D')",
  '',
  '  NEXT LEAD: every page is signed in the footer.',
  '            decode the signature it carries (data-sig).',
];

const Root = () => {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setShown((n) => {
        if (n >= BOOT_LINES.length) { clearInterval(t); return n; }
        return n + 1;
      });
    }, 180);
    return () => clearInterval(t);
  }, []);

  return (
    <PageTransition className="page-container root-node">
      <div className="root-terminal mono">
        {BOOT_LINES.slice(0, shown).map((line, i) => (
          <div key={i} className={`root-line ${line.includes("ctf('") ? 'root-line--flag' : ''}`}>
            {line || ' '}
          </div>
        ))}
        {shown >= BOOT_LINES.length && (
          <div className="root-cursor-line">
            <span className="root-prompt">root@spido:~#</span>
            <span className="root-cursor" />
          </div>
        )}
      </div>
      <Link to="/" className="root-back mono">← return to surface</Link>
    </PageTransition>
  );
};

export default Root;
