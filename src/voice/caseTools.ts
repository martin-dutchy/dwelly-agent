import { z } from 'zod';
import type { Data } from '../core/store.js';
import { type ToolContext, type ToolDef, worldOf } from '../core/tools.js';
import type { Verification } from '../agent/verify.js';

/**
 * Maintenance-case tools for calls with landlords and contractors (and tenants with an open case).
 * They record the outcome of the call against the case, the same next steps the case worker uses
 * (landlord approval, appointment, contractor status, notes), so a call becomes case evidence.
 */

export type CaseRecord = { id: string; tool: string; args: Record<string, unknown>; at: string };
/** pre_verified: a tenant we rang on the number we hold counts as identified for the call. */
export type VoiceWorld = Data & { case_log: CaseRecord[]; pre_verified?: string };

const log = (ctx: ToolContext) => {
  const w = worldOf(ctx) as VoiceWorld;
  w.case_log ??= [];
  return w.case_log;
};
let seq = 0;
const record = (ctx: ToolContext, tool: string, args: Record<string, unknown>, prefix: string) => {
  const r = { id: `${prefix}-${Date.now().toString(36).slice(-4)}${++seq}`, tool, args, at: new Date().toISOString() };
  log(ctx).push(r);
  return r;
};
const def = <S extends z.ZodObject>(t: Omit<ToolDef<S>, 'requiresVerification'>) => ({ requiresVerification: false, ...t }) as unknown as ToolDef;

export const caseTools: ToolDef[] = [
  def({
    name: 'record_landlord_decision',
    description:
      "Record the landlord's decision on this case after reading it back to them and getting a clear yes. Only the landlord (or their named agent) can give it.",
    kind: 'write',
    parameters: z.object({
      decision: z
        .enum(['approve', 'decline', 'own_contractor', 'wants_second_quote', 'needs_more_info'])
        .describe('approve = go ahead with our contractor/quote; own_contractor = landlord arranges their own; wants_second_quote = get another quote first'),
      amount_gbp: z.number().optional().describe('Amount approved in pounds, e.g. 180. Only if they approved a specific amount'),
      conditions: z.string().optional().describe('Any limit or condition they set, e.g. "up to 250 pounds", "only after checking the warranty"'),
      own_contractor_details: z.string().optional().describe('Name and contact of the landlord\'s own contractor, if they gave them'),
      notes: z.string().optional().describe('Anything else that matters for the case, in one or two sentences'),
    }),
    run: (args, ctx) => ({ ok: true, decision_id: record(ctx, 'record_landlord_decision', args, 'LLD').id }),
  }),
  def({
    name: 'record_appointment',
    description: 'Record an agreed visit date and time window after reading it back. Say who confirmed it.',
    kind: 'write',
    parameters: z.object({
      date: z.string().describe('Visit date in ISO format YYYY-MM-DD, e.g. 2026-10-14'),
      time_window: z.string().describe('e.g. "08:00-12:00" or "after 10am"'),
      confirmed_by: z.enum(['tenant', 'landlord', 'contractor']).describe('Who agreed this date on the call'),
      access_notes: z.string().optional().describe('Keys, pets, parking, who will be home'),
    }),
    run: (args, ctx) => ({ ok: true, appointment_id: record(ctx, 'record_appointment', args, 'APT').id }),
  }),
  def({
    name: 'record_contractor_update',
    description: "Record the contractor's status on the job after reading it back.",
    kind: 'write',
    parameters: z.object({
      status: z
        .enum(['booked', 'fixed', 'needs_quote', 'quote_given', 'no_access', 'warranty', 'cannot_do', 'no_update'])
        .describe('Where the job stands according to the contractor'),
      quote_amount_gbp: z.number().optional().describe('Quoted price in pounds, if they gave one'),
      next_date: z.string().optional().describe('Next visit or deadline, ISO YYYY-MM-DD, if any'),
      notes: z.string().optional().describe('Parts on order, what was found, why there is a delay'),
    }),
    run: (args, ctx) => ({ ok: true, update_id: record(ctx, 'record_contractor_update', args, 'CTR').id }),
  }),
  def({
    name: 'add_case_note',
    description:
      'Add a note to the case for the team: a conflict (wrong address, different dates), a new unrelated issue to split out, a warranty question, or something the caller asked that needs follow-up.',
    kind: 'write',
    parameters: z.object({
      kind: z.enum(['conflict', 'new_issue', 'warranty', 'follow_up', 'other']),
      note: z.string().describe('One or two plain sentences'),
    }),
    run: (args, ctx) => ({ ok: true, note_id: record(ctx, 'add_case_note', args, 'NOTE').id }),
  }),
];

/** Read-back for case tools: the record must be in this call's case log, independently of the write's reply. */
export function verifyCaseTool(name: string, result: Record<string, unknown> | undefined, ctx: ToolContext): Verification | undefined {
  if (!caseTools.some((t) => t.name === name)) return undefined;
  const id = Object.entries(result ?? {}).find(([k]) => k.endsWith('_id'))?.[1];
  const rec = log(ctx).find((r) => r.id === id);
  return rec
    ? { status: 'verified', ref: rec.id, evidence: `${rec.id} is in the case log` }
    : { status: 'not_applied', evidence: id ? `${String(id)} was returned but is not in the case log` : `no ${name} record` };
}
