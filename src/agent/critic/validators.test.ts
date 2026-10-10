import { describe, expect, it } from 'vitest';
import type { LedgerEntry } from '../ledger.js';
import { escalationPacketProblems, preCriticProblems } from './validators.js';

const complete = { priority: 'P2', team: 'maintenance', reason: 'r', known: 'Leak under the sink since Monday', missing: 'Landlord spend limit', options: ['Approve £300 quote', 'Get a second quote'], recommendation: 'Approve the £300 quote today' };
const esc = (id: string, args: Record<string, unknown>, status: LedgerEntry['status'] = 'verified'): LedgerEntry => ({ id, tool: 'escalate_to_human', args, key: id, attempts: 1, status, evidence: [] });
const brief = '# Case\n\n## Questions / decision points\n\n1. What severity is this?\n2. What do you tell the tenant?\n3. Which contractor do you assign?\n';

describe('preCriticProblems', () => {
  it('names the unanswered decision-point question', () => {
    const answers = [
      { question: 'What severity is this?', answer: 'urgent' },
      { question: 'What do you tell the tenant?', answer: 'turn off the stopcock' },
    ];
    const p = preCriticProblems({ answers }, [], brief);
    expect(p).toHaveLength(1);
    expect(p[0]).toContain('"Which contractor do you assign?"');
  });

  it('passes a draft with every question answered and no escalation', () => {
    expect(preCriticProblems({ answers: ['a', 'b', 'c'].map((x) => ({ question: x, answer: x })) }, [], brief)).toEqual([]);
  });

  it('packet completeness: empty options or empty known is reported, a complete packet passes', () => {
    expect(preCriticProblems({}, [esc('A1', { ...complete, options: [] })], '')).toEqual([expect.stringContaining('escalation packet incomplete: options (A1)')]);
    expect(preCriticProblems({}, [esc('A1', { ...complete, known: '' })], '')).toEqual([expect.stringContaining('escalation packet incomplete: known (A1)')]);
    expect(preCriticProblems({}, [esc('A1', complete)], '')).toEqual([]);
  });

  it('ignores unverified escalations and thin packets fixed by a later complete one to the same team', () => {
    expect(preCriticProblems({}, [esc('A1', { ...complete, options: [] }, 'failed')], '')).toEqual([]);
    expect(preCriticProblems({}, [esc('A1', { ...complete, options: [] }), esc('A2', complete)], '')).toEqual([]);
    expect(preCriticProblems({}, [esc('A1', { ...complete, options: [] }), esc('A2', { ...complete, team: 'fraud' })], '')).toHaveLength(1);
  });
});

describe('escalationPacketProblems', () => {
  it('lists every thin field', () => {
    expect(escalationPacketProblems({ known: 'k', missing: '', recommendation: 'short', options: [' '] })).toEqual(['known', 'missing', 'recommendation', 'options']);
  });
});
