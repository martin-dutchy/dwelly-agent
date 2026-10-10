import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { casePrompt, loadCase } from '../agent/cases.js';
import { TOOL_NAMES, loadChecks } from './checks.js';

const ROOT = 'cases/public-cuts';
const HOLDOUT = ['031', '036', '041', '045', '048', '050'];
const RUBRIC_KEYS = ['required_outcomes', 'acceptable_alternatives', 'positive_behaviours', 'red_flags', 'prohibited_actions', 'critical_failures'];
const CLASSES = ['ACT', 'ASK', 'WAIT', 'CHASE', 'RESUME', 'CLOSE_WITH_PAYMENT', 'CLOSE_WITHOUT_PAYMENT', 'SPLIT', 'ESCALATE'];
const dirs = existsSync(ROOT) ? readdirSync(ROOT).map((f) => join(ROOT, f)).filter((p) => statSync(p).isDirectory()) : [];

describe('public-cuts exemplar', () => {
  it('cuts 047-wrong-address after the landlord reply and hides the ending', () => {
    const c = loadCase(join(ROOT, '047-wrong-address'), 'auto');
    expect(c.cutoff).toBe(10);
    expect(c.totalEvents).toBe(36);
    const prompt = casePrompt(c);
    expect(prompt).toContain('88 Alder Lane'); // the landlord's reply is the last visible event
    expect(prompt).not.toContain('event 011');
    expect(prompt).not.toContain('## Overview');
    expect(prompt).not.toContain('completed without payment');
    expect(c.reference).toContain('event 011');
  });
});

describe.each(dirs)('%s', (dir) => {
  const expected = JSON.parse(readFileSync(join(dir, 'expected.json'), 'utf8'));
  const rubric = JSON.parse(readFileSync(join(dir, 'rubric.json'), 'utf8'));
  const index = readFileSync(join(dir, 'index.md'), 'utf8');

  it('is not derived from a holdout case', () => {
    expect(HOLDOUT).not.toContain(String(expected.source).replace('PM/', ''));
  });
  it('carries the Recorded action marker and the loader cuts at expected.cut_after', () => {
    expect(index).toMatch(/## Next action at escalation\n\n- \*\*Recorded action:\*\* \[History event \d{3}\]/);
    const c = loadCase(dir, 'auto');
    expect(c.cutoff).toBe(expected.cut_after);
    // The default mode must replay too: cases/public-cuts is a replay corpus, not a Reality Test folder.
    expect(loadCase(dir).cutoff).toBe(expected.cut_after);
    expect(c.cutoff).toBeLessThanOrEqual(c.totalEvents!);
    // A mutation ends at the mutated event; a real cut may also sit at the end of the record (rubric-only oracle).
    if (expected.truncated) expect(c.cutoff).toBe(c.totalEvents);
    expect(casePrompt(c)).not.toContain('## Overview');
  });
  it('has a complete rubric and expected.json', () => {
    for (const k of RUBRIC_KEYS) expect(Array.isArray(rubric[k]), k).toBe(true);
    expect(rubric.required_outcomes.length).toBeGreaterThan(0);
    expect(rubric.critical_failures.length).toBeGreaterThan(0);
    expect(['yes', 'no', 'either']).toContain(expected.escalate);
    expect(expected.outcome_class.length).toBeGreaterThan(0);
    for (const o of expected.outcome_class) expect(CLASSES).toContain(o);
  });
  it('every checks.json loads and names only tools in the toolset', () => {
    // loadChecks validates kinds, severities, parties and tool names against the ops toolset, and throws otherwise.
    const spec = loadChecks(dir);
    for (const c of spec?.checks ?? []) if ('tool' in c) expect(TOOL_NAMES).toContain(c.tool);
  });
  it('contains no text addressed to a judge or grader', () => {
    const checks = existsSync(join(dir, 'checks.json')) ? readFileSync(join(dir, 'checks.json'), 'utf8') : '';
    const all = [index, readFileSync(join(dir, 'history.md'), 'utf8'), JSON.stringify(rubric), JSON.stringify(expected), checks].join('\n');
    expect(all).not.toMatch(/\b(dear|note to|hello|hi)\b[^.\n]{0,30}\b(judge|grader|evaluator)\b/i);
  });
});

const PRACTICE = 'cases/practice';
const splits = JSON.parse(readFileSync('cases/splits.json', 'utf8')) as Record<string, { dir: string; only: string[] }[]>;
const practiceHoldout = splits.holdout.filter((g) => g.dir === PRACTICE).flatMap((g) => g.only);
// Holdout case folders are never modified, so they carry no checks.json.
const practiceDirs = existsSync(PRACTICE)
  ? readdirSync(PRACTICE).filter((f) => !practiceHoldout.includes(f)).map((f) => join(PRACTICE, f)).filter((p) => statSync(p).isDirectory())
  : [];

describe('practice checks', () => {
  it.each(practiceDirs)('%s has a valid checks.json with an escalation label', (dir) => {
    const spec = loadChecks(dir);
    expect(['yes', 'no', 'either']).toContain(spec?.expect?.escalate);
    for (const c of spec?.checks ?? []) if ('tool' in c) expect(TOOL_NAMES).toContain(c.tool);
  });
  it('labels enough positives and negatives for escalation precision and recall', () => {
    const labels = practiceDirs.map((d) => loadChecks(d)?.expect?.escalate);
    expect(labels.filter((l) => l === 'yes').length).toBeGreaterThanOrEqual(4);
    expect(labels.filter((l) => l === 'no').length).toBeGreaterThanOrEqual(4);
  });
});
