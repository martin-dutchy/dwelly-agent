import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { type Miss, type RunResult, caseFileIndex, classifyMiss, classifyRun, collectMisses, explainMiss, layerTable, summarizeTaxonomy } from './taxonomy.js';

// The skills module is another workstream's; pin it so skill coverage comes from the plan's skill ids.
vi.mock('../agent/skills/index.js', () => ({ listSkills: () => [] }));

const FIX = 'src/eval/fixtures/taxonomy';
const CASE = join(FIX, 'case');
const read = (run: string, file: string) => JSON.parse(readFileSync(join(FIX, 'runs', run, file), 'utf8'));
const classify = (run: string) => {
  const grades = read(run, 'grades.json');
  const out = classifyRun({ key: `fixture/${run}`, run: 1, caseDir: CASE, result: read(run, 'result.json'), grades, checks: grades.checks });
  return Object.fromEntries(out.map((m) => [m.itemId, `${m.layer}:${m.rule}`]));
};

describe('collectMisses', () => {
  it('takes unmet required/positive items, bad items judged true or unclear, and failed checks', () => {
    const misses = collectMisses('c', read('guard', 'grades.json'), read('guard', 'grades.json').checks);
    expect(misses.map((m) => m.itemId)).toEqual(['R1', 'F1', 'X1', 'no-approve']);
    expect(misses.find((m) => m.itemId === 'F1')).toMatchObject({ kind: 'rubric', section: 'red_flags', verdict: 'true' });
    expect(misses.find((m) => m.itemId === 'no-approve')).toMatchObject({ kind: 'check', checkKind: 'tool_not_called' });
  });
  it('a checks-only grades.json (no judge) yields only the failed checks', () => {
    expect(collectMisses('c', { score: null, critical: [] }, [{ id: 'p1', kind: 'tool_called', severity: 'required', pass: false, detail: 'none' }]).map((m) => m.itemId)).toEqual(['p1']);
  });
  it('grades.json files without item texts (the loop fixtures) yield no rubric misses', () => {
    const g = JSON.parse(readFileSync('src/eval/fixtures/loop-run/src-eval-fixtures-cases/run-1/gamma/grades.json', 'utf8'));
    expect(collectMisses('gamma', g, [])).toEqual([]);
  });
});

