// Minimal RFC 822 / MIME reader for .eml files: headers, multipart, base64 and quoted-printable, HTML to text.

export type EmailAttachment = { filename: string; contentType: string; data: Buffer };
export type Email = {
  headers: Record<string, string>;
  from?: string;
  to?: string;
  cc?: string;
  date?: string;
  subject?: string;
  text: string;
  attachments: EmailAttachment[];
  /** False for a plain 7-bit message whose raw text already reads correctly. */
  encoded: boolean;
};

type Part = { headers: Record<string, string>; body: string };

/** Bytes as a latin1 string, so every byte survives until the charset is known. */
const binary = (raw: Buffer | string) => (typeof raw === 'string' ? Buffer.from(raw, 'utf8') : raw).toString('latin1');

function splitPart(raw: string): Part {
  const m = raw.match(/\r?\n\r?\n/);
  const head = m ? raw.slice(0, m.index) : raw;
  const body = m ? raw.slice(m.index! + m[0].length) : '';
  const headers: Record<string, string> = {};
  for (const line of head.replace(/\r?\n[ \t]+/g, ' ').split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i <= 0) continue;
    const k = line.slice(0, i).trim().toLowerCase();
    headers[k] = headers[k] ? `${headers[k]}, ${line.slice(i + 1).trim()}` : line.slice(i + 1).trim();
  }
  return { headers, body };
}

export function decodeCharset(bytes: Buffer, charset = 'utf-8'): string {
  try {
    return new TextDecoder(charset.toLowerCase().replace(/^"|"$/g, '')).decode(bytes);
  } catch {
    return bytes.toString('utf8');
  }
}

function qpBytes(s: string, header = false): Buffer {
  const t = (header ? s.replace(/_/g, ' ') : s).replace(/=\r?\n/g, '');
  const out: number[] = [];
  for (let i = 0; i < t.length; i++) {
    const hex = t[i] === '=' && t.slice(i + 1, i + 3);
    if (hex && /^[0-9A-Fa-f]{2}$/.test(hex)) {
      out.push(parseInt(hex, 16));
      i += 2;
    } else out.push(t.charCodeAt(i) & 0xff);
  }
  return Buffer.from(out);
}

/** Raw 8-bit bytes are UTF-8 when they decode cleanly, else Latin-1. */
function eightBit(bytes: Buffer): string {
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return bytes.toString('latin1');
  }
}

/** Header value (a latin1 byte string) to text, decoding RFC 2047 words: =?utf-8?B?...?= and =?utf-8?Q?...?=. */
export function decodeWords(s: string): string {
  return eightBit(Buffer.from(s, 'latin1'))
    .replace(/(=\?[^?]+\?[BbQq]\?[^?]*\?=)\s+(?==\?)/g, '$1')
    .replace(/=\?([^?]+)\?([BbQq])\?([^?]*)\?=/g, (_, cs: string, enc: string, data: string) =>
      decodeCharset(enc.toUpperCase() === 'B' ? Buffer.from(data, 'base64') : qpBytes(data, true), cs.split('*')[0]),
    );
}

