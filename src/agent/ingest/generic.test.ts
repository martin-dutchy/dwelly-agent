import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { casePrompt } from '../cases.js';
import { ingest, toLoadedCase } from './index.js';

const FIXTURE = 'src/agent/ingest/fixtures/generic-case';

describe('generic folders (B5)', () => {
  const b = ingest(FIXTURE);

  it('becomes format generic with a brief built from the file list and the first readable document', () => {
    expect(b.format).toBe('generic');
    expect(b.brief).toMatch(/^# Case generic-case/);
    for (const f of ['email_contractor.eml', 'email_contractor.eml#QT-5521.pdf', 'inventory_2025.docx', 'landlord_notes.txt', 'whatsapp.txt']) expect(b.brief).toContain(`\`${f}\``);
    expect(b.brief).toContain('## Opening of `landlord_notes.txt`');
    expect(b.questions).toHaveLength(3);
    expect(b.now).toBe('2026-10-09T17:05');
  });

  it('decodes the MIME email and passes its PDF attachment through readAttachment (B2)', () => {
    const mail = b.documents.find((d) => d.path === 'email_contractor.eml')!;
    expect(mail.parse?.method).toBe('mime');
    expect(mail.text).toContain('Subject: Quote for sink leak – Flat 2, 41 Quayside Rd');
    expect(mail.text).toContain('Quote attached: £180 inc VAT. I can do Tuesday morning if approved by Monday.');
    expect(mail.text).not.toContain('Content-Transfer-Encoding');
    const pdf = b.documents.find((d) => d.path === 'email_contractor.eml#QT-5521.pdf')!;
    expect(['pdftotext', 'native-pdf']).toContain(pdf.parse?.method);
    expect(b.manifest.find((m) => m.path === pdf.path)).toMatchObject({ kind: 'pdf', included: true, note: 'attachment of email_contractor.eml' });
    if (pdf.parse?.method === 'native-pdf') expect(b.media.map((m) => m.name)).toEqual([pdf.path]);
  });

  it('has a timeline across documents and parties with sources', () => {
    expect(new Set(b.events.map((e) => e.doc))).toEqual(new Set(['doc:whatsapp.txt', 'doc:email_contractor.eml']));
    expect(b.events.map((e) => e.at)).toEqual([...b.events.map((e) => e.at)].sort());
    expect(b.parties.find((p) => p.role === 'landlord')).toMatchObject({ name: 'Peter Osei', sources: ['doc:landlord_notes.txt'] });
    expect(b.parties.find((p) => p.role === 'agency')!.contacts).toContain('repairs@harbourlettings.example');
  });

  it('gives the agent a prompt with no unreadable bytes', () => {
    const prompt = casePrompt(toLoadedCase(b));
    expect(prompt).not.toMatch(/[\u0000\ufffd]/);
    expect(prompt).toContain('inventory_2025.docx: binary .docx file');
  });

  describe('a folder with nothing dated', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ingest-generic-'));
    afterAll(() => rmSync(dir, { recursive: true, force: true }));
    writeFileSync(join(dir, 'request.txt'), 'The bathroom fan is broken. Please fix.');

    it('has no now and does not invent a Today line', () => {
      const g = ingest(dir);
      expect(g.format).toBe('generic');
      expect(g.now).toBeUndefined();
      expect(g.brief).not.toContain('**Today:**');
      expect(g.brief).toContain('The bathroom fan is broken.');
    });
  });
});