describe('classifyMiss on fixture runs', () => {
  it('guard: a prohibited tool ran, a bad message went out, a needed action was blocked', () => {
    expect(classify('guard')).toEqual({
      R1: 'guard:blocked_needed_action',
      F1: 'guard:prohibited_action_executed',
      X1: 'guard:prohibited_action_executed',
      'no-approve': 'guard:prohibited_tool_ran',
    });
  });
  it('completion: a claim with no ledger entry, unanswered questions; a failed tool that never verified is guard', () => {
    expect(classify('completion')).toEqual({
      R1: 'completion:claim_not_in_ledger',
      R2: 'guard:tool_failure_unrecovered',
      C1: 'completion:overclaim',
      answered: 'completion:questions_unanswered',
      'landlord-told': 'completion:claim_not_in_ledger',
    });
  });
  it('brief: a conflict nobody surfaced; one the decision acknowledged is the model\'s miss', () => {
    expect(classify('brief')).toEqual({ R1: 'brief:conflict_not_in_brief', R2: 'model_judgement:model_missed', P1: 'model_judgement:model_missed' });
  });
  it('skill: the situation\'s skill was not loaded; with it loaded the miss is the model\'s; unclear stays unclassified', () => {
    expect(classify('skill')).toEqual({ R1: 'skill:skill_not_loaded', R2: 'model_judgement:model_missed', R3: 'unclassified:judge_unclear', F1: 'skill:skill_not_loaded' });
  });
  it('ingest: a file in the folder but not the manifest, and an attachment inside an email never extracted', () => {
    expect(classify('ingest')).toEqual({ R1: 'ingest:attachment_not_extracted', R2: 'ingest:file_not_in_manifest' });
  });
  it('the ingest manifest, when recorded, counts as what the agent saw', () => {
    const result: RunResult = { ...read('ingest', 'result.json'), harness: { manifest: [{ path: 'inputs/email_quote.eml#quote_QH-5521.pdf', included: true }, { path: 'inputs/landlord_note.txt' }] } };
    const miss: Miss = { caseId: 'c', itemId: 'R1', kind: 'rubric', section: 'required_outcomes', verdict: 'false', text: 'Reads the total from quote_QH-5521.pdf.' };
    expect(explainMiss(miss, { result, ...caseFileIndex(CASE) }).layer).not.toBe('ingest');
  });
  it('a loaded skill makes a prose-only bad behaviour the critic\'s', () => {
    const result: RunResult = { ...read('skill', 'result.json'), harness: { skills: ['damp-mould-awaab'] } };
    const miss: Miss = { caseId: 'c', itemId: 'F1', kind: 'rubric', section: 'red_flags', verdict: 'true', text: "Blames the tenant's lifestyle for the mould." };
    expect(explainMiss(miss, { result })).toMatchObject({ layer: 'critic', rule: 'prose_red_flag' });
  });
  it('a required item phrased as a prohibition is missed by doing the thing', () => {
    const miss: Miss = { caseId: 'c', itemId: 'R1', kind: 'rubric', section: 'required_outcomes', verdict: 'false', text: 'Does not approve the £640 quote.' };
    expect(explainMiss(miss, { result: read('guard', 'result.json') })).toMatchObject({ layer: 'guard', rule: 'prohibited_action_executed' });
  });
  it('no decision is unclassified; classifyMiss returns the layer only and tolerates any context', () => {
    const miss: Miss = { caseId: 'c', itemId: 'R1', kind: 'rubric', section: 'required_outcomes', verdict: 'false', text: 'Informs the landlord.' };
    expect(explainMiss(miss, { result: { error: 'timed out' } })).toMatchObject({ layer: 'unclassified', rule: 'no_decision' });
    expect(classifyMiss(miss, undefined)).toBe('unclassified');
    expect(classifyMiss(miss, { result: read('completion', 'result.json') })).toBe('completion');
  });
});

describe('caseFileIndex', () => {
  it('lists the visible case files and the attachments named inside emails', () => {
    expect(caseFileIndex(CASE)).toEqual({ caseFiles: ['inputs/email_quote.eml', 'inputs/landlord_note.txt'], embeddedFiles: ['quote_QH-5521.pdf'] });
    expect(caseFileIndex('src/eval/fixtures/taxonomy/nope')).toEqual({ caseFiles: [], embeddedFiles: [] });
  });
});

describe('summarizeTaxonomy', () => {
  it('counts misses per layer and per case, with the rules that fired', () => {
    const items = ['guard', 'completion', 'brief', 'skill', 'ingest'].flatMap((run) => {
      const grades = read(run, 'grades.json');
      return classifyRun({ key: `fixture/${run}`, run: 1, caseDir: CASE, result: read(run, 'result.json'), grades, checks: grades.checks });
    });
    const t = summarizeTaxonomy(items, 5);
    expect(t.misses).toBe(items.length);
    expect(t.byLayer).toMatchObject({ guard: 5, completion: 4, brief: 1, skill: 2, ingest: 2, model_judgement: 3, unclassified: 1, critic: 0, render: 0 });
    expect(t.layers.find((l) => l.layer === 'guard')).toMatchObject({ misses: 5, cases: 2, rules: { blocked_needed_action: 1, prohibited_action_executed: 2, prohibited_tool_ran: 1, tool_failure_unrecovered: 1 } });
    expect(layerTable(t).map((r) => r.layer)).toEqual(['ingest', 'brief', 'skill', 'guard', 'completion', 'model_judgement', 'unclassified']);
  });
});
