import { describe, expect, it } from 'vitest';
import { loadCase } from '../cases.js';
import { type DatedText, inferYear, weekdayDateConflicts } from './dateChecks.js';
import { hintsFor } from './stateReconstruct.js';

const one = (text: string, date = '2025-08-26') => weekdayDateConflicts([{ event: 12, date, text }]);

describe('weekday/date conflicts: each date format', () => {
  it.each([
    ['Visit booked for Monday 30/08/2025.', '"Monday 30/08/2025" but 30/08/2025 is a Saturday'],
    ['Engineer attends Wednesday 2/9/25 in the morning.', '"Wednesday 2/9/25" but 02/09/2025 is a Tuesday'],
    ['Slot: Friday 2025-09-08 10:00', '"Friday 2025-09-08" but 08/09/2025 is a Monday'],
    ['She arranged it for Tuesday 8 September with them.', '"Tuesday 8 September" but 08/09/2025 (year inferred from the event date) is a Monday'],
    ['Booked for Sunday 8th September 2025.', '"Sunday 8th September 2025" but 08/09/2025 is a Monday'],
    ['Can you do Monday, 30 August?', '"Monday, 30 August" but 30/08/2025 (year inferred from the event date) is a Saturday'],
    ['They will come on Monday (30/08) between 10 and 12.', '"Monday (30/08)" but 30/08/2025 (year inferred from the event date) is a Saturday'],
    ['Confirmed Time Slot: Monday morning between 10 and 12 (30/08/2025)', '"Monday morning between 10 and 12 (30/08/2025)" but 30/08/2025 is a Saturday'],
    ['Engineer booked Mon 30/08/2025 am.', '"Mon 30/08/2025" but 30/08/2025 is a Saturday'],
    ['Booked for 30/08/2025 (Monday).', '"30/08/2025 (Monday)" but 30/08/2025 is a Saturday'],
  ])('%s', (text, expected) => {
    expect(one(text)).toEqual([`event 012 says ${expected}`]);
  });
});

describe('weekday/date conflicts: missing year', () => {
  it('takes the nearest year within ~9 months of the event', () => {
    expect(inferYear(1, 2, '2025-12-20')).toBe('2026-01-02');
    expect(inferYear(11, 15, '2025-01-15')).toBe('2024-11-15');
    expect(one('Friday 2 January works for us.', '2025-12-20')).toEqual([]);
  });

  it('skips a date that is about as near in two years, or far from both', () => {
    expect(inferYear(1, 1, '2025-07-01')).toBeUndefined();
    expect(one('Can they come Tuesday 1 January?', '2025-07-01')).toEqual([]);
    expect(inferYear(2, 29, '2024-03-01')).toBe('2024-02-29');
    expect(inferYear(2, 29, '2025-03-01')).toBeUndefined();
    expect(inferYear(2, 30, '2025-03-01')).toBeUndefined();
  });
});

describe('weekday/date conflicts: one date, two weekdays', () => {
  it('flags the same date named with different weekdays across events', () => {
    const items: DatedText[] = [
      { event: 18, date: '2025-08-26', text: 'Confirmed Time Slot: Monday 01/09/2025' },
      { event: 23, date: '2025-08-28', text: 'Reminder: your visit is on Tuesday 1 September 2025.' },
    ];
    expect(weekdayDateConflicts(items)).toEqual([
      '01/09/2025 is called Monday (event 018) and Tuesday (event 023)',
      'event 023 says "Tuesday 1 September 2025" but 01/09/2025 is a Monday',
    ]);
  });

  it('groups repeats of the same wrong pairing into one line', () => {
    const items = [18, 19, 20].map((event) => ({ event, date: '2025-08-26', text: 'Confirmed Time Slot: Monday 30/08/2025' }));
    expect(weekdayDateConflicts(items)).toEqual(['events 018, 019, 020 say "Monday 30/08/2025" but 30/08/2025 is a Saturday']);
  });
});

describe('weekday/date conflicts: no false positives', () => {
  it.each([
    ['correct weekday', 'Visit booked for Monday 01/09/2025 at 10am.'],
    ['different sentence', 'The engineer can come on Monday. 30/08/2025 was the date you first reported it.'],
    ['different line', 'Engineer free Monday\n30/08/2025 report attached'],
    ['Mon-Fri range', 'Office hours Mon-Fri, 30/08/2025 onwards.'],
    ['Monday to Friday range', 'Available Monday to Friday 30/08/2025 onwards.'],
    ['list of weekdays', 'Either Monday or Tuesday 2/9/2025 works.'],
    ['times only', 'Monday at 10:30, or Tuesday 10.30-12.00.'],
    ['contrast between weekday and date', 'It is Monday, not 30/08/2025.'],
    ['date already paired with another weekday', 'Saturday 30/08/2025, Monday works too.'],
    ['far apart in one sentence', 'On Monday the tenant said the leak that the plumber fixed returned on 30/08/2025'],
    ['24/7', 'Call us Monday 24/7 line.'],
    ['lower-case abbreviation', 'we sat 30/08/2025 waiting'],
  ])('%s', (_name, text) => {
    expect(one(text)).toEqual([]);
  });

  it('never throws on malformed input', () => {
    expect(weekdayDateConflicts([{ event: 1, date: 'not a date', text: 'Monday 30 August' }])).toEqual([]);
    expect(weekdayDateConflicts([{ event: 1, date: '2025-01-01', text: undefined as unknown as string }])).toEqual([]);
  });
});

describe('weekday/date conflicts in the case-state hints', () => {
  it('026 at its recorded cut: Monday 30/08/2025 is a Saturday', () => {
    const c = loadCase('cases/public-cuts/026-date-conflict');
    expect(c.cutoff).toBe(21);
    expect(hintsFor(c).text).toContain(
      '- Date conflict: events 018, 019, 020 say "Monday morning between 10 and 12 (30/08/2025)" but 30/08/2025 is a Saturday.',
    );
  });
});
