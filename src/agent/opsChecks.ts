/**
 * Pure checks behind the ops guards. They catch the mistakes the public cases keep making:
 * wrong address in an outgoing message, a visit booked in the past or on the wrong weekday,
 * an invoice above the approved quote or from another company, and a reply like "👍" taken
 * as approval.
 */

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/** Unit-level addresses such as "Flat 30, 30 Harbour View" or "Flat 9, 3 Amhurst Road". */
export function extractAddresses(text: string): string[] {
  const re = /\b(?:Flat|Apartment|Unit)\s+\d+[A-Za-z]?,?\s+\d+[A-Za-z]?\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*/g;
  return [...text.matchAll(re)].map((m) => m[0]);
}

/** True when `found` is the same place as one of the known addresses (prefix match, so a postcode or town may be missing). */
export const addressKnown = (found: string, known: string[]) => known.some((k) => norm(k).startsWith(norm(found)) || norm(found).startsWith(norm(k)));

/** Addresses mentioned in `text` that match none of the known ones. Empty when nothing is known. */
export function foreignAddresses(text: string, known: string[]): string[] {
  const k = known.filter(Boolean);
  if (!k.length) return [];
  return extractAddresses(text).filter((a) => !addressKnown(a, k));
}

/** Parse "2026-10-12 14:00", "2026-10-12T14:00", "12/10/2026 14:00" or "12/10/2026". UTC, minute precision. */
export function parseWhen(s: string): Date | undefined {
  const iso = s.match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{1,2}):(\d{2}))?/);
  const uk = s.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2}))?/);
  const [y, mo, d, h, mi] = iso ? [iso[1], iso[2], iso[3], iso[4], iso[5]] : uk ? [uk[3], uk[2], uk[1], uk[4], uk[5]] : [];
  if (!y) return undefined;
  const date = new Date(Date.UTC(Number(y), Number(mo) - 1, Number(d), Number(h ?? 0), Number(mi ?? 0)));
  return Number.isNaN(date.getTime()) ? undefined : date;
}

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

/** Problems with a proposed visit: in the past, or a weekday in the slot text that doesn't match the date. */
export function visitProblems(datetime: string, slotText: string, today?: string): string[] {
  const when = parseWhen(datetime);
  if (!when) return [`Could not read the visit date "${datetime}". Use YYYY-MM-DD HH:MM.`];
  const problems: string[] = [];
  const now = today ? parseWhen(today) : undefined;
  if (now && when < now) problems.push(`${datetime} is before today (${today}). A visit that already happened is a work result, not a booking.`);
  const named = DAYS.find((d) => new RegExp(`\\b${d}\\b`, 'i').test(slotText));
  const actual = DAYS[when.getUTCDay()];
  if (named && named !== actual) problems.push(`The slot says ${named} but ${datetime.slice(0, 10)} is a ${actual}. Confirm the date with the provider.`);
  return problems;
}

/** Words only: lower case, every run of punctuation, quotes, markdown or whitespace becomes one space. */
const words = (s: string) => ` ${s.toLowerCase().replace(/[^a-z0-9£]+/g, ' ').trim()} `;

/**
 * True when `quote` is copied from `evidence`, ignoring case, spacing, quote styles and punctuation.
 * Tolerates an elision ("…" or "...") and a date/channel annotation around the words, e.g.
 * `Email 12/10: "Please go ahead"` or `Please go ahead (SMS, 28/09)`.
 */
