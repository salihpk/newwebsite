export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  const { email, subject, message } = req.body || {};

  if (
    typeof email !== 'string' || !email.includes('@') || email.length > 200 ||
    typeof subject !== 'string' || subject.trim().length === 0 || subject.length > 300 ||
    typeof message !== 'string' || message.trim().length === 0 || message.length > 5000
  ) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const text =
    `📨 *NEW MESSAGE*\n\n` +
    `*From:* ${email}\n` +
    `*Subject:* ${subject}\n\n` +
    `*Message:*\n${message}`;

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
    });

    const data = await tgRes.json().catch(() => ({}));

    if (!tgRes.ok || !data.ok) {
      console.error('Telegram API error:', data);
      return res.status(502).json({
        error: 'Delivery failed',
        detail: data.description || 'Unknown Telegram error',
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(502).json({ error: 'Delivery failed' });
  }
}
