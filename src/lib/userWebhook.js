// Service for dispatching newly registered user webhooks
// Notifies external endpoints (Discord, Make, Zapier, Slack, or custom APIs)

export const USER_WEBHOOK_CONFIG = {
  webhookUrl: import.meta.env.VITE_USER_WEBHOOK_URL || '',
  websiteName: 'IGNIS Gaming Store',
  websiteUrl: 'https://kirilnerandzoski.github.io/GameStoreApp/'
};

/**
 * Dispatches a new user registration webhook event.
 * Contains:
 * - gamertag
 * - email
 * - website name and URL formatted with brackets: "IGNIS Gaming Store (https://kirilnerandzoski.github.io/GameStoreApp/)"
 * - provider ('email' or 'google')
 */
export async function dispatchNewUserWebhook({ gamertag, email, provider = 'email', customUrl = null }) {
  const url = customUrl || USER_WEBHOOK_CONFIG.webhookUrl;
  const websiteName = USER_WEBHOOK_CONFIG.websiteName;
  const websiteLink = USER_WEBHOOK_CONFIG.websiteUrl;
  const websiteWithBracket = `${websiteName} (${websiteLink})`;
  const cleanGamertag = gamertag || (email ? email.split('@')[0] : 'Operative');

  const payload = {
    event: 'user.created',
    gamertag: cleanGamertag,
    email: email || '',
    website_name: websiteName,
    website_link: websiteLink,
    website: websiteWithBracket,
    provider: provider,
    created_at: new Date().toISOString(),
    // Preformatted markdown message compatible with Discord / Slack / Teams
    content: `🚨 **New Operative Registered**\n• **Gamertag:** ${cleanGamertag}\n• **Email:** ${email || 'N/A'}\n• **Website:** ${websiteWithBracket}`
  };

  console.log('[UserWebhook] Dispatching new user webhook event:', payload);

  if (!url) {
    console.warn('[UserWebhook] No VITE_USER_WEBHOOK_URL configured. Payload logged to console.');
    return { ok: false, message: 'No webhook URL configured', payload };
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const responseText = await res.text().catch(() => '');
    console.log(`[UserWebhook] HTTP ${res.status}:`, responseText);
    return { ok: res.ok, status: res.status, body: responseText, payload };
  } catch (err) {
    console.warn('[UserWebhook] Failed to dispatch user event:', err);
    return { ok: false, error: err, payload };
  }
}
