// Proves the 16:30 format fallback: a folder of loose files per case converts into organiser format that
// src/agent/cases.ts loads with every event visible at --at 100%.
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { loadCase } from '../../../../src/agent/cases.js';
import { parseHistory } from '../../../../src/agent/publicCases.js';
import { caseDirs, convertCase, convertFile, findDate, probe, segment, writeCase } from './convert-to-organiser.js';

const SCRIPT = '.claude/skills/reality-test-run/scripts/convert-to-organiser.ts';
let root: string;
let inRoot: string;
let outRoot: string;

const write = (p: string, s: string | Buffer) => {
  mkdirSync(join(p, '..'), { recursive: true });
  writeFileSync(p, s);
};

beforeAll(() => {
  root = mkdtempSync(join(tmpdir(), 'dwelly-convert-'));
  inRoot = join(root, 'release');
  outRoot = join(root, 'organiser');
  const a = join(inRoot, 'case-A');
  write(join(a, 'brief.md'), '# Case A: Leaking kitchen tap\n\nHandle the tenant report below.\n\n## Questions\n\n1. What next?\n');
  write(
    join(a, 'thread.eml'),
    [
      'From: tenant@example.test',
      'To: office@agency.test',
      'Date: Tue, 6 Oct 2026 09:12:00 +0000',
      'Subject: Kitchen tap leaking',
      '',
      'The kitchen tap has been dripping since yesterday.',
      '',
      'From: office@agency.test',
      'To: landlord@example.test',
      'Date: Wed, 7 Oct 2026 10:00:00 +0000',
      'Subject: RE: Kitchen tap leaking',
      '',
      'Quote attached for your approval.',
      '',
    ].join('\n'),
  );
  write(join(a, 'sms.txt'), '2026-10-08 09:15 Tenant: still leaking, any news?\n');
  write(join(a, 'crm.json'), JSON.stringify({ property: 'Flat 2, 10 Test Street', landlord: 'A. Landlord' }, null, 2));
  write(
    join(a, 'messages.json'),
    JSON.stringify([
      { timestamp: '2026-10-05T18:30:00Z', from: 'Tenant', to: 'Agency', channel: 'WhatsApp', text: 'Hi, small drip under the sink.' },
      { timestamp: '2026-10-09T08:00:00Z', from: 'Contractor', to: 'Agency', text: 'Can attend Friday.' },
    ]),
  );
  write(join(a, 'photo.png'), Buffer.from('89504e470d0a1a0a0000000d49484452', 'hex'));
  write(join(a, 'attachments', 'report.txt'), 'Inspection report: tap washer worn.\n');
  const b = join(inRoot, 'case-B');
  write(join(b, 'notes.md'), '# Notes\n\n## 2026-10-01 call with landlord\n\nAgreed to get a quote.\n\n## 2026-10-02 note\n\nQuote requested.\n');
  write(join(b, 'invoice.docx'), 'PK not really a docx');
});

afterAll(() => rmSync(root, { recursive: true, force: true }));

