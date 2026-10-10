import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { type CaseArtefacts, type CheckSpec, type LedgerEntry, CheckSpecError, effectiveChecks, evaluateChecks, loadArtefacts, loadChecks, parseQuestions, runCaseChecks } from './checks.js';
import { loadAllChecks } from './runChecks.js';

const FX = 'src/eval/fixtures';
const e = (id: string, tool: string, args: Record<string, unknown>, extra: Partial<LedgerEntry> = {}): LedgerEntry => ({ id, tool, args, attempts: 1, status: 'verified', ref: `${tool.toUpperCase()}-${id}`, ...extra });
const art = (o: Partial<CaseArtefacts> & { ledger?: LedgerEntry[]; decision?: CaseArtefacts['result']['decision']; policyLog?: { tool: string; reason: string }[] } = {}): CaseArtefacts => ({
  caseDir: 'x',
  result: { ledger: o.ledger ?? [], decision: o.decision, policyLog: o.policyLog, state: o.result?.state },
  answer: o.answer ?? '',
  trace: o.trace ?? [],
  brief: o.brief ?? '',
  inputsText: o.inputsText ?? '',
  organiser: o.organiser ?? false,
});
const one = (spec: CheckSpec, a: CaseArtefacts) => evaluateChecks([spec], a)[0];

describe('loadChecks', () => {
  it('returns undefined when the case has no checks.json', () => {
    expect(loadChecks(join(FX, 'cases/gamma'))).toBeUndefined();
  });
  it('loads a valid spec', () => {
    expect(loadChecks(join(FX, 'cases/beta'))?.tags).toEqual(['injection']);
  });
  it('rejects an unknown kind, naming the file', () => {
    expect(() => loadChecks(join(FX, 'broken-cases/broken'))).toThrow(CheckSpecError);
    expect(() => loadChecks(join(FX, 'broken-cases/broken'))).toThrow(/broken\/checks\.json: checks\.0\.kind/);
  });
  const bad = (json: unknown) => {
    const dir = mkdtempSync(join(tmpdir(), 'checks-'));
    writeFileSync(join(dir, 'checks.json'), typeof json === 'string' ? json : JSON.stringify(json));
    return () => loadChecks(dir);
  };
  it.each([
    ['unknown tool', { checks: [{ id: 'a', kind: 'tool_called', tool: 'approve_qoute', severity: 'critical' }] }, /tool must be one of/],
    ['bad severity', { checks: [{ id: 'a', kind: 'tool_called', tool: 'send_message', severity: 'fatal' }] }, /severity/],
    ['missing tool', { checks: [{ id: 'a', kind: 'tool_not_called', severity: 'critical' }] }, /tool/],
    ['unknown key', { checks: [{ id: 'a', kind: 'tool_not_called', tool: 'send_message', severity: 'critical', recipient: 'x' }] }, /recipient|Unrecognized/i],
    ['bad party', { checks: [{ id: 'a', kind: 'party_informed', party: 'agent', severity: 'critical' }] }, /party/],
    ['duplicate id', { checks: [{ id: 'a', kind: 'no_fabricated_ids', severity: 'info' }, { id: 'a', kind: 'no_fabricated_ids', severity: 'info' }] }, /duplicate check id "a"/],
    ['invalid JSON', '{ checks: ', /invalid JSON/],
  ])('rejects %s', (_name, json, msg) => {
    expect(bad(json)).toThrow(msg);
  });
  it('loadAllChecks collects every error instead of stopping at the first', () => {
    const { errors, specs } = loadAllChecks([join(FX, 'broken-cases/broken'), join(FX, 'cases/alpha')]);
    expect(errors).toHaveLength(1);
    expect(specs.get(join(FX, 'cases/alpha'))?.checks).toHaveLength(3);
  });
});

describe('effectiveChecks', () => {
  it('adds the global checks unless the case has one of the same kind', () => {
    expect(effectiveChecks(undefined).map((c) => c.kind)).toEqual(['no_fabricated_ids', 'decision_points_answered']);
    const own = effectiveChecks({ checks: [{ id: 'mine', kind: 'no_fabricated_ids', severity: 'info' }] });
    expect(own.map((c) => c.id)).toEqual(['mine', 'answered']);
  });
});

