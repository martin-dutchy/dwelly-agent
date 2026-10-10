import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { casePrompt, loadCase } from '../agent/cases.js';
import type { HistoryEvent } from '../agent/publicCases.js';
import { isTrigger, nextActionSection, walkSteps } from './walk.js';

const ev = (n: number, from: string, to: string, text: string, channel = 'Email'): HistoryEvent => ({
  n,
  header: `2025-01-0${n} — event ${String(n).padStart(3, '0')}`,
  body: `- **Channel:** ${channel}\n- **From:** ${from}\n- **To:** ${to}\n\n${text}`,
});

describe('walkSteps', () => {
  const events = [
    ev(1, 'Agency / system', 'Not specified', 'Request description: the oven is broken', 'Note'),
    ev(2, 'Agency / system', 'Not specified', 'Please complete landlord approval step first', 'Update'),
    ev(3, 'Northbridge Lettings', 'Landlord', 'Can we send a contractor?'),
    ev(4, 'Agency / system', 'Not specified', 'Please check if we need to provide a response to landlord.', 'Update'),
    ev(5, 'Landlord', 'Agency / system', 'Yes go ahead'),
    ev(6, 'Agency / system', 'Contractor', 'New oven repair request'),
    ev(7, 'Contractor', 'Tenant', 'Calls the tenant to arrange a visit', 'Call'),
    ev(8, 'Agency / system', 'Not specified', 'Visit date selected - 30/08/2025', 'Update'),
    ev(9, 'Agency / system', 'Not specified', 'Request marked as completed, lets do the final checks', 'Update'),
  ];
  it('cuts after each run of triggers, before the agency responds, and never after the last event', () => {
    expect(walkSteps(events)).toEqual([2, 5, 7]);
  });
  it('treats inbound party messages and system prompts as triggers, agency actions and status updates as not', () => {
    expect(events.map(isTrigger)).toEqual([true, true, false, true, true, false, true, false, true]);
  });
  it('names recipient and channel only when the next event is the agency writing to a party', () => {
    expect(nextActionSection(events[2])).toContain('- **Recipient:** Landlord');
    expect(nextActionSection(events[7])).not.toContain('Recipient');
    expect(nextActionSection(events[7])).toContain('[History event 008]');
  });
});

const ROOT = 'cases/walks';
const HOLDOUT = ['031', '036', '041', '045', '048', '050'];
const dirs = existsSync(ROOT) ? readdirSync(ROOT).map((f) => join(ROOT, f)).filter((p) => statSync(p).isDirectory()) : [];

describe.each(dirs)('%s', (dir) => {
  const expected = JSON.parse(readFileSync(join(dir, 'expected.json'), 'utf8'));
  it('is not derived from a holdout case', () => {
    expect(HOLDOUT).not.toContain(expected.walk);
  });
  it('shows the agent events up to the cut only, by default, and gives the judge what came next', () => {
    const c = loadCase(dir);
    expect(c.cutoff).toBe(expected.cut_after);
    const prompt = casePrompt(c);
    expect(prompt).toContain(`event ${String(expected.cut_after).padStart(3, '0')}`);
    expect(prompt).not.toContain(`event ${String(expected.cut_after + 1).padStart(3, '0')}`);
    expect(prompt).not.toContain('## Overview');
    expect(prompt).not.toContain('## Outcome');
    expect(c.reference).toContain(`event ${String(expected.cut_after + 1).padStart(3, '0')}`);
  });
  it('overrides the recorded step only with a complete rubric and a note saying why', () => {
    if (!existsSync(join(dir, 'rubric.json'))) return;
    const rubric = JSON.parse(readFileSync(join(dir, 'rubric.json'), 'utf8'));
    expect(rubric.required_outcomes.length).toBeGreaterThan(0);
    expect(rubric.critical_failures.length).toBeGreaterThan(0);
    expect(expected.notes).toMatch(/not the oracle/);
  });
});
