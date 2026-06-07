// Per-instance in-memory rate limiter.
// Good enough for a personal portfolio — most spam hits the same lambda instance.
const rateLimitMap = new Map();
const LIMIT      = 3;        // max pings per IP
const WINDOW_MS  = 60_000;   // within a 60-second window

function isRateLimited(ip) {
    const now = Date.now();
    const hits = (rateLimitMap.get(ip) || []).filter(t => now - t < WINDOW_MS);
    if (hits.length >= LIMIT) return true;
    hits.push(now);
    rateLimitMap.set(ip, hits);
    return false;
}

// Resolve the real client IP from Vercel headers
function getClientIP(req) {
    return (
        req.headers['x-real-ip'] ||
        (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
        'unknown'
    );
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
    }

    // Basic origin check — only accept requests from your own domain
    const origin  = req.headers['origin']  || '';
    const referer = req.headers['referer'] || '';
    const allowed = ['muhammedsalih.vercel.app', 'localhost'];
    const fromOwn = allowed.some(h => origin.includes(h) || referer.includes(h));
    if (!fromOwn) {
        return res.status(403).json({ error: 'FORBIDDEN' });
    }

    const ip = getClientIP(req);
    if (isRateLimited(ip)) {
        return res.status(429).json({ error: 'RATE_LIMITED', retryAfter: 60 });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
        return res.status(500).json({ error: 'WEBHOOK_NOT_CONFIGURED' });
    }

    const country  = req.headers['x-vercel-ip-country']       || '??';
    const city     = decodeURIComponent(req.headers['x-vercel-ip-city'] || 'Unknown');
    const region   = req.headers['x-vercel-ip-country-region'] || '';
    const ua       = (req.headers['user-agent'] || 'Unknown').substring(0, 150);
    const location = [city, region, country].filter(Boolean).join(', ');

    const embed = {
        title: '🛰️  INCOMING PING',
        description: [
            '```',
            'SIGNAL_SOURCE : PORTFOLIO_CONTACT_PAGE',
            'PROTOCOL      : HTTPS/2',
            'STATUS        : AWAITING_RESPONSE...',
            '```',
        ].join('\n'),
        color: 0x00ff41,
        fields: [
            { name: '📍 Origin',    value: location || 'Unknown', inline: true  },
            { name: '🕐 Timestamp', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true },
            { name: '🌐 Agent',     value: `\`${ua}\``, inline: false },
        ],
        timestamp: new Date().toISOString(),
        footer: { text: 'SPIDO Portfolio — Ping System v1.0' },
    };

    try {
        const r = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: '**[ PING_RECEIVED ]** — someone wants your attention.',
                embeds: [embed],
            }),
        });

        if (!r.ok) throw new Error(`Webhook ${r.status}`);
        const reply = process.env.PING_REPLY_MESSAGE || null;
        return res.status(200).json({ ok: true, reply });
    } catch (err) {
        console.error('ping webhook error:', err);
        return res.status(500).json({ error: 'TRANSMISSION_FAILED' });
    }
}
