// Guards: rules checked in code before a tool runs. Wave 0 stub: none, every tool at tier 1.
import type { Guard, Tier } from '../harness/contracts.js';

export const GUARDS: Guard[] = [];

export const TOOL_TIERS: Record<string, Tier> = {};

export const tierOf = (tool: string): Tier => TOOL_TIERS[tool] ?? 1;
