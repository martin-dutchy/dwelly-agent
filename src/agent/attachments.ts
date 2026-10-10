import type { ImageContent } from '@earendil-works/pi-ai';
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
import { extname } from 'node:path';

/**
 * Turns a case file into what the model should see. Text stays text. Images, and PDFs that
 * have no usable text layer (scans, photos saved as PDF), go to Claude natively so it can
 * read them itself instead of us dropping them.
 */

const IMAGE_TYPES: Record<string, string> = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp' };
export const PDF_MIME = 'application/pdf';
// API limits: 5 MB per image, 32 MB per request. Keep PDFs well under the request cap.
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_PDF_BYTES = 20 * 1024 * 1024;
// A text layer shorter than this is treated as a scan.
const MIN_PDF_TEXT = 200;

/** How a file was turned into model input, recorded so a reader can audit the parsing. */
export type ParseMethod = 'text' | 'pdftotext' | 'native-image' | 'native-pdf' | 'too-large';
export type Attachment = { content: string; media?: ImageContent; method: ParseMethod; bytes: number };

export const isBinaryAttachment = (path: string) => extname(path).toLowerCase() in IMAGE_TYPES || extname(path).toLowerCase() === '.pdf';

function pdfText(path: string): string | undefined {
  try {
    return execFileSync('pdftotext', ['-layout', path, '-'], { encoding: 'utf8', maxBuffer: 10_000_000 });
  } catch {
    return undefined;
  }
}

/** `name` is how the file is referred to in the prompt, so the model can match text to the attached media. */
export function readAttachment(path: string, name: string): Attachment {
  const ext = extname(path).toLowerCase();
  const bytes = statSync(path).size;
  const native = (mimeType: string, limit: number, note: string): Attachment =>
    bytes > limit
      ? { content: `[${note}: too large to attach (${(bytes / 1e6).toFixed(1)} MB)]`, method: 'too-large', bytes }
      : {
          content: `[${note}: attached natively as "${name}", read it directly]`,
          media: { type: 'image', mimeType, data: readFileSync(path).toString('base64') },
          method: mimeType === PDF_MIME ? 'native-pdf' : 'native-image',
          bytes,
        };

  if (ext in IMAGE_TYPES) return native(IMAGE_TYPES[ext], MAX_IMAGE_BYTES, 'Image');
  if (ext === '.pdf') {
    const text = pdfText(path);
    if (text && text.replace(/\s/g, '').length >= MIN_PDF_TEXT) return { content: text, method: 'pdftotext', bytes };
    return native(PDF_MIME, MAX_PDF_BYTES, text === undefined ? 'PDF (text extraction unavailable)' : 'Scanned PDF (no text layer)');
  }
  return { content: readFileSync(path, 'utf8'), method: 'text', bytes };
}

/**
 * pi-ai only knows image blocks, and sends a PDF as an image with media_type application/pdf,
 * which the API rejects. Rewrite those blocks into Anthropic document blocks.
 */
export function pdfBlocksToDocuments(payload: unknown): unknown {
  const p = payload as { messages?: { content?: unknown }[] };
  for (const m of p?.messages ?? []) {
    if (!Array.isArray(m.content)) continue;
    m.content = m.content.map((b: any) =>
      b?.type === 'image' && b.source?.media_type === PDF_MIME ? { type: 'document', source: { type: 'base64', media_type: PDF_MIME, data: b.source.data } } : b,
    );
  }
  return payload;
}
