import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { casePrompt } from '../cases.js';
import { ingest, toLoadedCase } from './index.js';
import { asText, unreadable } from './sniff.js';

const root = mkdtempSync(join(tmpdir(), 'ingest-unknown-'));
afterAll(() => rmSync(root, { recursive: true, force: true }));

const noise = (n: number) => Buffer.from(Array.from({ length: n }, (_, i) => (i * 131 + 7) % 256));
const zip = () => Buffer.concat([Buffer.from('PK\x03\x04', 'latin1'), noise(400)]);

function write(dir: string, files: Record<string, string | Buffer>) {
  for (const [name, body] of Object.entries(files)) {
    mkdirSync(join(dir, name, '..'), { recursive: true });
    writeFileSync(join(dir, name), body);
  }
  return dir;
}

describe('sniffing', () => {
  it('accepts UTF-8 and BOM-marked UTF-16 text, rejects binary', () => {
    expect(asText(Buffer.from('Boiler £640 – ok'))).toBe('Boiler £640 – ok');
    expect(asText(Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from('Hi £5', 'utf16le')]))).toBe('Hi £5');
    expect(asText(noise(500))).toBeUndefined();
    expect(unreadable('a.xlsx', Buffer.from('looks like text'))).toBe('binary .xlsx file');
    expect(unreadable('a.txt', Buffer.from('fine'))).toBeUndefined();
  });
});

describe('unknown binaries (B4)', () => {
  const dir = write(join(root, 'practice'), {
    'case.md': '# Case\n\n- **Today:** Saturday 2026-10-10 09:00\n',
    'inputs/inventory.docx': zip(),
    'inputs/costs.xlsx': zip(),
    'inputs/photos.zip': zip(),
    'inputs/export.txt': noise(800),
    'inputs/utf16.txt': Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from('Tenant: Sam Lee, sam@x.example', 'utf16le')]),
    'inputs/notes.txt': 'Plain notes.',
    '.DS_Store': noise(64),
    'tool_failures.json': '{ not json',
  });
  const b = ingest(dir);

  it('flags them as unknown and unparsed, with a placeholder instead of their bytes', () => {
    for (const p of ['inputs/inventory.docx', 'inputs/costs.xlsx', 'inputs/photos.zip', 'inputs/export.txt']) {
      const d = b.documents.find((x) => x.path === p)!;
      expect(d).toMatchObject({ kind: 'unknown', flagged: expect.any(String), parse: { method: 'unparsed' } });
      expect(d.text).toMatch(/could not be read and is not shown/);
      expect(b.manifest.find((m) => m.path === p)).toMatchObject({ kind: 'unknown', parse: 'unparsed', included: false });
    }
    const prompt = casePrompt(toLoadedCase(b));
    expect(prompt).not.toMatch(/[\u0000\ufffd]/);
    expect(prompt).toContain('Plain notes.');
  });

  it('decodes UTF-16 text and skips dotfiles', () => {
    expect(b.documents.find((d) => d.path === 'inputs/utf16.txt')!.text).toBe('Tenant: Sam Lee, sam@x.example');
    expect(b.parties).toContainEqual({ role: 'tenant', name: 'Sam Lee', contacts: ['sam@x.example'], sources: ['doc:inputs/utf16.txt'] });
    expect(b.documents.some((d) => d.path === '.DS_Store')).toBe(false);
    expect(b.manifest.find((m) => m.path === '.DS_Store')).toMatchObject({ included: false, note: 'hidden file' });
  });

  it('survives a malformed tool_failures.json with a manifest note', () => {
    expect(b.failures).toEqual({});
    expect(b.manifest.find((m) => m.path === 'tool_failures.json')!.note).toMatch(/malformed, ignored/);
  });
});

describe('organiser folders with unusual files', () => {
  const dir = write(join(root, 'organiser'), {
    'index.md': '# Case 900: Leak\n\n## Case details\n\n- **Property:** Flat 1, 1 Test Road\n\n## Initial request\n\nLeak.\n',
    'history.md': '# Case 900 history\n\nTotal events: 2\n\n<a id="event-001"></a>\n## 2026-08-07 11:48:38 UTC — event 001\n\n- **Channel:** Email\n- **From:** Tenant\n- **To:** Agency / system\n\nLeak in the kitchen, see attachments/scan.docx.\n\n<a id="event-002"></a>\n## 2026-08-07 12:00:00 UTC — event 002\n\n- **Channel:** Email\n- **From:** Northbridge Lettings\n- **To:** Tenant\n\nThanks, we are on it.\n',
    'attachments/scan.docx': zip(),
    'attachments/quote.eml': 'From: Pat <pat@fixit.example>\nSubject: =?UTF-8?Q?Quote_=C2=A3120?=\nContent-Type: text/plain; charset=utf-8\nContent-Transfer-Encoding: quoted-printable\n\nTotal =C2=A3120.\n',
    'notes.txt': 'Landlord: Robin Hale, robin@x.example',
    'expected.json': '{"cut_after": 2}',
  });
  const b = ingest(dir, { at: 'none' });

  it('flags binaries, decodes email attachments, reads extra files and withholds grading files', () => {
    expect(b.format).toBe('organiser');
    expect(b.documents.find((d) => d.path === 'attachments/scan.docx')).toMatchObject({ kind: 'unknown', flagged: 'binary .docx file' });
    expect(b.documents.find((d) => d.path === 'attachments/quote.eml')!.text).toContain('Subject: Quote £120\n');
    expect(b.documents.find((d) => d.path === 'attachments/quote.eml')!.text).toContain('Total £120.');
    expect(b.documents.find((d) => d.path === 'notes.txt')!.text).toContain('Robin Hale');
    expect(b.documents.some((d) => d.path === 'expected.json')).toBe(false);
    expect(b.withheld.map((w) => w.name)).toContain('expected.json');
    expect(b.parties.find((p) => p.role === 'landlord')).toMatchObject({ name: 'Robin Hale', sources: ['doc:notes.txt'] });
    expect(b.events.map((e) => [e.id, e.channel, e.from, e.to])).toEqual([
      ['ev:1', 'email', 'Tenant', 'Agency / system'],
      ['ev:2', 'email', 'Northbridge Lettings', 'Tenant'],
      ['ev:attachments/quote.eml#1', 'email', 'Pat <pat@fixit.example>', undefined],
    ]);
    expect(b.now).toBe('2026-08-07T12:00:00Z');
  });
});
