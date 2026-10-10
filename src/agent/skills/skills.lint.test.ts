import { readFileSync } from 'node:fs';
import { z } from 'zod';
import { describe, expect, it } from 'vitest';
import { Decision } from '../caseAgent.js';
import { createOpsToolset } from '../opsTools.js';
import { listSkills } from './index.js';
import { parseSkill, readSkillFiles, REQUIRED_SECTIONS, section, SKILLS_DIR } from './load.js';
import { ALL_TAGS } from './tags.js';

const { tools } = createOpsToolset();
const toolNames = tools.map((t) => t.name);
const known = [...tools.map((t) => `${t.name} ${JSON.stringify(z.toJSONSchema(t.parameters))}`), 'submit_decision', 'load_skill', JSON.stringify(z.toJSONSchema(Decision))].join(' ');

const PLAN_IDS = [
  'landlord-approval',
  'quote-invoice',
  'contractor-chase',
  'closure',
  'gas-emergency',
  'co-alarm',
  'water-electrical-fire',
  'out-of-hours',
  'damp-mould-awaab',
  'legal-claim',
  'deposit-tenancy-end',
  'arrears-breathing-space',
  'identity-privacy',
  'vulnerable-occupant',
  'void-keys-access',
  'unrelated-issue-split',
  'fraud-injection',
];

describe('skill files', () => {
  const files = readSkillFiles();

  it('all parse, and there are at least 14', () => {
    expect(files.filter((f) => f.error).map((f) => f.error)).toEqual([]);
    expect(files.length).toBeGreaterThanOrEqual(14);
    expect(listSkills()).toHaveLength(files.length);
  });

  it('include every playbook the plan names, each id matching its file name', () => {
    expect(PLAN_IDS.filter((id) => !listSkills().some((s) => s.id === id))).toEqual([]);
    for (const f of files) expect(`${f.skill!.id}.md`).toBe(f.file);
    expect(new Set(listSkills().map((s) => s.id)).size).toBe(listSkills().length);
  });

  it('have the four sections in order, each with content', () => {
    for (const s of listSkills()) {
      const at = REQUIRED_SECTIONS.map((h) => s.body.indexOf(`${h}\n`));
      expect(at, s.id).toEqual([...at].sort((a, b) => a - b));
      for (const h of REQUIRED_SECTIONS) expect(section(s.body, h).length, `${s.id} ${h}`).toBeGreaterThan(20);
    }
  });

  it('use only valid situation tags, and every tag has a playbook', () => {
    for (const s of listSkills()) for (const t of s.tags) expect(ALL_TAGS, s.id).toContain(t);
    expect(ALL_TAGS.filter((t) => !listSkills().some((s) => s.tags.includes(t)))).toEqual([]);
  });

  it('name under Required actions only tools that exist in the ops toolset, at least two each', () => {
    for (const s of listSkills()) {
      // Each bullet names its tools before the colon: "- `create_ticket` or `update_ticket`: what for".
      const heads = section(s.body, '## Required actions')
        .split('\n')
        .filter((l) => l.startsWith('- '))
        .map((l) => l.split(':')[0]);
      const named = heads.flatMap((h) => [...h.matchAll(/`([a-z_]+)`/g)].map((m) => m[1]));
      expect(named.length, s.id).toBeGreaterThanOrEqual(2);
      expect(named.filter((n) => !toolNames.includes(n)), s.id).toEqual([]);
    }
  });

  it('name only tools, arguments and values that exist anywhere in the body', () => {
    for (const s of listSkills()) {
      const names = [...new Set([...s.body.matchAll(/\b[a-z]+(?:_[a-z]+)+\b/g)].map((m) => m[0]))];
      expect(names.filter((n) => !known.includes(n)), s.id).toEqual([]);
    }
  });

  it('carry a short when_to_use and checkable red flags for the critic', () => {
    for (const s of listSkills()) {
      expect(s.whenToUse.length, s.id).toBeLessThanOrEqual(260);
      expect(s.redFlags.length, s.id).toBeGreaterThanOrEqual(3);
    }
  });

  it('are written to the operations agent, never to an evaluator', () => {
    for (const f of files) expect(readFileSync(`${SKILLS_DIR}/${f.file}`, 'utf8'), f.file).not.toMatch(/\b(judge|grader|graded|rubric|score this|evaluator)\b/i);
  });
});

describe('parseSkill', () => {
  const ok = `---\nid: x\ntitle: X\ntags: [gas]\nwhen_to_use: When.\nred_flags:\n  - One.\n---\n\n${REQUIRED_SECTIONS.map((h) => `${h}\nText.\n`).join('\n')}`;

  it('reads front matter lists in both forms', () => {
    expect(parseSkill(ok)).toMatchObject({ id: 'x', tags: ['gas'], redFlags: ['One.'], whenToUse: 'When.' });
  });

  it('rejects unknown tags, missing sections and missing front matter', () => {
    expect(() => parseSkill(ok.replace('[gas]', '[gas, plumbing]'))).toThrow(/unknown tags plumbing/);
    expect(() => parseSkill(ok.replace('## Escalate when\n', ''))).toThrow(/missing sections ## Escalate when/);
    expect(() => parseSkill('no front matter')).toThrow(/missing front matter/);
  });
});