export function quoteAppears(quote: string, evidence: string): boolean {
  const hay = words(evidence);
  const found = (q: string) => {
    const parts = q.split(/\.\.\.|…/).map(words).filter((p) => p.trim());
    if (!parts.length) return false;
    let from = 0;
    for (const p of parts) {
      const at = hay.indexOf(p, from);
      if (at < 0) return false;
      from = at + p.length - 1;
    }
    return true;
  };
  const candidates = [
    quote,
    ...[...quote.matchAll(/["“”]([^"“”]{4,})["“”]/g)].map((m) => m[1]),
    quote.replace(/\s*\([^()]*\)\s*$/, '').replace(/^[^:"“]{0,60}:\s*/, ''),
    quote.replace(/\s+[-–—]\s+[^-–—]{0,60}$/, ''),
  ];
  return candidates.some((c) => c.trim() && found(c));
}

/**
 * Who wrote the words: the `From:` line of every organiser-format event (`### … event NNN`) whose
 * text contains `quote`. Undefined when the evidence has no such events, so callers skip the check.
 */
export function quoteSpeakers(quote: string, evidence: string): string[] | undefined {
  const blocks = evidence.split(/^(?=#{2,4} .*\bevent[- ]?\d+)/im).filter((b) => /^#{2,4} .*\bevent[- ]?\d+/i.test(b));
  if (!blocks.length) return undefined;
  return blocks.filter((b) => quoteAppears(quote, b)).map((b) => b.match(/^- \*\*From:\*\*\s*(.+)$/m)?.[1]?.trim() ?? 'unknown');
}

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

/** True when `text` names the calendar date of `datetime` (e.g. "8 September", "Sept 8th", "08/09", "2025-09-08", or "tomorrow" relative to `today`). A weekday alone does not count. */
export function mentionsDate(text: string, datetime: string, today?: string): boolean {
  const when = parseWhen(datetime);
  if (!when) return false;
  const d = when.getUTCDate();
  const m = when.getUTCMonth();
  const t = text.toLowerCase();
  const day = `0?${d}(?:st|nd|rd|th)?`;
  const month = `${MONTHS[m].slice(0, 3)}[a-z]*\\.?`;
  const patterns = [
    `\\b${day}\\s+(?:of\\s+)?${month}`,
    `\\b${month}\\s+${day}\\b`,
    `\\b0?${d}[/.-]0?${m + 1}\\b`,
    `\\b${when.toISOString().slice(0, 10)}\\b`,
  ];
  if (patterns.some((p) => new RegExp(p).test(t))) return true;
  const now = today ? parseWhen(today) : undefined;
  if (!now) return false;
  const days = Math.round((Date.UTC(when.getUTCFullYear(), m, d) - Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())) / 86_400_000);
  return (days === 0 && /\btoday\b/.test(t)) || (days === 1 && /\btomorrow\b/.test(t));
}

/** Approval text that is too thin to rely on (emoji, "ok", empty). */
export const tooThinForApproval = (quote: string) => quote.replace(/[^A-Za-z]/g, '').length < 4;

export type InvoiceCheck = { amount_gbp: number; issuer: string; contractor?: string; approved_gbp?: number; spend_limit_gbp?: number };

/** Flags an invoice that needs a human or a hold before anyone pays it. Amounts include VAT. */
export function invoiceFlags(i: InvoiceCheck): string[] {
  const flags: string[] = [];
  if (i.approved_gbp !== undefined && i.amount_gbp > i.approved_gbp + 0.5)
    flags.push(`Invoice £${i.amount_gbp.toFixed(2)} is above the approved £${i.approved_gbp.toFixed(2)}.`);
  if (i.approved_gbp === undefined && i.spend_limit_gbp !== undefined && i.amount_gbp > i.spend_limit_gbp)
    flags.push(`Invoice £${i.amount_gbp.toFixed(2)} is above the landlord's £${i.spend_limit_gbp} limit and no approval is recorded.`);
  if (i.contractor && norm(i.issuer) && !norm(i.issuer).includes(norm(i.contractor)) && !norm(i.contractor).includes(norm(i.issuer)))
    flags.push(`Invoice is from "${i.issuer}" but the job is assigned to "${i.contractor}".`);
  return flags;
}

/** Gross amount of a quote. */
export const quoteTotal = (amount: number, vat: 'included' | 'plus_vat' | 'none') => Math.round((vat === 'plus_vat' ? amount * 1.2 : amount) * 100) / 100;