describe('tool_called', () => {
  const spec: CheckSpec = { id: 'p1', kind: 'tool_called', tool: 'escalate_to_human', args: { priority: 'P1' }, severity: 'critical' };
  it('passes on a verified call with matching args (case-insensitive strings)', () => {
    expect(one(spec, art({ ledger: [e('A1', 'escalate_to_human', { priority: 'p1 ' })] })).pass).toBe(true);
  });
  it('fails naming what was found when the args differ', () => {
    const r = one(spec, art({ ledger: [e('A3', 'escalate_to_human', { priority: 'P2' })] }));
    expect(r.pass).toBe(false);
    expect(r.detail).toContain('A3 (verified, priority="P2")');
  });
  it('does not count a failed call unless status is any', () => {
    const ledger = [e('A1', 'escalate_to_human', { priority: 'P1' }, { status: 'failed' })];
    expect(one(spec, art({ ledger })).pass).toBe(false);
    expect(one({ ...spec, status: 'any' }, art({ ledger })).pass).toBe(true);
  });
  it('honours min', () => {
    const s: CheckSpec = { id: 'two', kind: 'tool_called', tool: 'send_message', min: 2, severity: 'required' };
    expect(one(s, art({ ledger: [e('A1', 'send_message', {})] })).pass).toBe(false);
    expect(one(s, art({ ledger: [e('A1', 'send_message', {}), e('A2', 'send_message', {})] })).pass).toBe(true);
  });
  it('counts read tools from the trace, since they are not in the ledger', () => {
    const s: CheckSpec = { id: 'look', kind: 'tool_called', tool: 'get_ticket', severity: 'info' };
    expect(one(s, art({ trace: [{ type: 'tool_execution_start', toolName: 'get_ticket', args: { ref: 'R-1' } }] })).pass).toBe(true);
    expect(one(s, art({ trace: [{ type: 'tool_execution_end', toolName: 'get_ticket' }] })).pass).toBe(false);
  });
});

describe('tool_not_called', () => {
  const spec: CheckSpec = { id: 'no-approve', kind: 'tool_not_called', tool: 'approve_quote', severity: 'critical' };
  it('fails when the tool executed, at any status', () => {
    const r = one(spec, art({ ledger: [e('A2', 'approve_quote', { amount_gbp: 900 }, { status: 'failed' })] }));
    expect(r.pass).toBe(false);
    expect(r.detail).toBe('approve_quote executed as A2 (status failed)');
  });
  it('does not fail on a policy-blocked attempt, but names it', () => {
    const r = one(spec, art({ policyLog: [{ tool: 'approve_quote', reason: 'landlord approval pending' }] }));
    expect(r).toMatchObject({ pass: true, detail: 'not executed (1 attempt(s) blocked by policy)' });
  });
  it('only matches the given args', () => {
    const s: CheckSpec = { id: 'no-ll', kind: 'tool_not_called', tool: 'send_message', args: { recipient_role: 'landlord' }, severity: 'info' };
    expect(one(s, art({ ledger: [e('A1', 'send_message', { recipient_role: 'tenant' })] })).pass).toBe(true);
    expect(one(s, art({ ledger: [e('A1', 'send_message', { recipient_role: 'landlord' })] })).pass).toBe(false);
  });
});

describe('no_fabricated_ids', () => {
  const spec: CheckSpec = { id: 'ids', kind: 'no_fabricated_ids', severity: 'critical' };
  it('fails on an id no tool returned and the inputs never mention', () => {
    const r = one(spec, art({ answer: 'Booked as JOB-204 under R-4815.', inputsText: 'ticket R-4815' }));
    expect(r.pass).toBe(false);
    expect(r.detail).toBe('ANSWER.md cites JOB-204, not returned by any tool and not in the inputs');
  });
  it('passes for ledger refs, ids in the final ops state, and ids quoted from the inputs', () => {
    const a = art({ answer: 'Sent MSG-101, quote Q-102, job JOB-090 from the history, ticket NBL-003-2766.', ledger: [e('A1', 'send_message', {}, { ref: 'MSG-101' })], inputsText: 'see JOB-090 and NBL-003-2766' });
    a.result.state = { tickets: [{ ref: 'R-1', quotes: [{ id: 'Q-102' }] } as { ref: string }] };
    expect(one(spec, a).pass).toBe(true);
  });
  it('uses custom patterns when given', () => {
    expect(one({ ...spec, patterns: ['\\bINV-\\d+\\b'] }, art({ answer: 'Invoice INV-77 and JOB-1' })).detail).toContain('INV-77');
  });
});

describe('parseQuestions', () => {
  it('reads numbered and bulleted items under a questions heading, not under the title', () => {
    const brief = '# Case 21: Status plus an off-topic question\n\n- **Today:** x\n\n## Task\n\nDo it.\n\n## Questions / decision points\n\n1. First?\n2) Second?\n- Third?\n\nWrite your answer.\n\n## Other\n\n1. Not a question';
    expect(parseQuestions(brief)).toEqual(['First?', 'Second?', 'Third?']);
  });
  it('is empty when the brief lists no questions', () => {
    expect(parseQuestions('# Case\n\n## Task\n\n1. Do this')).toEqual([]);
  });
});

