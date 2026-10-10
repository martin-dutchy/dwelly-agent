import { createModels, fauxAssistantMessage, fauxProvider, fauxToolCall } from '@earendil-works/pi-ai';
import { describe, expect, it } from 'vitest';
import { runCase } from './caseAgent.js';
import { CHECKLIST, CRITIC_PROMPT, type ReviewItem } from './critic/critic.js';
import { createOpsToolset } from './opsTools.js';

const prompt = '<case id="t">\n# Case t: Blocked toilet\n\nThe landlord has not replied to the quote of £640 from Swift Plumbing.\n\n## Questions / decision points\n\n1. What severity is this?\n</case>\n\n<inputs>\n</inputs>';
const answers = [{ question: 'What severity is this?', answer: 'Routine: one toilet of two works.' }];
const decision = (over: Record<string, unknown> = {}) => ({
  case_state: 'open', next_actions: [{ type: 'OTHER', action: 'none', recipient: 'internal', channel: 'internal' }], boundaries: [], remaining_work: [], missing_info: [],
  outcome: 'action_taken', severity: 'routine', summary: 's', answers, actions_claimed: [], failed_actions: [], conflicts: [], assumptions: [],
  ...over,
});
const review = (finding?: Partial<ReviewItem>) => ({ items: CHECKLIST.map(([id]) => ({ id, verdict: 'yes', evidence_quote: '', source: '' })).map((i) => (finding && i.id === finding.id ? { ...i, ...finding } : i)) });
const realFinding = { id: 'M1', verdict: 'no' as const, evidence_quote: 'The landlord has not replied to the quote of £640', source: 'case', finding: 'Spend is implied before the landlord approved.', fix: 'Ask the landlord to approve the quote.' };
const escalation = { priority: 'P2', team: 'maintenance', reason: 'r', known: 'Quote of £640 is waiting', missing: 'The landlord decision', options: ['Approve', 'Second quote'], recommendation: 'Ask the landlord again today' };

type Step = Parameters<ReturnType<typeof fauxProvider>['setResponses']>[0][number];
async function run(agentSteps: Step[], criticSteps?: Step[], timeoutMs?: number) {
  const agentFaux = fauxProvider();
  const agentModels = createModels();
  agentModels.setProvider(agentFaux.provider);
  agentFaux.setResponses(agentSteps);
  const criticFaux = fauxProvider({ provider: 'critic-faux', api: 'critic-faux' });
  const criticModels = createModels();
  criticModels.setProvider(criticFaux.provider);
  criticFaux.setResponses(criticSteps ?? []);
  const r = await runCase({
    caseId: 't',
    prompt,
    systemPrompt: 'test',
    model: agentFaux.getModel(),
    streamFn: agentModels.streamSimple.bind(agentModels),
    toolset: createOpsToolset([{ ref: 'J-1', stage: 'double_quotation' }]),
    timeoutMs,
    critic: criticSteps ? { model: criticFaux.getModel(), streamFn: criticModels.streamSimple.bind(criticModels), attachments: [] } : undefined,
  });
  return { ...r, criticCalls: criticFaux.state.callCount, results: r.messages.filter((m: any) => m.role === 'toolResult').map((m: any) => m.content[0].text as string) };
}
const submit = (over?: Record<string, unknown>) => fauxAssistantMessage([fauxToolCall('submit_decision', decision(over))]);
const criticEvents = (trace: unknown[]) => trace.filter((e: any) => e.type === 'critic');

