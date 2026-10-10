// Rate-limit visibility: retry counts per run and the concurrency to use next time. Printed, never applied.

export type RetryStats = { total: number; cases: number; max: number };

export function retryStats(rows: { retries: number }[]): RetryStats {
  const counts = rows.map((r) => r.retries).filter((n) => n > 0);
  return { total: counts.reduce((a, n) => a + n, 0), cases: counts.length, max: counts.length ? Math.max(...counts) : 0 };
}

/** Advice for the next run's `--concurrency`, from retries per case run and the share of the budget used. */
export function recommendConcurrency(stats: RetryStats, concurrency: number, casesRun: number, wallMs: number, budgetMs?: number): string {
  const c = concurrency;
  const perCase = casesRun > 0 ? stats.total / casesRun : 0;
  if (perCase === 0 && budgetMs !== undefined && wallMs < budgetMs / 2) return `keep --concurrency ${c} or raise to ${c + 2}`;
  if (perCase <= 1) return `keep --concurrency ${c}`;
  if (perCase <= 3) return `use --concurrency ${Math.max(2, c - 2)}`;
  return `use --concurrency ${Math.max(2, Math.floor(c / 2))} or set LLM_CONCURRENCY`;
}

export function retryLine(stats: RetryStats, concurrency: number, casesRun: number, wallMs: number, budgetMs?: number): string {
  return `Rate-limit retries: ${stats.total} across ${stats.cases} cases (max ${stats.max} in one case) at concurrency ${concurrency} · next run: ${recommendConcurrency(stats, concurrency, casesRun, wallMs, budgetMs)}`;
}