function params(value = ''): { type: string; params: Record<string, string> } {
  const [type, ...rest] = value.split(';');
  const out: Record<string, string> = {};
  for (const p of rest) {
    const i = p.indexOf('=');
    if (i < 0) continue;
    const k = p.slice(0, i).trim().toLowerCase();
    let v = p.slice(i + 1).trim().replace(/^"(.*)"$/, '$1');
    // RFC 2231: filename*=utf-8''name%20with%20spaces
    if (k.endsWith('*')) {
      const m = v.match(/^([^']*)'[^']*'(.*)$/);
      try {
        v = m ? decodeCharset(Buffer.from(decodeURIComponent(m[2]), 'utf8'), m[1] || 'utf-8') : decodeURIComponent(v);
      } catch {
        // Keep the raw value.
      }
      out[k.slice(0, -1)] = v;
    } else out[k] = decodeWords(v);
  }
  return { type: type.trim().toLowerCase(), params: out };
}

function bodyBytes(p: Part): Buffer {
  const enc = (p.headers['content-transfer-encoding'] ?? '').toLowerCase().trim();
  if (enc === 'base64') return Buffer.from(p.body.replace(/[^A-Za-z0-9+/=]/g, ''), 'base64');
  if (enc === 'quoted-printable') return qpBytes(p.body);
  return Buffer.from(p.body, 'latin1');
}

const ENTITIES: Record<string, string> = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", pound: '£', euro: '€', hellip: '…', ndash: '–', mdash: '—', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', copy: '©' };

export function htmlToText(html: string): string {
  return html
    .replace(/<(script|style|head|title)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<li\b[^>]*>/gi, '\n- ')
    .replace(/<\/?(p|div|h[1-6]|tr|table|ul|ol|blockquote)\b[^>]*>/gi, '\n')
    .replace(/<(td|th)\b[^>]*>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) =>
      e[0] === '#' ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : Number(e.slice(1))) : (ENTITIES[e.toLowerCase()] ?? m),
    )
    .replace(/[ \t\u00a0]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

type Collected = { plain: string[]; html: string[]; attachments: EmailAttachment[] };

function walkPart(p: Part, out: Collected, depth = 0) {
  const ct = params(p.headers['content-type'] ?? 'text/plain');
  const disp = params(p.headers['content-disposition']);
  const filename = disp.params.filename ?? ct.params.name;
  if (ct.type.startsWith('multipart/') && ct.params.boundary && depth < 10) {
    const b = `--${ct.params.boundary}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const all = p.body.split(new RegExp(`^${b}(?:--)?[ \\t]*\\r?$`, 'm'));
    // Without a closing boundary the last part is real content, not an epilogue.
    const sections = new RegExp(`^${b}--`, 'm').test(p.body) ? all.slice(1, -1) : all.slice(1);
    const kids = sections.map((s) => splitPart(s.replace(/^\r?\n/, '')));
    if (ct.type === 'multipart/alternative') {
      const pick = kids.find((k) => params(k.headers['content-type']).type === 'text/plain') ?? kids.at(-1);
      if (pick) walkPart(pick, out, depth + 1);
      return;
    }
    for (const k of kids) walkPart(k, out, depth + 1);
    return;
  }
  const isText = ct.type === 'text/plain' || ct.type === 'text/html' || ct.type === '';
  if (filename || disp.type === 'attachment' || !isText) {
    const ext = ct.type === 'message/rfc822' ? '.eml' : '';
    out.attachments.push({ filename: filename ?? `attachment-${out.attachments.length + 1}${ext}`, contentType: ct.type || 'application/octet-stream', data: bodyBytes(p) });
    return;
  }
  const text = decodeCharset(bodyBytes(p), ct.params.charset);
  (ct.type === 'text/html' ? out.html : out.plain).push(ct.type === 'text/html' ? htmlToText(text) : text.replace(/\r\n/g, '\n'));
}

export function parseEml(raw: Buffer | string): Email {
  const top = splitPart(binary(raw));
  const out: Collected = { plain: [], html: [], attachments: [] };
  walkPart(top, out);
  const h = (k: string) => (top.headers[k] !== undefined ? decodeWords(top.headers[k]) : undefined);
  const enc = (top.headers['content-transfer-encoding'] ?? '').toLowerCase();
  const encoded =
    /multipart|html/i.test(top.headers['content-type'] ?? '') || /base64|quoted-printable/.test(enc) || /=\?[^?]+\?[BbQq]\?/.test(Object.values(top.headers).join(' ')) || out.attachments.length > 0;
  return {
    headers: Object.fromEntries(Object.entries(top.headers).map(([k, v]) => [k, decodeWords(v)])),
    from: h('from'),
    to: h('to'),
    cc: h('cc'),
    date: h('date'),
    subject: h('subject'),
    text: (out.plain.length ? out.plain : out.html).join('\n\n').trim(),
    attachments: out.attachments,
    encoded,
  };
}

/** "Kieran Doyle <office@x.example>" → { name, address }. */
export function mailbox(s: string): { name?: string; address?: string } {
  const m = s.match(/^\s*"?([^"<]*?)"?\s*<([^>]+)>/);
  if (m) return { name: m[1].trim() || undefined, address: m[2].trim() };
  const a = s.match(/[\w.+-]+@[\w.-]+/)?.[0];
  return a ? { address: a } : { name: s.trim() || undefined };
}
