// Failure taxonomy: which harness layer should fix a miss. Wave 0 stub: everything is unclassified.
import type { Layer } from '../agent/harness/contracts.js';

export type Miss = { caseId: string; itemId: string; kind: 'rubric' | 'check'; text: string };

export function classifyMiss(_miss: Miss, _result: unknown): Layer {
  return 'unclassified';
}
