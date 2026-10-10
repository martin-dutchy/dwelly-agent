// Practice cases 91-100 (harness v2 coverage): every one is gradeable, loads, and hides its grading files.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadCase } from '../agent/cases.js';
import { normaliseFailurePlan } from '../core/failures.js';
import { loadChecks } from './checks.js';
import { SECTIONS } from './rubric.js';
import { caseFileIndex } from './taxonomy.js';

const IDS = ['91', '92', '93', '94', '95', '96', '97', '98', '99', '100'];
const dir = (id: string) => join('cases/practice', id);
/** Generic format: no case brief, every input at the folder root. */
const GENERIC = '99';

describe.each(IDS)('practice %s', (id) => {
  it('has a rubric with every section, a valid checks.json with a deterministic check, and a tool failure plan', () => {
    const rubric = JSON.parse(readFileSync(join(dir(id), 'rubric.json'), 'utf8'));
    for (const [key] of SECTIONS) expect(Array.isArray(rubric[key]), `${id} rubric.${key}`).toBe(true);
    expect(rubric.required_outcomes.length).toBeGreaterThan(0);
    const checks = loadChecks(dir(id));
    expect(checks?.checks.length).toBeGreaterThan(0);
    expect(checks?.expect?.escalate).toBeDefined();
    expect(() => normaliseFailurePlan(JSON.parse(readFileSync(join(dir(id), 'tool_failures.json'), 'utf8')))).not.toThrow();
  });
  it('loads without showing the agent its grading files', () => {
    const c = loadCase(dir(id));
    expect(c.inputs.length).toBeGreaterThan(0);
    expect(c.inputs.map((i) => i.name).filter((n) => /rubric|checks|tool_failures/.test(n))).toEqual([]);
    expect(c.withheld?.map((w) => w.name).sort()).toEqual(['checks.json', 'rubric.json', 'tool_failures.json']);
    expect(existsSync(join(dir(id), 'case.md'))).toBe(id !== GENERIC);
  });
});

describe('format coverage', () => {
  it('the generic case has no brief and no inputs/ folder', () => {
    const c = loadCase(dir(GENERIC));
    expect(c.brief).toBe('(no case brief provided)');
    expect(c.inputs.every((i) => !i.name.includes('/'))).toBe(true);
  });
  it('case 100 carries its quote only as a base64 PDF inside a MIME email', () => {
    const eml = readFileSync(join(dir('100'), 'inputs/email_quote.eml'), 'utf8');
    const b64 = eml.split('Content-Transfer-Encoding: base64')[1].split('------=_Part_5521_KHW--')[0].replace(/\s/g, '');
    const pdf = Buffer.from(b64, 'base64').toString('latin1');
    expect(pdf.startsWith('%PDF-1.4')).toBe(true);
    expect(pdf).toContain('TOTAL INCLUDING VAT');
    expect(pdf.trimEnd().endsWith('%%EOF')).toBe(true);
    expect(eml).not.toContain('522');
    expect(caseFileIndex(dir('100')).embeddedFiles).toEqual(['quote_KHW-Q-5521.pdf']);
  });
});
