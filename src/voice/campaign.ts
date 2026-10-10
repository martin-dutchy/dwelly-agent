import type { testerCard } from './scenarios.js';

/**
 * WhatsApp heads-up for a planned test call, sent from your own WhatsApp via a pre-filled wa.me link
 * (no WhatsApp automation: unofficial clients break WhatsApp's terms and risk a ban on your number).
 */

type Card = ReturnType<typeof testerCard>;

/** The role card as plain text: the same order as the web page, so people see one consistent card. */
export function cardText(card: Card) {
  return [
    `🎭 YOU'RE PLAYING: ${card.persona.toUpperCase()} (${card.role})`,
    card.who,
    '',
    `📞 When the call starts: ${card.opening}`,
    '',
    '✅ What to do on the call:',
    ...card.beats.map((b, i) => `${i + 1}. ${b.startsWith('🤫') ? `🤫 Twist: ${b.replace(/^🤫\s*/, '')}` : b}`),
    '',
    '🪪 Details, if they ask:',
    ...card.facts.map(([k, v]) => `• ${k}: ${v}`),
    '',
    'Use your own words. Hesitations and background noise are welcome.',
  ].join('\n');
}

export function whatsappMessage(card: Card | undefined, o: { name?: string; from: string; link: string; phone: boolean; sender?: string }) {
  const how = o.phone
    ? `When you're ready, open your link and press "📞 Call me now". The AI assistant rings you straight away${o.from ? ` (from ${o.from})` : ''}. The call is recorded, just for testing.`
    : `When you're ready, open your link and press "Start the call" (it uses your browser's microphone). The call is recorded, just for testing.`;
  return [
    `Hi${o.name ? ` ${o.name}` : ''}! It's ${o.sender ?? 'Martin'} 👋 Could you help me test an AI phone assistant for a lettings agency? It's a 3-minute call where you play a character.`,
    '',
    how,
    o.link,
    '',
    card ? cardText(card) : '🎭 Your link shows who to play and what you know.',
    '',
    'Use only these made-up details, never your real ones. Thank you 🙏',
  ].join('\n');
}

/** wa.me link that opens WhatsApp with the message ready. No phone number = you pick the contact. */
export const whatsappLink = (message: string, phone?: string) =>
  `https://wa.me/${phone ? phone.replace(/\D/g, '') : ''}?text=${encodeURIComponent(message)}`;
