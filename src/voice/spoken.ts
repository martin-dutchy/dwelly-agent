// Speech-to-text hands us spoken forms ("14th of March 91", "e eight one h l").
// Normalise the few values our tools match exactly, so bad audio fails closed instead of drifting.

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const pad = (n: number) => String(n).padStart(2, '0');

const fullYear = (y: number) => (y >= 100 ? y : y > new Date().getFullYear() % 100 ? 1900 + y : 2000 + y);

/** Returns YYYY-MM-DD, or the input unchanged when it cannot be read unambiguously. */
export function normaliseDate(input: string): string {
  const s = input.trim().toLowerCase();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const valid = (y: number, m: number, d: number) => m >= 1 && m <= 12 && d >= 1 && d <= 31;
  // UK order only: 14/03/1991, 14-03-91, 14.3.1991
  const num = s.match(/^(\d{1,2})[/.\- ](\d{1,2})[/.\- ](\d{2}|\d{4})$/);
  if (num) {
    const [d, m, y] = [Number(num[1]), Number(num[2]), fullYear(Number(num[3]))];
    return valid(y, m, d) ? `${y}-${pad(m)}-${pad(d)}` : input;
  }
  // "14th of March 1991", "March 14 1991", "14 mar 91"
  const words = s.replace(/(\d)(st|nd|rd|th)\b/g, '$1').replace(/\bof\b|,/g, ' ').split(/\s+/).filter(Boolean);
  const mi = words.findIndex((w) => MONTHS.includes(w.slice(0, 3)));
  const nums = words.filter((w) => /^\d+$/.test(w)).map(Number);
  if (mi >= 0 && nums.length === 2) {
    // The year is the number that cannot be a day; otherwise the last one spoken.
    const [d, y] = nums[0] > 31 ? [nums[1], nums[0]] : nums;
    const m = MONTHS.indexOf(words[mi].slice(0, 3)) + 1;
    const yy = fullYear(y);
    return valid(yy, m, d) ? `${yy}-${pad(m)}-${pad(d)}` : input;
  }
  return input;
}

/** "e eight one h l" / "E81HL" -> "E8 1HL". Leaves anything that is not a UK postcode untouched. */
export function normalisePostcode(input: string): string {
  const digits: Record<string, string> = { zero: '0', oh: '0', one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9' };
  const compact = input
    .toLowerCase()
    .split(/\s+/)
    .map((w) => digits[w] ?? w)
    .join('')
    .replace(/[^a-z0-9]/g, '')
    .toUpperCase();
  const m = compact.match(/^([A-Z]{1,2}\d[A-Z\d]?)(\d[A-Z]{2})$/);
  return m ? `${m[1]} ${m[2]}` : input;
}
