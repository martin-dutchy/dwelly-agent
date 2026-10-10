import { describe, expect, it } from 'vitest';
import type { Decision } from './caseAgent.js';
import type { LoadedCase } from './cases.js';
import type { CriticResult } from './critic/critic.js';
import { renderAnswer, renderReasoning } from './report.js';

const c = { id: 't', brief: '# Case t: Leak', inputs: [], media: [], failures: {} } as unknown as LoadedCase;
const d: Decision = {
  case_state: 'open', next_actions: [{ type: 'OTHER', action: 'none', recipient: 'internal', channel: 'internal' }], boundaries: [], remaining_work: [], missing_info: [],
  outcome: 'action_taken', severity: 'routine', summary: 's', answers: [], actions_claimed: [], failed_actions: [], conflicts: [], assumptions: ['The quote stays unapproved.'],
};
const usage = { input: 0, output: 0, cost: 0, turns: 1, durationMs: 1000 };
const base = { model: 'claude-opus-5-5', ms: 21_400, cost: 0.04, items: Array(16).fill({ id: '1', verdict: 'yes', evidence_quote: '', source: '' }), kept: [], dropped: [] };
const finding = { id: 'M2', evidence_quote: 'Invoice attached', source: 'event 019', finding: 'States the invoice total with no invoice present.', fix: 'Ask for the invoice.' };
const results: Record<string, CriticResult> = {
  ok: { ...base, status: 'ok', kept: [finding, { ...finding, id: 'M1' }], dropped: [finding], unaddressed: [] },
  unaddressed: { ...base, status: 'ok', kept: [finding], unaddressed: [`[M2] ${finding.finding}`] },
  error: { ...base, status: 'error', reason: 'timeout after 45 s', ms: 45_000 },
  skipped: { ...base, status: 'skipped', reason: 'low_time', ms: 0 },
};
const reasoning = (r?: CriticResult) => renderReasoning(c, d, [], [], usage, undefined, { critic: r });

describe('Checks performed line', () => {
  it('states each critic status factually, once', () => {
    expect(reasoning(results.ok)).toContain('- Pre-submit critic (claude-opus-5-5, 21 s): 16 items checked, 2 findings with evidence (2 addressed in revision), 1 dropped without evidence.');
    expect(reasoning(results.unaddressed)).toContain('(0 addressed in revision), 0 dropped without evidence.\n  - Not changed after revision: [M2] States the invoice total');
    expect(reasoning(results.error)).toContain('- Pre-submit critic: unavailable (timeout after 45 s); decision submitted without it.');
    expect(reasoning(results.skipped)).toContain('- Pre-submit critic: skipped (less than 60 s of the case time left).');
    for (const r of Object.values(results)) expect(reasoning(r).match(/## Checks performed/g)).toHaveLength(1);
  });

  it('is absent when the critic was off', () => {
    expect(reasoning()).not.toContain('Checks performed');
  });

  it('never reaches ANSWER.md', () => {
    expect(renderAnswer(c, d, [])).not.toMatch(/critic|review|score|checklist/i);
  });
});
