// POST /api/admin-auth
// Validates the admin password (stored in ADMIN_PASSWORD env var) and returns
// a short-lived HMAC token. The token is re-verifiable without a database.
//
// Token format: `${timestamp}.${hmac}`
//   timestamp — floored to the current hour (tokens expire within ~1 hour)
//   hmac      — HMAC-SHA256(secret, timestamp) hex digest

import { createHmac, timingSafeEqual } from 'crypto';

function makeToken(secret) {
    const ts = Math.floor(Date.now() / 3_600_000); // 1-hour window
    const hmac = createHmac('sha256', secret).update(String(ts)).digest('hex');
    return `${ts}.${hmac}`;
}

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { ADMIN_PASSWORD } = process.env;
    if (!ADMIN_PASSWORD) {
        return res.status(500).json({ error: 'Admin not configured' });
    }

    const { password } = req.body || {};
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ error: 'Missing password' });
    }

    // Constant-time compare to prevent timing attacks
    const a = Buffer.from(password);
    const b = Buffer.from(ADMIN_PASSWORD);
    const match = a.length === b.length && timingSafeEqual(a, b);

    if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ token: makeToken(ADMIN_PASSWORD) });
}
