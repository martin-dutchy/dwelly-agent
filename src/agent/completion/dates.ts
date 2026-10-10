import type { GuardContext } from '../harness/contracts.js';

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const MONTH = `(${MONTHS.join('|')})[a-z]*\\.?`;

const ymd = (y: number, m: number, d: number) => {
  if (y < 100) y += 2000;
  const t = new Date(Date.UTC(y, m - 1, d));
  if (t.getUTCFullYear() !== y || t.getUTCMonth() !== m - 1 || t.getUTCDate() !== d) return undefined;
  return t.toISOString().slice(0, 10);
};

/** The calendar day a free-text date names, as YYYY-MM-DD. Slashed dates are UK day-first. */
export function parseDay(s: unknown): string | undefined {
  const v = String(s ?? '');
  let m = v.match(/\b(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return ymd(+m[1], +m[2], +m[3]);
  m = v.match(/\b(\d{1,2})\/(\d{1,2})\/(\d{4}|\d{2})\b/);
  if (m) return ymd(+m[3], +m[2], +m[1]);
  m = v.match(new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th)?\\s+${MONTH},?\\s+(\\d{4})\\b`, 'i'));
  if (m) return ymd(+m[3], MONTHS.indexOf(m[2].toLowerCase()) + 1, +m[1]);
  m = v.match(new RegExp(`\\b${MONTH}\\s+(\\d{1,2})(?:st|nd|rd|th)?,?\\s+(\\d{4})\\b`, 'i'));
  if (m) return ymd(+m[3], MONTHS.indexOf(m[1].toLowerCase()) + 1, +m[2]);
  return undefined;
}

/** Today for the case: the brief's, the bundle's, or the "Today:" line of the case text. */
export function caseToday(ctx: Pick<GuardContext, 'brief' | 'bundle'>): string | undefined {
  const line = ctx.bundle?.brief?.match(/^\W*Today\b[*:\s]*(.*)$/im)?.[1];
  return parseDay(ctx.brief?.now) ?? parseDay(ctx.bundle?.now) ?? parseDay(line);
}
