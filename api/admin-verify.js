// GET /api/admin-verify
// Verifies a token previously issued by /api/admin-auth.
// Accepts tokens from the current hour AND the previous hour so a token
// issued at 11:59 is still valid at 12:01 (up to ~2-hour grace window).

import { createHmac, timingSafeEqual } from 'crypto';

function isValidToken(token, secret) {
    if (!token || typeof token !== 'string') return false;
    const [tsPart, hmacPart] = token.split('.');
    if (!tsPart || !hmacPart) return false;

    const now = Math.floor(Date.now() / 3_600_000);
    // Accept current and previous hour
    for (const ts of [now, now - 1]) {
        if (Number(tsPart) !== ts) continue;
        const expected = createHmac('sha256', secret).update(String(ts)).digest('hex');
        const a = Buffer.from(hmacPart);
        const b = Buffer.from(expected);
        if (a.length === b.length && timingSafeEqual(a, b)) return true;
    }
    return false;
}

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { ADMIN_PASSWORD } = process.env;
    if (!ADMIN_PASSWORD) {
        return res.status(500).json({ error: 'Admin not configured' });
    }

    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';

    if (!isValidToken(token, ADMIN_PASSWORD)) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ ok: true });
}
