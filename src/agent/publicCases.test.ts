import { cpSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { loadCase } from './cases.js';
import { type HistoryEvent, MAX_FILE_CHARS, compactHistory, parseHistory } from './publicCases.js';

const PM = 'HackatonPublicCases/Property Management/003';
const PM_047 = 'HackatonPublicCases/Property Management/047';
const DL = 'HackatonPublicCases/Delivery & Logistics/021';
const visibleText = (c: ReturnType<typeof loadCase>) => [c.brief, ...c.inputs.map((i) => i.content)].join('\n');
const history = (c: ReturnType<typeof loadCase>) => c.inputs.find((i) => i.name === 'history.md')!.content;

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

describe('no re-cut by default outside HackatonPublicCases (AC16)', () => {
  // A Reality Test case arrives already cut at its decision point: every event must stay visible.
  const tmp = mkdtempSync(join(tmpdir(), 'dwelly-reality-'));
  const copy = join(tmp, '047');
  cpSync(PM_047, copy, { recursive: true });
  afterAll(() => rmSync(tmp, { recursive: true, force: true }));

  it('shows every event of a case copied outside HackatonPublicCases/', () => {
    const c = loadCase(copy);
    expect(c.totalEvents).toBe(36);
    expect(c.cutoff).toBe(36);
    const text = visibleText(c);
    expect(text).toContain('event 036');
    expect(history(c)).toContain('Total events: 36');
    expect(c.reference ?? '').toBe('');
    // The summary sections and completion fields would still spoil a public-format case.
    for (const spoiler of ['## Overview', '## Outcome', '**Status:**', '**Updated:**', '**Completed:**']) expect(text).not.toContain(spoiler);
    // Everything else in index.md is shown as it comes.
    expect(c.brief).toContain('## Initial request');
    expect(c.brief).toContain('## Attachments');
  });

  it('keeps the 50 % replay cut for the same case under HackatonPublicCases/', () => {
    const c = loadCase(PM_047);
    expect(c.cutoff).toBe(18);
    expect(visibleText(c)).not.toContain('event 019');
    expect(c.reference).toContain('event 019');
  });

  it('honours an explicit --at none and --at N on either path', () => {
    expect(loadCase(PM_047, 'none').cutoff).toBe(36);
    expect(loadCase(copy, '10').cutoff).toBe(10);
    expect(loadCase(copy, '50%').cutoff).toBe(18);
  });

  it('falls back to the folder default when --at is empty or malformed', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(loadCase(copy, '').cutoff).toBe(36);
    expect(loadCase(copy, 'nome').cutoff).toBe(36);
    expect(loadCase(PM_047, '').cutoff).toBe(18);
    expect(warn).toHaveBeenCalledTimes(3);
    warn.mockRestore();
  });
});

