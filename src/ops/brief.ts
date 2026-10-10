import { Agent, type AgentTool } from '@earendil-works/pi-agent-core';
import type { TSchema } from '@earendil-works/pi-ai';
import { z } from 'zod';
import { claude, streamFn } from '../agent/models.js';
import type { HumanTask } from './store.js';

/**
 * The decision page's five-second version of a task: the question in plain words, what the tenant actually
 * said, at most three facts that matter (each with its source), what nobody knows yet, and a draft reply the
 * person can edit. Written once per task by a fast model from the full context, cached, with a plain fallback.
 * Everything else stays one click away under "Full brief".
 */

const Brief = z.object({
  question: z.string().describe('The decision as a plain question, max 12 words, e.g. "Does the tenant need to register for a garage space?"'),
  said: z.object({ text: z.string().describe('What the tenant/caller actually asked, verbatim or near-verbatim, max 25 words'), source: z.string().describe('Where it is from, e.g. "Tenant email, 9 May (event 011)"') }).optional(),
  facts: z.array(z.object({ text: z.string().describe('One fact that matters for this decision, max 14 words'), source: z.string().describe('Short source, e.g. "event 007" or "CRM"') })).max(3),
  unknown: z.string().describe('What nobody on the case knows yet that this decision needs, max 16 words'),
  suggest: z.string().describe("The agent's suggestion in max 14 words"),
  reply: z.string().optional().describe('If the person should answer the tenant: a short, warm WhatsApp draft (max 45 words) that states only what is known and never invents policy, dates or amounts. Omit if no reply to the tenant is needed.'),
});
export type Brief = z.infer<typeof Brief>;

const PROMPT = `You condense an escalation from an AI property-management agent into what a busy lettings operations person needs to decide in five seconds.
Use only the facts provided. Never invent policy, amounts, dates or names. Plain British English, sentence case, no jargon, no ledger ids.
Call submit_brief exactly once.`;

const cache = new Map<string, Brief>();
const pending = new Map<string, Promise<Brief>>();

/** Plain fallback: the task's own words, trimmed. */
export function fallbackBrief(t: HumanTask): Brief {
  const x = t.context;
  const facts = (x.known ?? '').split(/(?<=[.;])\s+(?=[A-Z0-9£])/).filter(Boolean).slice(0, 3).map((f) => ({ text: f.length > 110 ? `${f.slice(0, 108)}…` : f, source: 'case' }));
  return {
    question: t.question.split(/[;.]/)[0],
    facts,
    unknown: x.missing || x.missing_info?.[0] || 'Nothing missing was flagged.',
    suggest: t.recommendation ?? 'No recommendation.',
  };
}

export async function briefFor(t: HumanTask, opts: { model?: string; timeoutMs?: number } = {}): Promise<Brief> {
  const hit = cache.get(t.id);
  if (hit) return hit;
  const running = pending.get(t.id);
  if (running) return running;
  const job = (async () => {
    let out: Brief | undefined;
    const submit: AgentTool = {
      name: 'submit_brief',
      label: 'submit_brief',
      description: 'Submit the brief.',
      parameters: z.toJSONSchema(Brief) as unknown as TSchema,
      execute: async (_id, p) => {
        out = Brief.parse(p);
        return { content: [{ type: 'text', text: 'ok' }], details: out, terminate: true };
      },
    };
    const agent = new Agent({ initialState: { systemPrompt: PROMPT, model: claude(opts.model ?? process.env.OPS_BRIEF_MODEL ?? 'claude-haiku-5-5'), tools: [submit] }, streamFn });
    const x = t.context;
    const input = JSON.stringify({
      escalation: t.question,
      team: t.team,
      agent_recommendation: t.recommendation,
      options: t.options,
      where_it_stands: x.case_state,
      known: x.known,
      missing: x.missing,
      missing_info: x.missing_info,
      conflicts: x.conflicts,
      already_done: x.next_actions,
      not_done: x.boundaries,
      call_summary: x.call?.summary,
      latest_case_events: x.recent_history?.slice(0, 4000),
    });
    const timer = setTimeout(() => agent.abort(), opts.timeoutMs ?? 20_000);
    try {
      await agent.prompt(input);
    } finally {
      clearTimeout(timer);
    }
    const b = out ?? fallbackBrief(t);
    if (out) cache.set(t.id, b);
    return b;
  })().catch(() => fallbackBrief(t));
  pending.set(t.id, job);
  try {
    return await job;
  } finally {
    pending.delete(t.id);
  }
}

/** Warm the cache in the background so the page opens instantly. */
export const warmBrief = (t: HumanTask) => void briefFor(t).catch(() => {});
