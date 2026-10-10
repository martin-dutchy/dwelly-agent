import { z } from 'zod';
import { describe, expect, it } from 'vitest';
import { Decision } from './caseAgent.js';
import { createOpsToolset } from './opsTools.js';
import { CASE_SYSTEM_PROMPT } from './systemPrompt.js';

describe('case system prompt', () => {
  it('carries the maintenance policy after the shared policy', () => {
    const shared = CASE_SYSTEM_PROMPT.indexOf('# Operating policy');
    const maintenance = CASE_SYSTEM_PROMPT.indexOf('# Maintenance case policy');
    expect(shared).toBeGreaterThan(0);
    expect(maintenance).toBeGreaterThan(shared);
  });

  it('forbids announcing an unconfirmed visit and lists routine work that is not escalated', () => {
    expect(CASE_SYSTEM_PROMPT).toMatch(/Never tell anyone a visit is booked or confirmed unless `set_visit`/);
    expect(CASE_SYSTEM_PROMPT).toMatch(/\*\*Do not escalate\*\* what a message, one question, a new job or a dated hold can move forward/);
    expect(CASE_SYSTEM_PROMPT).not.toMatch(/anything you are unsure about/);
  });

  it('names only tools, arguments and values that exist', () => {
    const { tools } = createOpsToolset();
    const known = [...tools.map((t) => `${t.name} ${JSON.stringify(z.toJSONSchema(t.parameters))}`), JSON.stringify(z.toJSONSchema(Decision))].join(' ');
    const named = [...CASE_SYSTEM_PROMPT.matchAll(/`([a-z]+(?:_[a-z]+)+)`/g)].map((m) => m[1]);
    expect(named.length).toBeGreaterThan(10);
    expect(named.filter((n) => !known.includes(n))).toEqual([]);
  });
});
