import { Agent, type AgentTool } from '@earendil-works/pi-agent-core';
import type { TSchema } from '@earendil-works/pi-ai';
import { z } from 'zod';
import { claude, streamFn } from '../agent/models.js';
import type { HumanTask } from './store.js';

/**
 * The decision page's short version of a task: the question in plain words, what the tenant actually
 * said, at most three facts that matter (each with its source), what nobody knows yet, and a draft reply the
 * person can edit. Written once per task by a fast model from the full context, cached, with a plain fallback.
 * The raw record stays one click away under "Everything the agent saw".
 */

const Brief = z.object({
  question: z.string().describe('The decision as a plain question, max 12 words, e.g. "Does the tenant need to register for a garage space?"'),
  said: z.object({ text: z.string().describe('What the tenant/caller actually asked, verbatim or near-verbatim, max 25 words'), source: z.string().describe('Where it is from, e.g. "Tenant email, 9 May (event 011)"') }).optional(),
  timeline: z
    .array(z.object({ when: z.string().describe('Short date, e.g. "17 Apr"'), what: z.string().describe('What happened, max 14 words, plain words, who did what') }))
    .max(5)
    .describe('The case so far in 3 to 5 steps, oldest first, ending with the message that needs an answer. Skip system noise (holds, status moves).'),
  why: z.string().describe('Why the agent could not settle this itself, max 20 words, e.g. "No parking rules for this building in the case or tenancy records."'),
  facts: z.array(z.object({ text: z.string().describe('One fact that matters for this decision, max 14 words'), source: z.string().describe('Short source, e.g. "event 007" or "CRM"') })).max(3),
  unknown: z.string().describe('What nobody on the case knows yet that this decision needs, max 16 words'),
  suggest: z.string().describe("The agent's suggestion in max 14 words"),
  reply: z.string().optional().describe('If the person should answer the tenant: a short, warm WhatsApp draft (max 45 words) that states only what is known and never invents policy, dates or amounts. Omit if no reply to the tenant is needed.'),
});
export type Brief = z.infer<typeof Brief>;

const PROMPT = `You condense an escalation from an AI property-management agent into what a busy lettings operations person needs to make the decision well: the case so far, what is known, what is not, and why it needs a person.
Use only the facts provided. Never invent policy, amounts, dates or names. Plain British English, sentence case, no jargon, no ledger ids.
Call submit_brief exactly once.`;

const cache = new Map<string, Brief>();
const pending = new Map<string, Promise<Brief>>();

/** Plain fallback: the task's own words, trimmed. */
export function fallbackBrief(t: HumanTask): Brief {
  const timeline = (t.context.recent_history ?? '')
    .split(/^### /m)
    .map((b) => {
      const when = b.match(/^(\d{4}-\d{2}-\d{2})/)?.[1];
      const from = b.match(/^- \*\*From:\*\* (.*)$/m)?.[1] ?? '';
      const text = b.replace(/^.*\n/, '').replace(/^- \*\*\w+:\*\* .*$/gm, '').trim().split('\n')[0] ?? '';
      return when && text && !/system/i.test(from) ? { when: new Date(when).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }), what: `${from}: ${text.length > 90 ? `${text.slice(0, 88)}…` : text}` } : undefined;
    })
    .filter((e): e is { when: string; what: string } => !!e)
    .slice(-5);
  const x = t.context;
  const facts = (x.known ?? '').split(/(?<=[.;])\s+(?=[A-Z0-9£])/).filter(Boolean).slice(0, 3).map((f) => ({ text: f.length > 110 ? `${f.slice(0, 108)}…` : f, source: 'case' }));
  return {
    question: t.question.split(/[;.]/)[0],
    timeline,
    why: x.case_state ?? t.question,
    facts,
    unknown: x.missing || x.missing_info?.[0] || 'Nothing missing was flagged.',
    suggest: t.recommendation ?? 'No recommendation.',
  };
}

export async function briefFor(t: HumanTask, opts: { model?: string; timeoutMs?: number; caseIntro?: string } = {}): Promise<Brief> {
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
      case_intro: opts.caseIntro?.slice(0, 2500),
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
export const warmBrief = (t: HumanTask, caseIntro?: string) => void briefFor(t, { caseIntro }).catch(() => {});

/** The case's own opening (details and initial request), never its overview or outcome, which describe the future. */
export const caseIntro = (c: { title: string; property?: string | null; index_md: string }) =>
  [c.title, c.property ?? '', c.index_md.split(/^## (Overview|Outcome|History)\b/m)[0] ?? ''].join('\n').slice(0, 2500);
