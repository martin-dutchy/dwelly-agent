import { z } from 'zod';
import { executeWith } from './executor.js';
import type { FailureInjector } from './failures.js';
import { type Data, db, nextRef, today } from './store.js';

export type Channel = 'text' | 'voice:elevenlabs' | 'voice:livekit';
export type ToolContext = {
  conversationId: string;
  channel: Channel;
  failures?: FailureInjector;
  /** Isolated data for this conversation (voice test calls); defaults to the shared fixture store. */
  world?: Data;
};
export const worldOf = (ctx: ToolContext) => ctx.world ?? db;

// Tool results are small and speakable: never dump raw records into a voice turn.
export type ToolResult = { ok: boolean; say?: string; [key: string]: unknown };

export type ToolDef<S extends z.ZodObject = z.ZodObject> = {
  name: string;
  description: string;
  parameters: S;
  /** Refuse to run until verify_identity succeeded in this conversation. */
  requiresVerification: boolean;
  /** Writes change state; voice adapters disable interruptions while they run. */
  kind: 'read' | 'write';
  run: (args: z.infer<S>, ctx: ToolContext) => Promise<ToolResult> | ToolResult;
};

const defineTool = <S extends z.ZodObject>(t: ToolDef<S>) => t as unknown as ToolDef;

// Verification state per conversation, enforced server-side rather than trusting the LLM.
const verified = new Map<string, string>();
/** Restore a verification after a restart, from a verify_identity the audit log shows succeeded. */
export const restoreVerified = (conversationId: string, tenantId: string) => verified.set(conversationId, tenantId);
export const isVerified = (conversationId: string, tenantId?: string) =>
  verified.has(conversationId) && (!tenantId || verified.get(conversationId) === tenantId);

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

// Speech-to-text mangles spellings ("Clark" vs "Clarke"): allow small edit distance on names,
// but keep date of birth exact so verification still means something.
function editDistance(a: string, b: string) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
const nameMatches = (a: string, b: string) => editDistance(normalise(a), normalise(b)) <= 2;
const EMERGENCY = /gas|carbon monoxide|fire|smoke|flood|sparking|burning/i;

const tenantId = z.string().describe('tenant_id returned by find_tenant, e.g. T-1001');