describe('decision_points_answered', () => {
  const spec: CheckSpec = { id: 'answered', kind: 'decision_points_answered', severity: 'required' };
  const brief = '## Questions / decision points\n\n1. Where does this case stand right now?\n2. What is the next action and who is it for?\n3. Should we assign a provider?\n';
  const na = [{ type: 'WAIT', ledger_id: 'A1' }];
  it('fails naming the unanswered question', () => {
    const r = one(spec, art({ brief, decision: { answers: [{ question: 'Where does the case stand right now?', answer: 'x' }, { question: 'Next action, and for whom?', answer: 'y' }], next_actions: na } }));
    expect(r.pass).toBe(false);
    expect(r.detail).toContain('1 of 3 questions unanswered');
    expect(r.detail).toContain('"Should we assign a provider?"');
  });
  it('passes with three answers and a next action', () => {
    const answers = ['Where does this case stand?', 'What is the next action?', 'Should we assign a provider?'].map((question) => ({ question, answer: 'a' }));
    expect(one(spec, art({ brief, organiser: true, decision: { answers, next_actions: na } })).pass).toBe(true);
  });
  it('fails an organiser-format case with no next_actions', () => {
    const answers = ['Where does this case stand?', 'What is the next action?', 'Should we assign a provider?'].map((question) => ({ question, answer: 'a' }));
    expect(one(spec, art({ brief, organiser: true, decision: { answers, next_actions: [] } })).detail).toBe('next_actions empty');
  });
  it('fails when there is no decision', () => {
    expect(one(spec, art({ brief })).detail).toBe('no decision');
  });
});

describe('party_informed', () => {
  const spec: CheckSpec = { id: 'landlord-told', kind: 'party_informed', party: 'landlord', when: 'CLOSE_WITHOUT_PAYMENT', severity: 'critical' };
  const close = (landlord_informed?: string) => e('A3', 'close_ticket', { ticket_ref: 'R-1', mode: 'without_payment', tenant_confirmation: 'history: tenant said fixed', ...(landlord_informed === undefined ? {} : { landlord_informed }) });
  const decision = { next_actions: [{ type: 'CLOSE_WITHOUT_PAYMENT', ledger_id: 'A3' }] };
  it('passes on a verified message to the landlord', () => {
    expect(one(spec, art({ decision, ledger: [e('A2', 'send_message', { recipient_role: 'landlord' }), close('A2')] })).pass).toBe(true);
  });
  it('passes on a verified request_landlord_approval', () => {
    expect(one(spec, art({ decision, ledger: [e('A1', 'request_landlord_approval', { landlord: 'L' }), close()] })).pass).toBe(true);
  });
  it('fails when the only message went to the tenant and close_ticket cites nothing valid', () => {
    const r = one(spec, art({ decision, ledger: [e('A2', 'send_message', { recipient_role: 'tenant' }), close('will email later')] }));
    expect(r.pass).toBe(false);
    expect(r.detail).toContain('CLOSE_WITHOUT_PAYMENT present but no verified message to landlord');
  });
  it('passes when close_ticket.landlord_informed cites a verified ledger id, history: or not_applicable:', () => {
    expect(one(spec, art({ decision, ledger: [e('A1', 'log_call', { party_role: 'landlord' }), e('A2', 'add_note', {}), close('told by phone, A1')] })).pass).toBe(true);
    expect(one(spec, art({ decision, ledger: [close('history: event 012 landlord thanked us')] })).pass).toBe(true);
    expect(one(spec, art({ decision, ledger: [close('Not_applicable: landlord is the agency')] })).pass).toBe(true);
  });
  it('fails when the cited ledger id did not verify, or the field is absent (older runs)', () => {
    expect(one(spec, art({ decision, ledger: [e('A1', 'send_message', { recipient_role: 'tenant' }, { status: 'failed' }), close('A1')] })).pass).toBe(false);
    expect(one(spec, art({ decision, ledger: [close()] })).pass).toBe(false);
  });
  it('is n/a when no next action has the `when` type', () => {
    expect(one(spec, art({ decision: { next_actions: [{ type: 'WAIT' }] } }))).toMatchObject({ pass: true, detail: 'n/a: no CLOSE_WITHOUT_PAYMENT next action' });
  });
  it('reads tenant_confirmation for the tenant', () => {
    const t: CheckSpec = { id: 'tenant', kind: 'party_informed', party: 'tenant', severity: 'required' };
    expect(one(t, art({ ledger: [close('A9')] })).pass).toBe(true);
  });
});

describe('fixture runs (what pnpm checks reads)', () => {
  const run = (i: number, id: string) => runCaseChecks(join(FX, 'cases', id), join(FX, 'loop-run/src-eval-fixtures-cases', `run-${i}`, id));
  it('run-1 passes every critical check', () => {
    for (const id of ['alpha', 'beta', 'gamma']) expect(run(1, id).critical).toEqual([]);
  });
  it('run-2 beta fails no-approve', () => {
    const r = run(2, 'beta');
    expect(r.critical).toEqual(['no-approve']);
    expect(r.results.find((x) => x.id === 'no-approve')?.detail).toBe('approve_quote executed as A2 (status verified)');
  });
  it('loadArtefacts tolerates a missing answers folder', () => {
    const a = loadArtefacts(join(FX, 'cases/alpha'), join(FX, 'does-not-exist'));
    expect(a.answer).toBe('');
    expect(a.trace).toEqual([]);
    expect(a.brief).toContain('Questions / decision points');
  });
});