describe('convert-to-organiser', () => {
  it('finds dates in headers, ISO text and UK format, and never invents one', () => {
    expect(findDate('Date: Tue, 6 Oct 2026 09:12:00 +0000')?.toISOString()).toBe('2026-10-06T09:12:00.000Z');
    expect(findDate('sent 2026-10-08 09:15 by tenant')?.toISOString()).toBe('2026-10-08T09:15:00.000Z');
    expect(findDate('call on 07/10/2026')?.toISOString()).toBe('2026-10-07T00:00:00.000Z');
    expect(findDate('no date here')).toBeUndefined();
  });

  it('splits thread dumps on From: blocks and notes on headings', () => {
    expect(segment('From: a\n\nhello\n\nFrom: b\n\nworld')).toHaveLength(2);
    expect(segment('# Title\n\n## one\n\nx\n\n## two\n\ny')).toHaveLength(2);
    expect(segment('single note')).toHaveLength(1);
  });

  it('turns a folder of loose files into ordered events and attachments', () => {
    const c = convertCase(join(inRoot, 'case-A'));
    expect(c.title).toBe('Leaking kitchen tap');
    expect(c.brief).toContain('Handle the tenant report');
    // 2 emails + 1 sms + 1 crm note + 2 json messages = 6 events, sorted by date.
    expect(c.events.map((e) => e.date)).toEqual([
      undefined, // crm.json carries no date and sorts first by file name: it stays first as context
      '2026-10-05 18:30:00 UTC',
      '2026-10-06 09:12:00 UTC',
      '2026-10-07 10:00:00 UTC',
      '2026-10-08 09:15:00 UTC',
      '2026-10-09 08:00:00 UTC',
    ]);
    expect(c.events.map((e) => e.channel)).toEqual(['Note', 'WhatsApp', 'Email', 'Email', 'SMS', 'Note']);
    expect(c.events[0].body).toContain('"property": "Flat 2, 10 Test Street"');
    expect(c.events[2].from).toBe('tenant@example.test');
    expect(c.events[2].body).toContain('Subject: Kitchen tap leaking');
    expect(c.events[2].body).not.toMatch(/^To:/m);
    expect(c.attachments.map((a) => a.name).sort()).toEqual(['photo.png', 'report.txt']);
  });

  it('writes index.md + history.md that the real loader reads with every event visible', () => {
    mkdirSync(outRoot, { recursive: true });
    for (const d of caseDirs(inRoot)) writeCase(convertCase(d), outRoot);

    const a = loadCase(join(outRoot, 'case-A'), '100%');
    expect(a.totalEvents).toBe(6);
    expect(a.cutoff).toBe(6);
    const text = [a.brief, ...a.inputs.map((i) => i.content)].join('\n');
    for (let n = 1; n <= 6; n++) expect(text).toContain(`event ${String(n).padStart(3, '0')}`);
    expect(text).toContain('Events shown: 6');
    expect(a.brief).toContain('## Brief');
    expect(a.brief).toContain('Handle the tenant report');
    expect(a.brief).toContain('## Initial request');
    expect(a.brief).toContain('Hi, small drip under the sink.');
    expect(a.inputs.map((i) => i.name)).toEqual(expect.arrayContaining(['history.md', 'attachments/photo.png', 'attachments/report.txt']));
    expect(a.media.map((m) => m.name)).toEqual(['attachments/photo.png']);
    expect(text).toContain('tap washer worn');

    // The history round-trips through the organiser parser with contiguous event numbers.
    const { events } = parseHistory(readFileSync(join(outRoot, 'case-A', 'history.md'), 'utf8'));
    expect(events.map((e) => e.n)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(events[0].header).toBe('date unknown — event 001');
    expect(events[1].header).toBe('2026-10-05 18:30:00 UTC — event 002');

    const b = loadCase(join(outRoot, 'case-B'), '100%');
    expect(b.totalEvents).toBe(2);
    expect(b.inputs.map((i) => i.name)).toContain('attachments/invoice.docx');
  });

  it('probe reports every converted case as loadable and recommends --at 100%', async () => {
    const rows = await probe(outRoot);
    expect(rows.map((r) => r.id)).toEqual(['case-A', 'case-B']);
    expect(rows.every((r) => r.ok && r.format === 'organiser' && r.brief && !r.recordedAction)).toBe(true);
    expect(rows[0].visibleAuto).toBeLessThan(rows[0].events); // "auto" would hide half: the runbook passes --at 100%
  });

  it('probe also reads the organiser public examples as-is', async () => {
    const rows = await probe('HackatonPublicCases/Property Management');
    expect(rows.length).toBeGreaterThan(10);
    expect(rows.every((r) => r.ok && r.format === 'organiser')).toBe(true);
  });

  it('--flat treats each file as one case', () => {
    const c = convertFile(join(inRoot, 'case-A', 'thread.eml'));
    expect(c.id).toBe('thread');
    expect(c.events).toHaveLength(2);
    expect(c.title).toBe('Kitchen tap leaking');
  });

  it('CLI: --in/--out --check exits 0 and prints PROBE OK', () => {
    const out = join(root, 'cli-out');
    const stdout = execFileSync('node_modules/.bin/tsx', [SCRIPT, '--in', inRoot, '--out', out, '--check'], { encoding: 'utf8' });
    expect(stdout).toContain('Wrote 2 case(s)');
    expect(stdout).toContain('PROBE OK: 2/2');
    expect(stdout).toContain('--at 100%');
    const dry = execFileSync('node_modules/.bin/tsx', [SCRIPT, '--in', inRoot, '--dry-run'], { encoding: 'utf8' });
    expect(dry).toContain('case-A: "Leaking kitchen tap" · 6 events');
    expect(dry).toContain('002 2026-10-05 18:30:00 UTC · WhatsApp · Tenant → Agency · messages.json#1');
  });
});
