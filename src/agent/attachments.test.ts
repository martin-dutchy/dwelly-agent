import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PDF_MIME, pdfBlocksToDocuments, readAttachment } from './attachments.js';

describe('attachments', () => {
  const dir = mkdtempSync(join(tmpdir(), 'att-'));

  it('sends images natively instead of dropping them', () => {
    const p = join(dir, 'leak.png');
    writeFileSync(p, Buffer.from('89504e470d0a1a0a', 'hex'));
    const a = readAttachment(p, 'attachments/leak.png');
    expect(a.media).toMatchObject({ type: 'image', mimeType: 'image/png' });
    expect(a.content).toContain('attached natively');
  });

  it('keeps text files as text', () => {
    const p = join(dir, 'note.md');
    writeFileSync(p, 'hello');
    expect(readAttachment(p, 'note.md')).toEqual({ content: 'hello', method: 'text', bytes: 5 });
  });

  it('rewrites PDF blocks into document blocks for the API', () => {
    const payload = { messages: [{ role: 'user', content: [{ type: 'text', text: 'x' }, { type: 'image', source: { type: 'base64', media_type: PDF_MIME, data: 'QQ==' } }, { type: 'image', source: { type: 'base64', media_type: 'image/png', data: 'QQ==' } }] }] };
    const out = pdfBlocksToDocuments(payload) as typeof payload;
    expect(out.messages[0].content[1]).toEqual({ type: 'document', source: { type: 'base64', media_type: PDF_MIME, data: 'QQ==' } });
    expect(out.messages[0].content[2].type).toBe('image');
  });
});
