// Vercel Serverless Function — /api/steam-status
// Returns whether the Steam user is currently in-game.
// Uses GetPlayerSummaries which includes live gameid/gameextrainfo fields.
// STEAM_API_KEY and STEAM_USER_ID must be set as Vercel environment variables.

export default async function handler(req, res) {
    const { STEAM_API_KEY, STEAM_USER_ID } = process.env;

    if (!STEAM_API_KEY || !STEAM_USER_ID) {
        return res.status(500).json({ error: 'Steam credentials not configured' });
    }

    try {
        const url =
            `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/` +
            `?key=${STEAM_API_KEY}` +
            `&steamids=${STEAM_USER_ID}` +
            `&format=json`;

        const steamRes = await fetch(url);
        if (!steamRes.ok) {
            return res.status(502).json({ error: 'Steam API request failed' });
        }

        const data = await steamRes.json();
        const player = data?.response?.players?.[0];

        if (!player) {
            return res.status(404).json({ error: 'Player not found' });
        }

        const inGame = Boolean(player.gameid);

        // Short cache — this is a live presence endpoint
        res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');

        if (!inGame) {
            return res.status(200).json({ inGame: false });
        }

        return res.status(200).json({
            inGame: true,
            gameId: player.gameid,
            gameName: player.gameextrainfo || 'Unknown Game',
            coverUrl: `https://cdn.akamai.steamstatic.com/steam/apps/${player.gameid}/header.jpg`,
            thumbUrl: `https://cdn.akamai.steamstatic.com/steam/apps/${player.gameid}/header.jpg`,
        });
    } catch (err) {
        console.error('Steam status error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
