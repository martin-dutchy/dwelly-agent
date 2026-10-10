// Reads the skill playbooks (`src/agent/skills/<id>.md`): front matter plus a markdown body.
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { Skill, SituationTag } from '../harness/contracts.js';
import { ALL_TAGS } from './tags.js';

export const SKILLS_DIR = fileURLToPath(new URL('./', import.meta.url));
export const REQUIRED_SECTIONS = ['## Procedure', '## Required actions', '## Red flags', '## Escalate when'] as const;

export interface SkillFile {
  file: string;
  skill?: Skill;
  error?: string;
}

/** Front matter is a small YAML subset: `key: value`, `key: [a, b]`, and `key:` followed by `  - item` lines. */
function parseFrontMatter(raw: string): Record<string, string | string[]> {
  const out: Record<string, string | string[]> = {};
  let listKey: string | undefined;
  for (const line of raw.split('\n')) {
    if (!line.trim()) continue;
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && listKey) {
      (out[listKey] as string[]).push(item[1].trim());
      continue;
    }
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) throw new Error(`unreadable front matter line: ${line}`);
    const [, key, value] = kv;
    if (!value) {
      out[key] = [];
      listKey = key;
    } else if (value.startsWith('[') && value.endsWith(']')) {
      out[key] = value.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean);
      listKey = undefined;
    } else {
      out[key] = value;
      listKey = undefined;
    }
  }
  return out;
}

export function parseSkill(text: string, file = '(inline)'): Skill {
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing front matter`);
  const fm = parseFrontMatter(m[1]);
  const str = (k: string) => {
    const v = fm[k];
    if (typeof v !== 'string' || !v) throw new Error(`${file}: front matter "${k}" must be a non-empty string`);
    return v;
  };
  const list = (k: string) => {
    const v = fm[k];
    if (!Array.isArray(v) || !v.length) throw new Error(`${file}: front matter "${k}" must be a non-empty list`);
    return v;
  };
  const tags = list('tags');
  const unknown = tags.filter((t) => !(ALL_TAGS as readonly string[]).includes(t));
  if (unknown.length) throw new Error(`${file}: unknown tags ${unknown.join(', ')}`);
  const body = m[2].trim();
  const missing = REQUIRED_SECTIONS.filter((s) => !body.includes(`${s}\n`));
  if (missing.length) throw new Error(`${file}: missing sections ${missing.join(', ')}`);
  return { id: str('id'), title: str('title'), tags: tags as SituationTag[], whenToUse: str('when_to_use'), body, redFlags: list('red_flags') };
}

/** Every skill file with its parse result; a broken file is reported, never thrown. */
export function readSkillFiles(dir = SKILLS_DIR): SkillFile[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .sort()
    .map((file) => {
      try {
        return { file, skill: parseSkill(readFileSync(`${dir}/${file}`, 'utf8'), file) };
      } catch (e) {
        return { file, error: e instanceof Error ? e.message : String(e) };
      }
    });
}

/** The body text of one section, e.g. section(skill.body, '## Required actions'). */
export function section(body: string, heading: string): string {
  const start = body.indexOf(`${heading}\n`);
  if (start < 0) return '';
  const rest = body.slice(start + heading.length + 1);
  const next = rest.search(/^## /m);
  return (next < 0 ? rest : rest.slice(0, next)).trim();
}