describe('tail-preserving compaction (AC17)', () => {
  const stamp = (i: number) => {
    const d = new Date(Date.UTC(2024, 0, 1 + Math.floor(i / 4), 9 + (i % 4), 15, 0));
    return d.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  };
  const event = (i: number, channel: string, to: string, text: string): HistoryEvent => ({
    n: i,
    header: `${stamp(i)} — event ${String(i).padStart(3, '0')}`,
    body: `- **Channel:** ${channel}\n- **From:** Agency / system\n- **To:** ${to}\n\n${text}`,
  });
  const FINAL = 'Landlord Priya Osei replies: approved, go ahead with quote QT-7731 at £486.20 but only on Thursday after 2pm, and please tell the tenant first.';

  const build = (count: number) => {
    const events: HistoryEvent[] = [];
    for (let i = 1; i <= count; i++) {
      const phase = i % 10;
      if (phase >= 2 && phase <= 4) events.push(event(i, 'Hold', 'Not specified', 'Put on hold by Ruben Langley. Reason: Waiting for Provider. Comment: Held awaiting update from Dawson.'));
      else if (phase === 5 || phase === 7) events.push(event(i, 'Email', 'Contractor', `Dear Oscar Turner,\n\nThis is a friendly reminder that we are awaiting the confirmation that the appointment has been booked with the tenant. ${'Please contact the tenant to arrange the meeting. '.repeat(12)}`));
      else if (phase === 6 || phase === 8) events.push(event(i, 'SMS', 'Contractor', 'Hello, this is Meadow Solutions! Please check your email regarding the property at Flat 24, 150 Copperfield Walk.'));
      else events.push(event(i, 'Email', i % 3 ? 'Tenant' : 'Landlord', `Update number ${i} on the bedroom window. ${'The contractor still has not confirmed a slot and the tenant asks for news. '.repeat(10)}`));
    }
    events.push(event(count + 1, 'Email', 'Agency', FINAL));
    return events;
  };

  it('keeps the first and last events verbatim and collapses repeated holds and reminders', () => {
    const events = build(400);
    const full = `# Case X history\n\nTotal events: ${events.length}\n\n${events.map((e) => `### ${e.header}\n\n${e.body}`).join('\n\n')}`;
    expect(full.length).toBeGreaterThan(190_000);

    const out = compactHistory(`# Case X history\n\nTotal events: ${events.length}`, events);
    expect(out.length).toBeLessThanOrEqual(MAX_FILE_CHARS);
    expect(out).toContain(FINAL);
    expect(out).toContain(`### ${events.at(-1)!.header}`);
    expect(out).toContain(`### ${events[0].header}\n\n${events[0].body}`);
    expect(out).toContain('event 401');
    // Holds, reminder emails and SMS nudges between two real updates collapse into one line with a count and date range.
    expect(out).toContain('- events 002–008 (2024-01-01 to 2024-01-03): 3 × hold, 2 × Email reminder to Contractor, 2 × SMS nudge to Contractor. Hold reasons in order: Waiting for Provider. 7 repeated routine events collapsed');
    expect(out).not.toContain('### 2024-01-01 11:15:00 UTC — event 002');
    expect(out).toContain('Compacted');
    expect(out).not.toContain('[truncated');
  });

  it('leaves a history under the cap untouched', () => {
    const { preamble, events } = parseHistory(`Total events: 2\n\n<a id="event-001"></a>\n## 2024-01-01 09:00:00 UTC — event 001\n\n- **Channel:** Note\n\nFirst.\n\n<a id="event-002"></a>\n## 2024-01-02 09:00:00 UTC — event 002\n\n- **Channel:** Hold\n\nHeld awaiting update.\n`);
    const out = compactHistory(preamble, events);
    expect(out).toContain('### 2024-01-02 09:00:00 UTC — event 002\n\n- **Channel:** Hold\n\nHeld awaiting update.');
    expect(out).not.toContain('Compacted');
  });

  it('keeps system triggers and hold reasons visible through compaction', () => {
    const events = build(400);
    // The "3+ reminders" trigger ends a chase cycle: it must not be folded into a reminder run.
    events[49] = event(50, 'Update', 'Not specified', '3+ reminders have been sent to provider. Please check what’s happening.');
    // A hold whose reason changes mid-run is a state change the agent needs.
    events[51] = event(52, 'Hold', 'Not specified', 'Put on hold by Ruben Langley. Reason: Waiting for Landlord. Comment: Held awaiting update from Dawson.');
    const out = compactHistory('Total events: 401', events);
    expect(out.length).toBeLessThanOrEqual(MAX_FILE_CHARS);
    expect(out).toMatch(/- event 050 \(2024-01-13\) Update · Agency \/ system · Not specified: 3\+ reminders have been sent to provider\. Please check what’s happening\./);
    expect(out).toMatch(/- events 052–058 [^\n]*Hold reasons in order: Waiting for Landlord → Waiting for Provider\./);
  });

  it('does not crash on a single over-cap event and keeps it whole', () => {
    const only = event(1, 'Email', 'Tenant', `START ${'y'.repeat(70_000)} END`);
    const out = compactHistory('Total events: 1', [only]);
    expect(out).toContain(`### ${only.header}\n\n${only.body}`);
    expect(out).not.toContain('elided');
  });

  it('never drops the last event even when the tail alone is over the cap', () => {
    const big = (i: number, text: string) => event(i, 'Email', 'Tenant', `${text} ${'x'.repeat(15_000)}`);
    const events = [big(1, 'first'), big(2, 'second'), big(3, 'third'), big(4, 'fourth'), big(5, 'fifth'), big(6, 'LAST ONE STANDING')];
    const out = compactHistory('Total events: 6', events);
    expect(out.length).toBeLessThanOrEqual(MAX_FILE_CHARS);
    expect(out).toContain('LAST ONE STANDING');
    expect(out).toContain('### ' + events[5].header);
  });

  it('is what loadCase feeds the agent for history.md', () => {
    const c = loadCase(PM_047, 'none');
    expect(history(c)).toContain('### 2024-06-11 19:30:18 UTC — event 036');
    expect(history(c).length).toBeLessThanOrEqual(MAX_FILE_CHARS);
  });
});
