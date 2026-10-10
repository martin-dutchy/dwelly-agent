import type { Guard, GuardContext, Tier, ToolCall } from '../harness/contracts.js';
import { quoteAppears } from '../opsChecks.js';
import { caseText } from './text.js';

/** Every ops tool by risk: 0 read · 1 internal record · 2 outbound communication · 3 money, legal, closure or personal data. */
export const TOOL_TIERS: Record<string, Tier> = {
  list_tickets: 0,
  get_ticket: 0,
  get_property: 0,
  create_ticket: 1,
  update_ticket: 1,
  put_on_hold: 1,
  resume_auto: 1,
  record_landlord_decision: 1,
  record_work_result: 1,
  record_quote: 1,
  record_invoice: 1,
  attach_document: 1,
  skip_document: 1,
  confirm_keys_returned: 1,
  log_call: 1,
  schedule_follow_up: 1,
  add_note: 1,
  verify_identity: 1,
  escalate_to_human: 1,
  send_message: 2,
  request_information: 2,
  request_landlord_approval: 2,
  set_visit: 2,
  assign_contractor: 2,
  approve_quote: 3,
  close_ticket: 3,
  cancel_ticket: 3,
  hold_payment: 3,
  share_tenant_contact: 3,
  update_bank_details: 3,
};

export const tierOf = (tool: string): Tier => TOOL_TIERS[tool] ?? 1;

/** Where a tier-3 call states its basis. `justification` first, then the tool's own reason fields; the second entry is the one to fill in. */
const BASIS: Record<string, string[]> = {
  approve_quote: ['justification', 'approval_basis', 'emergency_justification'],
  close_ticket: ['justification', 'resolution', 'tenant_confirmation', 'landlord_informed'],
  cancel_ticket: ['justification', 'reason'],
  hold_payment: ['justification', 'reason', 'payee'],
  share_tenant_contact: ['justification', 'consent_quote', 'source'],
  update_bank_details: ['justification', 'verification_done'],
};

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const mentions = (text: string, name: string) => !!name && new RegExp(`(?:^|[^a-z0-9])${escapeRe(name.toLowerCase())}(?![a-z0-9])`).test(text.toLowerCase());

/** True when `text` points at something checkable: a verified ledger entry, a job, a case file, an event, or the case's own words. */
export function citesSource(text: string, ctx: GuardContext): boolean {
  const verified = new Set(ctx.ledger.filter((e) => e.status === 'verified').map((e) => e.id));
  if ([...text.matchAll(/\bA\d+\b/g)].some((m) => verified.has(m[0]))) return true;
  if (ctx.state.tickets.some((t) => mentions(text, t.ref))) return true;
  const docs = ctx.bundle?.documents ?? [];
  const names = docs.flatMap((d) => {
    const base = d.path.split('/').at(-1) ?? '';
    const stem = base.replace(/\.[a-z0-9]+$/i, '');
    return [d.id, d.path, base, stem.length >= 4 ? stem : ''];
  });
  if (names.some((n) => mentions(text, n))) return true;
  if (/\bcrm\b/i.test(text) && docs.some((d) => /crm/i.test(d.path))) return true;
  const all = caseText(ctx);
  for (const m of text.matchAll(/\b(?:ev:|event[\s-]?)0*(\d+)\b/gi)) {
    const n = m[1];
    if ((ctx.bundle?.events ?? []).some((e) => new RegExp(`\\b0*${n}$`).test(e.id)) || new RegExp(`event[\\s-]?0*${n}\\b`, 'i').test(all)) return true;
  }
  const quoted = [...text.matchAll(/["“”]([^"“”]+)["“”]/g)].map((m) => m[1]);
  const long = (s: string) => s.trim().split(/\s+/).length >= 3;
  if ([...quoted, text].some((q) => long(q) && quoteAppears(q, all))) return true;
  // Facts specific enough to point at their source: email addresses, domains, references, amounts and long numbers (not years).
  const tokens = [...(text.match(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g) ?? []), ...(text.match(/\b[\w-]+(?:\.[\w-]+)*\.(?:co\.uk|com|org|net|uk|example)\b/gi) ?? []), ...(text.match(/\b(?=[A-Z0-9-]*\d)[A-Z0-9]+(?:-[A-Z0-9]+)+\b/gi) ?? [])];
  if (tokens.some((s) => mentions(all, s))) return true;
  const amounts = [...text.matchAll(/£\s?(\d[\d,]*(?:\.\d{1,2})?)|\b(\d{3,}(?:\.\d{1,2})?)\b/g)].map((m) => m[1] ?? m[2]).filter((n) => !/^(?:19|20)\d\d$/.test(n)).map(amount);
  if (!amounts.length) return false;
  const known = new Set([...all.matchAll(/\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?/g)].map((m) => amount(m[0])));
  return amounts.some((v) => known.has(v));
}

const amount = (s: string) => Math.round(Number(s.replace(/,/g, '')) * 100);

/** System records that already justify the call, so no citation is needed. */
function recordedBasis(call: ToolCall, ctx: GuardContext): boolean {
  const a = call.args;
  if (call.tool === 'approve_quote') {
    const t = ctx.state.tickets.find((x) => x.ref === a.ticket_ref);
    const decision = (t?.landlord_decision as { decision?: string } | undefined)?.decision;
    if (decision === 'approved' || decision === 'conditional') return true;
    const amount = Number(a.amount_gbp);
    return ctx.state.properties.some((p) => p.landlord?.spend_limit_gbp !== undefined && amount <= p.landlord.spend_limit_gbp);
  }
  if (call.tool === 'hold_payment') return ctx.state.tickets.some((t) => ((t.invoice as { flags?: string[] } | undefined)?.flags ?? []).length > 0);
  return false;
}

export const tierThreeBasis: Guard = {
  id: 'tier3.basis',
  tools: Object.keys(BASIS),
  check(call, ctx) {
    if (!caseText(ctx).trim()) return undefined;
    const fields = BASIS[call.tool];
    const basis = fields.map((f) => call.args[f]).filter((v) => typeof v === 'string' && v.trim()).join('\n');
    if (citesSource(basis, ctx) || recordedBasis(call, ctx)) return undefined;
    const example = ctx.bundle?.documents[0]?.path;
    return {
      rule: 'tier3.basis',
      reason: `${call.tool} moves money, ends a job or shares personal data, so its basis must be checkable. In ${fields[1]}, cite where it comes from: a case file${example ? ` (e.g. ${example})` : ''}, an event number, the ledger id of a verified action, or the case's exact words in quotes.`,
    };
  },
};
