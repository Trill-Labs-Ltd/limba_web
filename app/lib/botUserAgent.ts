/**
 * Link-preview bots and crawlers. They fetch shared links to build previews,
 * so they must not count as someone opening the link.
 */
const BOT_UA_RE =
  /WhatsApp|facebookexternalhit|Twitterbot|Slackbot|TelegramBot|Discordbot|Googlebot|bingbot|bot|crawler|spider|preview/i

export function isBotUserAgent(userAgent: string | null | undefined): boolean {
  // No user agent at all is a script, not a browser.
  if (!userAgent) return true
  return BOT_UA_RE.test(userAgent)
}
