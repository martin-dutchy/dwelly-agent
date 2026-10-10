import { describe, expect, it } from 'vitest';
import { baseTimeoutMs, caseTimeoutMs, parseDeadline } from './budget.js';

const at = (h: number, m: number, s = 0) => new Date(2026, 9, 10, h, m, s);

describe('parseDeadline', () => {
  it('is undefined without flags', () => {
    expect(parseDeadline(undefined, undefined, at(16, 37))).toBeUndefined();
  });
  it('reads HH:MM as local time today', () => {
    expect(parseDeadline(undefined, '16:50', at(16, 37))).toEqual(at(16, 50));
  });
  it('rejects a deadline that has passed', () => {
    expect(() => parseDeadline(undefined, '16:30', at(16, 37))).toThrow(/already passed/);
  });
  it('rejects a deadline more than 3 hours away and malformed input', () => {
    expect(() => parseDeadline(undefined, '23:00', at(16, 37))).toThrow(/3 hours/);
    expect(() => parseDeadline(undefined, '4pm', at(16, 37))).toThrow(/HH:MM/);
    expect(() => parseDeadline('abc', undefined, at(16, 37))).toThrow(/positive/);
  });
  it('counts --budget-min from now', () => {
    expect(parseDeadline('20', undefined, at(16, 37))).toEqual(at(16, 57));
  });
  it('takes the earlier of the two', () => {
    expect(parseDeadline('20', '16:50', at(16, 37))).toEqual(at(16, 50));
    expect(parseDeadline('5', '16:50', at(16, 37))).toEqual(at(16, 42));
  });
});

describe('baseTimeoutMs', () => {
  it('keeps --timeout when the budget is generous', () => {
    expect(baseTimeoutMs(300, 780_000, 6, 30)).toBe(300_000);
  });
  it('scales with budget × concurrency / N', () => {
    expect(baseTimeoutMs(300, 600_000, 6, 60)).toBe(120_000);
  });
  it('never goes below 90 s', () => {
    expect(baseTimeoutMs(300, 60_000, 1, 100)).toBe(90_000);
  });
  it('is --timeout without a budget', () => {
    expect(baseTimeoutMs(300, undefined, 6, 30)).toBe(300_000);
  });
});

describe('caseTimeoutMs', () => {
  const deadline = at(16, 50);
  it('skips with less than 60 s left', () => {
    expect(caseTimeoutMs(300_000, deadline, at(16, 49, 1).getTime())).toBe('skip');
  });
  it('clamps to the remaining time minus 20 s', () => {
    expect(caseTimeoutMs(300_000, deadline, at(16, 48, 30).getTime())).toBe(70_000);
  });
  it('uses the base when there is time', () => {
    expect(caseTimeoutMs(300_000, deadline, at(16, 37).getTime())).toBe(300_000);
  });
  it('uses the base without a deadline', () => {
    expect(caseTimeoutMs(300_000, undefined, Date.now())).toBe(300_000);
  });
});
