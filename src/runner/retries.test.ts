import { describe, expect, it } from 'vitest';
import { recommendConcurrency, retryLine, retryStats } from './retries.js';

describe('retryStats', () => {
  it('sums retries, counts affected cases and finds the max', () => {
    expect(retryStats([{ retries: 0 }, { retries: 2 }, { retries: 5 }])).toEqual({ total: 7, cases: 2, max: 5 });
  });
  it('is all zeros for no retries', () => expect(retryStats([])).toEqual({ total: 0, cases: 0, max: 0 }));
});

describe('recommendConcurrency', () => {
  it('suggests raising when there were no retries and the run used under half the budget', () => {
    expect(recommendConcurrency({ total: 0, cases: 0, max: 0 }, 8, 25, 300_000, 900_000)).toBe('keep --concurrency 8 or raise to 10');
  });
  it('keeps the concurrency at up to 1 retry per case', () => {
    expect(recommendConcurrency({ total: 20, cases: 10, max: 3 }, 8, 25, 800_000, 900_000)).toBe('keep --concurrency 8');
    expect(recommendConcurrency({ total: 0, cases: 0, max: 0 }, 8, 25, 300_000)).toBe('keep --concurrency 8');
  });
  it('drops by 2 at up to 3 retries per case', () => {
    expect(recommendConcurrency({ total: 50, cases: 20, max: 6 }, 8, 25, 800_000, 900_000)).toBe('use --concurrency 6');
  });
  it('halves above 3 retries per case', () => {
    expect(recommendConcurrency({ total: 100, cases: 25, max: 9 }, 8, 25, 800_000, 900_000)).toBe('use --concurrency 4 or set LLM_CONCURRENCY');
  });
  it('never goes below 2', () => {
    expect(recommendConcurrency({ total: 100, cases: 3, max: 50 }, 3, 3, 1, 900_000)).toBe('use --concurrency 2 or set LLM_CONCURRENCY');
  });
});

describe('retryLine', () => {
  it('prints the summary line', () => {
    expect(retryLine({ total: 7, cases: 4, max: 3 }, 8, 25, 800_000, 900_000)).toBe(
      'Rate-limit retries: 7 across 4 cases (max 3 in one case) at concurrency 8 · next run: keep --concurrency 8',
    );
  });
});
