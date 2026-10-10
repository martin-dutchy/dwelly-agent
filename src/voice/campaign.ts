import type { testerCard } from './scenarios.js';

/**
 * WhatsApp heads-up for a planned test call, sent from your own WhatsApp via a pre-filled wa.me link
 * (no WhatsApp automation: unofficial clients break WhatsApp's terms and risk a ban on your number).
 */

type Card = ReturnType<typeof testerCard>;

export function whatsappMessage(card: Card | undefined, o: { name?: string; from: string; link: string; phone: boolean; sender?: string }) {
  const how = o.phone
    ? `📞 When you're ready, open this link and press "Call me now". An AI assistant will ring you straight away${o.from ? ` from ${o.from}` : ''}. The call is recorded (just for testing).`
    : `📞 When you're ready, open this link and press "Start the call" (it uses your browser's microphone). You'll talk to an AI assistant and the call is recorded (just for testing).`;
  return [
    `Hi${o.name ? ` ${o.name}` : ''}! It's ${o.sender ?? 'Martin'} 👋 Could you help me test an AI phone assistant for a lettings agency? It takes about 3 minutes.`,
    '',
    how,
    o.link,
    '',
    ...(card
      ? [
          `🎭 Pretend you're a tenant called ${card.persona}:`,
          card.situation,
          '',
          '📝 What you know:',
          ...card.youKnow.map((k) => `• ${k}`),
          '',
          '💡 To make it realistic:',
          ...card.tips.map((k) => `• ${k}`),
          '',
        ]
      : ['🎭 The link shows you who to pretend to be and what you know.', '']),
    'Only use the made-up details, never your real ones. Thank you 🙏',
  ].join('\n');
}

/** wa.me link that opens WhatsApp with the message ready. No phone number = you pick the contact. */
export const whatsappLink = (message: string, phone?: string) =>
  `https://wa.me/${phone ? phone.replace(/\D/g, '') : ''}?text=${encodeURIComponent(message)}`;
