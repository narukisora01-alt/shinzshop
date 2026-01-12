export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, gamepassLink, package: pkg, price, gamepassPrice, type, timestamp } = req.body;

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  const embed = {
    title: '🛒 New Robux Order',
    color: type === 'tax' ? 0xfbbf24 : 0x3b82f6,
    fields: [
      { name: '👤 Roblox Username', value: username, inline: true },
      { name: '💎 Package', value: pkg, inline: true },
      { name: '💰 Price', value: price, inline: true },
      { name: '🎮 Gamepass Price', value: `${gamepassPrice} Robux`, inline: true },
      { name: '📦 Type', value: type === 'tax' ? 'With Tax' : 'No Tax', inline: true },
      { name: '🔗 Gamepass Link', value: gamepassLink }
    ],
    timestamp: timestamp,
    footer: { text: 'ShinzRBLX Shop' }
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] })
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send webhook' });
  }
}