export const tools: ToolDef[] = [
  defineTool({
    name: 'find_tenant',
    description:
      'Look up possible tenant matches by phone number, full name or postcode. Returns candidate tenant_ids only; does not verify identity.',
    kind: 'read',
    requiresVerification: false,
    parameters: z.object({
      phone: z.string().optional().describe('Phone number in E.164 format, e.g. +447700900101'),
      name: z.string().optional().describe('Full or partial name as spoken'),
      postcode: z.string().optional().describe('UK postcode, e.g. E8 1HL'),
    }),
    run: ({ phone, name, postcode }, ctx) => {
      const db = worldOf(ctx);
      const matches = db.tenants.filter((t) => {
        const prop = db.properties.find((p) => p.property_id === t.property_id);
        return (
          (phone && normalise(t.phone).endsWith(normalise(phone).slice(-9))) ||
          (name && (normalise(t.full_name).includes(normalise(name)) || nameMatches(t.full_name, name))) ||
          (postcode && prop && normalise(prop.address).includes(normalise(postcode)))
        );
      });
      if (matches.length === 0) return { ok: true, matches: [], say: 'No matching tenant found.' };
      return { ok: true, matches: matches.map((t) => ({ tenant_id: t.tenant_id, first_name: t.full_name.split(' ')[0] })) };
    },
  }),

  defineTool({
    name: 'verify_identity',
    description:
      "Verify the caller is the tenant by checking full name and date of birth. Must succeed before any tenancy details are shared or any write is made.",
    kind: 'read',
    requiresVerification: false,
    parameters: z.object({
      tenant_id: tenantId,
      full_name: z.string().describe('Full name as stated by the caller'),
      date_of_birth: z.string().describe('Date of birth in ISO format YYYY-MM-DD, e.g. 1991-03-14'),
    }),
    run: ({ tenant_id, full_name, date_of_birth }, ctx) => {
      const db = worldOf(ctx);
      const t = db.tenants.find((x) => x.tenant_id === tenant_id);
      const ok = !!t && nameMatches(t.full_name, full_name) && t.date_of_birth === date_of_birth;
      if (ok) verified.set(ctx.conversationId, tenant_id);
      return ok
        ? { ok: true, verified: true }
        : { ok: true, verified: false, say: 'Those details do not match our records.' };
    },
  }),

  defineTool({
    name: 'get_tenancy',
    description: 'Get address, rent, tenancy dates and arrears for a verified tenant.',
    kind: 'read',
    requiresVerification: true,
    parameters: z.object({ tenant_id: tenantId }),
    run: ({ tenant_id }, ctx) => {
      const db = worldOf(ctx);
      const t = db.tenants.find((x) => x.tenant_id === tenant_id)!;
      const p = db.properties.find((x) => x.property_id === t.property_id)!;
      const ty = db.tenancies.find((x) => x.tenant_id === tenant_id)!;
      return {
        ok: true,
        address: p.address,
        monthly_rent_gbp: p.monthly_rent_gbp,
        tenancy_end: ty.end,
        arrears_gbp: ty.arrears_gbp,
        vulnerable_occupant: t.vulnerable,
      };
    },
  }),

  defineTool({
    name: 'list_tickets',
    description: 'List existing maintenance tickets for a verified tenant.',
    kind: 'read',
    requiresVerification: true,
    parameters: z.object({ tenant_id: tenantId }),
    run: ({ tenant_id }, ctx) => ({
      ok: true,
      tickets: worldOf(ctx).tickets
        .filter((x) => x.tenant_id === tenant_id)
        .map(({ ref, category, status, description, created }) => ({ ref, category, status, description, created })),
    }),
  }),

  defineTool({
    name: 'get_ticket',
    description: 'Fetch one maintenance ticket by reference, e.g. R-4801.',
    kind: 'read',
    requiresVerification: false,
    parameters: z.object({ ref: z.string().describe('Ticket reference, e.g. R-4801') }),
    run: ({ ref }, ctx) => {
      const t = worldOf(ctx).tickets.find((x) => x.ref === ref);
      return t ? { ok: true, ticket: t } : { ok: false, error: 'not_found' };
    },
  }),

  defineTool({
    name: 'create_repair_ticket',
    description:
      'Create a maintenance ticket for a VERIFIED tenant, only after reading back category, description and access details and getting an explicit yes. Not for emergencies: those go to escalate_to_human.',
    kind: 'write',
    requiresVerification: true,
    parameters: z.object({
      tenant_id: tenantId,
      category: z
        .enum(['plumbing', 'heating', 'electrical', 'damp_mould', 'security', 'appliance', 'other'])
        .describe('Repair category'),
      urgency: z.enum(['urgent', 'routine']).describe('urgent = within 24h (e.g. no heating), routine = within 14 days'),
      description: z.string().describe('One plain sentence describing the problem'),
      access_notes: z.string().optional().describe('When a contractor can visit, pets, key arrangements'),
    }),
    run: ({ tenant_id, category, urgency, description, access_notes }, ctx) => {
      const db = worldOf(ctx);
      if (EMERGENCY.test(description)) {
        return { ok: false, say: 'This sounds like an emergency. Use escalate_to_human with priority P1 instead.' };
      }
      // Idempotent: one open ticket per tenant/category/day.
      const dupe = db.tickets.find(
        (x) => x.tenant_id === tenant_id && x.category === category && x.created === today() && x.status === 'open',
      );
      if (dupe) return { ok: true, ticket_ref: dupe.ref, duplicate: true };
      const ticket = { ref: nextRef('R'), tenant_id, category, urgency, status: 'open', description, access_notes, created: today() };
      db.tickets.push(ticket);
      return { ok: true, ticket_ref: ticket.ref, target: urgency === 'urgent' ? 'within 24 hours' : 'within 14 days' };
    },
  }),

  defineTool({
    name: 'escalate_to_human',
    description:
      'Hand the case to a human colleague with a handover summary. Use for emergencies (P1), anything requiring human judgement (payment plans, disputes, legal, complaints, safeguarding), conflicting information, or failed tools.',
    kind: 'write',
    requiresVerification: false,
    parameters: z.object({
      tenant_id: z.string().optional().describe('tenant_id if known'),
      priority: z.enum(['P1', 'P2', 'P3']).describe('P1 = emergency/safety now, P2 = same day, P3 = next working day'),
      reason: z.string().describe('Short reason for escalation'),
      handover_summary: z
        .string()
        .describe('3-5 lines: who is calling, what happened, what was already done, what decision is needed, any risk'),
    }),
    run: (args, ctx) => {
      const db = worldOf(ctx);
      const esc = { ref: nextRef('E'), conversation_id: ctx.conversationId, ...args, created: today() };
      db.escalations.push(esc);
      return {
        ok: true,
        escalation_ref: esc.ref,
        say: args.priority === 'P1' ? 'An on-call colleague has been alerted now.' : 'A colleague will follow up.',
      };
    },
  }),
];

export const getTool = (name: string) => tools.find((t) => t.name === name);

/** Execution path for the voice/fixture tools: shared executor plus the identity guard. */
export function executeTool(name: string, rawArgs: unknown, ctx: ToolContext): Promise<ToolResult> {
  return executeWith(
    {
      tools,
      state: worldOf(ctx),
      guard: (tool, args, c) =>
        tool.requiresVerification && !isVerified(c.conversationId, args.tenant_id as string | undefined)
          ? { ok: false, error: 'not_verified', say: 'Identity must be verified with verify_identity first.' }
          : undefined,
    },
    name,
    rawArgs,
    ctx,
  );
}
