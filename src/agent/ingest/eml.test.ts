import { describe, expect, it } from 'vitest';
import { decodeWords, htmlToText, mailbox, parseEml } from './eml.js';

const crlf = (lines: string[]) => lines.join('\r\n');

describe('parseEml', () => {
  it('reads a plain message as not encoded, with its headers', () => {
    const e = parseEml('From: Kieran Doyle <office@cbf.example>\nTo: lettings@mare.example\nDate: Sat, 10 Oct 2026 11:02:40 +0100\nSubject: RE: Job R-4815\n\nHi team,\nQuote £640.\n');
    expect(e).toMatchObject({ from: 'Kieran Doyle <office@cbf.example>', to: 'lettings@mare.example', subject: 'RE: Job R-4815', encoded: false, attachments: [] });
    expect(e.text).toBe('Hi team,\nQuote £640.');
  });

  it('decodes quoted-printable bodies in their charset, joining soft line breaks', () => {
    const e = parseEml(crlf(['Subject: x', 'Content-Type: text/plain; charset=iso-8859-1', 'Content-Transfer-Encoding: quoted-printable', '', 'Total =A3180 inc VAT, can do Tues=', 'day.']));
    expect(e.encoded).toBe(true);
    expect(e.text).toBe('Total £180 inc VAT, can do Tuesday.');
  });

  it('decodes a base64 body', () => {
    const e = parseEml(crlf(['Content-Type: text/plain; charset=utf-8', 'Content-Transfer-Encoding: base64', '', Buffer.from('Boiler fixed – invoice to follow £95').toString('base64')]));
    expect(e.text).toBe('Boiler fixed – invoice to follow £95');
  });

  it('strips HTML to text when there is no plain part', () => {
    const e = parseEml(crlf(['Content-Type: text/html; charset=utf-8', '', '<html><head><style>p{}</style></head><body><p>Hi&nbsp;team,</p><ul><li>Leak &amp; damp</li><li>&pound;250 &#8211; ok</li></ul><script>x()</script></body></html>']));
    expect(e.text).toBe('Hi team,\n\n- Leak & damp\n- £250 – ok');
  });

  it('prefers the plain part of multipart/alternative and lists attachments', () => {
    const pdf = Buffer.from('%PDF-1.4 fake');
    const e = parseEml(
      crlf([
        'From: =?UTF-8?B?Sm9zw6kgTcO8bGxlcg==?= <jose@x.example>',
        'Subject: =?UTF-8?Q?Quote_=E2=80=93?= =?UTF-8?Q?_Flat_2?=',
        'Content-Type: multipart/mixed; boundary="b1"',
        '',
        'preamble',
        '--b1',
        'Content-Type: multipart/alternative; boundary=b2',
        '',
        '--b2',
        'Content-Type: text/plain',
        '',
        'plain body',
        '--b2',
        'Content-Type: text/html',
        '',
        '<p>html body</p>',
        '--b2--',
        '--b1',
        'Content-Type: application/pdf; name="q.pdf"',
        'Content-Transfer-Encoding: base64',
        '',
        pdf.toString('base64'),
        '--b1',
        "Content-Disposition: attachment; filename*=utf-8''site%20photo.png",
        'Content-Type: image/png',
        'Content-Transfer-Encoding: base64',
        '',
        'iVBORw0KGgo=',
        '--b1',
        'Content-Type: message/rfc822',
        '',
        'Subject: forwarded',
        '',
        'old mail',
      ]),
    );
    expect(e.from).toBe('José Müller <jose@x.example>');
    expect(e.subject).toBe('Quote – Flat 2');
    expect(e.text).toBe('plain body');
    expect(e.attachments.map((a) => [a.filename, a.contentType])).toEqual([
      ['q.pdf', 'application/pdf'],
      ['site photo.png', 'image/png'],
      ['attachment-3.eml', 'message/rfc822'],
    ]);
    expect(e.attachments[0].data.equals(pdf)).toBe(true);
    expect(e.encoded).toBe(true);
  });
});

describe('header helpers', () => {
  it('decodes encoded words and raw UTF-8 headers', () => {
    expect(decodeWords('=?iso-8859-1?Q?=A3200_quote?=')).toBe('£200 quote');
    expect(decodeWords(Buffer.from('Café repair', 'utf8').toString('latin1'))).toBe('Café repair');
  });

  it('splits mailboxes', () => {
    expect(mailbox('"Doyle, Kieran" <k@x.example>')).toEqual({ name: 'Doyle, Kieran', address: 'k@x.example' });
    expect(mailbox('k@x.example')).toEqual({ address: 'k@x.example' });
    expect(mailbox('Amelia Clarke')).toEqual({ name: 'Amelia Clarke' });
  });

  it('turns numeric entities and line breaks into text', () => {
    expect(htmlToText('a<br>b&#x2019;s<div>c</div>')).toBe('a\nb’s\nc');
  });
});