describe('pre-submit critic', () => {
  it('one revision only: a kept finding blocks the first submit, the second is accepted, the critic runs once', async () => {
    const r = await run([submit(), submit({ assumptions: ['The quote stays unapproved until the landlord replies.'] })], [fauxAssistantMessage([fauxToolCall('submit_review', review(realFinding))])]);
    expect(r.results[0]).toMatch(/^Pre-submit review/);
    expect(r.results[0]).toContain('[M1]');
    expect(r.decision?.assumptions).toHaveLength(1);
    expect(r.criticCalls).toBe(1);
    expect(r.critic).toMatchObject({ status: 'ok', kept: [{ id: 'M1' }], dropped: [] });
    expect(r.critic?.unaddressed).toEqual(['[M1] Spend is implied before the landlord approved.']);
    expect(criticEvents(r.trace)).toHaveLength(1);
  });

  it('drops a finding without evidence and accepts the draft at once', async () => {
    const r = await run([submit()], [fauxAssistantMessage([fauxToolCall('submit_review', review({ ...realFinding, evidence_quote: 'The tenant is 92 and has no heating at all' }))])]);
    expect(r.decision).toBeDefined();
    expect(r.critic).toMatchObject({ status: 'ok', kept: [], dropped: [{ id: 'M1' }] });
  });

  it('critic error never blocks: the first submit is accepted', async () => {
    const r = await run([submit()], [fauxAssistantMessage('', { stopReason: 'error', errorMessage: 'invalid request' })]);
    expect(r.decision?.outcome).toBe('action_taken');
    expect(r.critic?.status).toBe('error');
    expect(r.messages.filter((m: any) => m.role === 'toolResult')).toHaveLength(1);
  });

  it('is skipped when less than 60 s of the case remains', async () => {
    const r = await run([submit()], [fauxAssistantMessage([fauxToolCall('submit_review', review(realFinding))])], 30_000);
    expect(r.critic).toMatchObject({ status: 'skipped', reason: 'low_time' });
    expect(r.criticCalls).toBe(0);
    expect(r.decision).toBeDefined();
  });

  it('revision tiers: approve, assign, close and cancel are blocked and logged; messages, follow-ups and escalation run', async () => {
    const r = await run(
      [
        submit(),
        fauxAssistantMessage([fauxToolCall('approve_quote', { ticket_ref: 'J-1', amount_gbp: 640, contractor: 'Swift Plumbing', approval_basis: 'review' })]),
        fauxAssistantMessage([fauxToolCall('assign_contractor', { ticket_ref: 'J-1', contractor: 'Swift Plumbing', visit_window: '2026-10-12 08:00-12:00' })]),
        fauxAssistantMessage([fauxToolCall('cancel_ticket', { ref: 'J-1', reason: 'x' })]),
        fauxAssistantMessage([fauxToolCall('close_ticket', { ticket_ref: 'J-1', mode: 'without_payment', resolution: 'r', tenant_confirmation: 't', landlord_informed: 'l' })]),
        fauxAssistantMessage([fauxToolCall('send_message', { recipient_name: 'Ava Kendall', recipient_role: 'landlord', channel: 'email', contact: 'ava@example.com', body: 'Please approve or decline the £640 quote for J-1.' })]),
        fauxAssistantMessage([fauxToolCall('schedule_follow_up', { ticket_ref: 'J-1', due_on: '2026-10-13', purpose: 'chase the landlord' })]),
        fauxAssistantMessage([fauxToolCall('escalate_to_human', escalation)]),
        submit({ actions_claimed: ['A1', 'A2', 'A3'].map((ledger_id) => ({ ledger_id, description: 'done' })) }),
      ],
      [fauxAssistantMessage([fauxToolCall('submit_review', review(realFinding))])],
    );
    expect(r.policyLog.map((p) => p.tool)).toEqual(['approve_quote', 'assign_contractor', 'cancel_ticket', 'close_ticket']);
    expect(r.policyLog.every((p) => p.reason.includes('after the pre-submit review'))).toBe(true);
    expect(r.ledger.map((e) => [e.tool, e.status])).toEqual([
      ['send_message', 'verified'],
      ['schedule_follow_up', 'verified'],
      ['escalate_to_human', 'verified'],
    ]);
    expect(r.decision).toBeDefined();
    expect(r.criticCalls).toBe(1);
  });

  it('validators run before the critic: an unanswered question blocks without a critic call', async () => {
    const r = await run([submit({ answers: [] }), submit()], [fauxAssistantMessage([fauxToolCall('submit_review', review())])]);
    expect(r.results[0]).toContain('"What severity is this?"');
    expect(r.criticCalls).toBe(1);
    expect(r.critic?.status).toBe('ok');
    expect(r.decision?.answers).toHaveLength(1);
  });

  it('with the critic off there is no critic call, result or trace event', async () => {
    const r = await run([submit()]);
    expect(r.critic).toBeUndefined();
    expect(criticEvents(r.trace)).toHaveLength(0);
    expect(r.decision).toBeDefined();
  });
});

describe('deterministic pre-submit checks', () => {
  it('rejects an escalation with a thin packet and accepts the complete one', async () => {
    const r = await run([fauxAssistantMessage([fauxToolCall('escalate_to_human', { ...escalation, options: [] })]), fauxAssistantMessage([fauxToolCall('escalate_to_human', escalation)]), submit({ actions_claimed: [{ ledger_id: 'A1', description: 'escalated' }] })]);
    expect(r.results[0]).toContain('Escalation packet incomplete: options');
    expect(r.ledger.map((e) => e.tool)).toEqual(['escalate_to_human']);
    expect(r.decision).toBeDefined();
  });

  it('gives up on the question check after two blocks so a decision always lands', async () => {
    const r = await run([submit({ answers: [] }), submit({ answers: [] }), submit({ answers: [] })]);
    expect(r.results.slice(0, 2).every((t) => t.includes('missing 1 of'))).toBe(true);
    expect(r.decision?.answers).toEqual([]);
  });
});

describe('critic prompt', () => {
  it('speaks only about reviewing the draft', () => {
    expect(CRITIC_PROMPT).not.toMatch(/judge|grader|score/i);
  });
});
