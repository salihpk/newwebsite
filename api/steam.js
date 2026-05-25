// Vercel Serverless Function — /api/steam
// Fetches the user's Steam library and returns game data with cover art URLs.
// STEAM_API_KEY and STEAM_USER_ID must be set as Vercel environment variables.

export default async function handler(req, res) {
    const { STEAM_API_KEY, STEAM_USER_ID } = process.env;

    if (!STEAM_API_KEY || !STEAM_USER_ID) {
        return res.status(500).json({ error: 'Steam credentials not configured' });
    }

    try {
        const url =
            `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/` +
            `?key=${STEAM_API_KEY}` +
            `&steamid=${STEAM_USER_ID}` +
            `&include_appinfo=true` +
            `&include_played_free_games=true` +
            `&format=json`;

        const steamRes = await fetch(url);
        if (!steamRes.ok) {
            return res.status(502).json({ error: 'Steam API request failed' });
        }

        const data = await steamRes.json();
        const rawGames = data?.response?.games || [];

        // Sort by playtime descending, map to lean payload
        const games = rawGames
            .sort((a, b) => (b.playtime_forever || 0) - (a.playtime_forever || 0))
            .map(g => ({
                appid: g.appid,
                name: g.name,
                playtime: g.playtime_forever || 0,          // minutes
                cover: `https://cdn.akamai.steamstatic.com/steam/apps/${g.appid}/header.jpg`,
            }));

        // Cache for 1 hour, serve stale for up to 24 h while revalidating
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
        return res.status(200).json({ games, total: games.length });
    } catch (err) {
        console.error('Steam API error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
