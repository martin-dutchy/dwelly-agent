import type { CaseBundle, GuardContext, Party, ToolCall } from '../harness/contracts.js';

export const MESSAGE_TOOLS = ['send_message', 'request_information', 'request_landlord_approval'];

const texts = new WeakMap<CaseBundle, string>();
/** Everything the agent was shown as text: the brief and every document. Empty without a bundle. */
export function caseText(ctx: GuardContext): string {
  const b = ctx.bundle;
  if (!b) return '';
  let t = texts.get(b);
  if (t === undefined) texts.set(b, (t = [b.brief, ...b.documents.map((d) => d.text)].join('\n\n')));
  return t;
}

/** The words an outgoing message would send, whichever message tool carries them. */
export function messageText(call: ToolCall): string {
  const a = call.args;
  const list = (v: unknown) => (Array.isArray(v) ? v.map(String) : []);
  return [a.body, ...list(a.questions), a.why, a.decision_needed, ...list(a.options), a.deadline].filter((v) => typeof v === 'string' && v).join('\n');
}

/** Parties from the brief and the bundle, de-duplicated by name and role. */
export function parties(ctx: GuardContext): Party[] {
  const all = [...(ctx.brief?.parties ?? []), ...(ctx.bundle?.parties ?? [])];
  return all.filter((p, i) => all.findIndex((q) => q.role === p.role && q.name === p.name) === i);
}

export const today = (ctx: GuardContext) => ctx.brief?.now ?? ctx.bundle?.now;

/** Sentences of `text`: split after . ! ? before a space, and at line breaks, so "£172.51" stays whole. */
export const sentences = (text: string) => text.split(/(?<=[.!?])\s+|\n+/).filter((s) => s.trim());
