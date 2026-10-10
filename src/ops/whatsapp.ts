import type { OpsEvent } from './store.js';

/**
 * WhatsApp channel adapter. In the demo the conversation is shown in the portal's phone view; in production
 * the same events go through the WhatsApp Business API the agency already runs. Twilio is supported out of
 * the box: set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN and TWILIO_WHATSAPP_FROM (e.g. whatsapp:+14155238886),
 * point the inbound webhook at /ops/whatsapp/webhook?secret=$WHATSAPP_WEBHOOK_SECRET, and replies are delivered.
 */

export const whatsappConfigured = () => !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_WHATSAPP_FROM);

/** The agent's verified WhatsApp messages to the tenant from one run. */
export const outgoingWhatsApp = (events: OpsEvent[]) =>
  events.filter((e) => e.kind === 'message' && e.actor === 'agent' && e.status === 'verified' && (e.data?.args as { channel?: string } | undefined)?.channel === 'whatsapp');

export async function sendWhatsApp(to: string, body: string) {
  if (!whatsappConfigured()) return { ok: false, skipped: 'WhatsApp is not configured; shown in the portal only' };
  const sid = process.env.TWILIO_ACCOUNT_SID!;
  const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: { authorization: `Basic ${Buffer.from(`${sid}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64')}`, 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ From: process.env.TWILIO_WHATSAPP_FROM!, To: to.startsWith('whatsapp:') ? to : `whatsapp:${to}`, Body: body.slice(0, 1600) }),
  });
  return { ok: r.ok, status: r.status };
}

/** A chat bubble for the phone view. */
export type Bubble = { dir: 'in' | 'out'; text: string; ts: string; status?: string };
export function bubbles(events: OpsEvent[]): Bubble[] {
  return events
    .filter((e) => e.kind === 'message' && (e.data?.channel === 'whatsapp' || (e.data?.args as { channel?: string } | undefined)?.channel === 'whatsapp'))
    .map((e) => ({ dir: e.actor === 'tenant' ? 'in' : 'out', text: e.detail ?? '', ts: e.ts, status: e.actor === 'tenant' ? undefined : e.status ?? undefined }) as Bubble);
}
