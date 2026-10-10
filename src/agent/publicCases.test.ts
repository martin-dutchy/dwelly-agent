import { describe, expect, it } from 'vitest';
import { loadCase } from './cases.js';

const PM = 'HackatonPublicCases/Property Management/003';
const DL = 'HackatonPublicCases/Delivery & Logistics/021';
const visibleText = (c: ReturnType<typeof loadCase>) => [c.brief, ...c.inputs.map((i) => i.content)].join('\n');

describe('public case loader', () => {
  it('cuts the history at the requested event and hides the ending', () => {
    const c = loadCase(PM, '9');
    const text = visibleText(c);
    expect(c.cutoff).toBe(9);
    expect(text).toContain('event 009');
    expect(text).not.toContain('event 010');
    for (const spoiler of ['## Outcome', '## Overview', 'Completed:', 'Status:', 'Paid']) expect(text).not.toContain(spoiler);
    expect(c.reference).toContain('event 010');
    expect(c.reference).toContain('## Outcome');
  });

  it('uses the recorded escalation point when the case has one', () => {
    const c = loadCase(DL);
    expect(c.cutoff).toBe(2);
    expect(visibleText(c)).not.toContain('event 003');
    // Images linked only from later events stay hidden.
    expect(c.inputs.map((i) => i.name)).not.toContain('attachments/carton-overview.png');
  });

  it('extracts PDF attachments as text', () => {
    const pdf = loadCase(PM, '4').inputs.find((i) => i.name.endsWith('checkout-inspection-report.pdf'));
    expect(pdf?.content.length).toBeGreaterThan(100);
    expect(pdf?.content).not.toMatch(/^%PDF/);
  });
});
