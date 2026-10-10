// Timestamps as they appear in case files, to ISO 8601. Local times stay local (no offset invented).

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const p2 = (n: number | string) => String(n).padStart(2, '0');
const month = (m: string) => MONTHS.indexOf(m.slice(0, 3).toLowerCase()) + 1;
const time = (h?: string, mi?: string, s?: string) => (h ? `T${p2(h)}:${mi}${s ? `:${s}` : ''}` : '');

/** Best-effort ISO from a free-text timestamp; undefined when there is no full date in it. */
export function toIso(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const s = raw.trim();
  // 2026-10-10T12:47:30Z, 2026-10-10 12:52, 2026-08-07 11:48:38 UTC
  let m = s.match(/(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{1,2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?\s*(Z|UTC|GMT|[+-]\d{2}:?\d{2})?)?/i);
  if (m) {
    const zone = m[7] ? (/^(z|utc|gmt)$/i.test(m[7]) ? 'Z' : m[7].replace(/^([+-]\d{2})(\d{2})$/, '$1:$2')) : '';
    return `${m[1]}-${m[2]}-${m[3]}${time(m[4], m[5], m[6])}${m[4] ? zone : ''}`;
  }
  // Sat, 10 Oct 2026 11:02:40 +0100 · 9 Oct 2026, at 16:10
  m = s.match(/\b(\d{1,2}) ([A-Za-z]{3,9})\.? (\d{4})(?:,? (?:at )?(\d{1,2}):(\d{2})(?::(\d{2}))?(?: ?([+-]\d{4}|GMT|UTC|Z))?)?/);
  if (m && month(m[2]) > 0) {
    const zone = m[7] ? (/^(z|utc|gmt)$/i.test(m[7]) ? 'Z' : `${m[7].slice(0, 3)}:${m[7].slice(3)}`) : '';
    return `${m[3]}-${p2(month(m[2]))}-${p2(m[1])}${time(m[4], m[5], m[6])}${m[4] ? zone : ''}`;
  }
  // Oct 9, 2026 4:10 PM
  m = s.match(/\b([A-Za-z]{3,9}) (\d{1,2}),? (\d{4})(?:,? (?:at )?(\d{1,2}):(\d{2})\s*(am|pm)?)?/i);
  if (m && month(m[1]) > 0) {
    const h = m[4] && m[6] ? (Number(m[4]) % 12) + (/pm/i.test(m[6]) ? 12 : 0) : m[4];
    return `${m[3]}-${p2(month(m[1]))}-${p2(m[2])}${time(h === undefined ? undefined : String(h), m[5])}`;
  }
  // 09/10/2026, 18:02 (UK day first)
  m = s.match(/\b(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4}),? (\d{1,2}):(\d{2})(?::(\d{2}))?/) ?? s.match(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/);
  if (m) {
    const y = m[3].length === 2 ? `20${m[3]}` : m[3];
    return `${y}-${p2(m[2])}-${p2(m[1])}${time(m[4], m[5], m[6])}`;
  }
  return undefined;
}

/** The case's "Today" line: "- **Today:** Saturday 2026-10-10 12:52, shortly after the call". */
export function todayOf(brief: string): string | undefined {
  const line = brief.match(/\*\*Today:?\*\*:?\s*(.+)/i)?.[1] ?? brief.match(/^\s*(?:today|now|current (?:date|time))\s*[:=-]\s*(.+)$/im)?.[1];
  return toIso(line);
}

/** Date part (YYYY-MM-DD) of an ISO string. */
export const dayOf = (iso?: string) => iso?.slice(0, 10);
