// Skills: situation playbooks chosen by a deterministic classifier, plus load_skill mid-run.
import type { SituationTag, Skill } from '../harness/contracts.js';
import { readSkillFiles } from './load.js';
import { GROUP_ORDER, TAG_GROUPS, tagRank } from './tags.js';

export { classify } from './classify.js';

/** Skills injected into the case prompt at most; the rest stay reachable through load_skill. */
export const MAX_SKILLS = 3;

let cache: Skill[] | undefined;

/** Every readable skill. A malformed file is skipped here (the lint test fails on it), so a case never crashes on one. */
export function listSkills(): Skill[] {
  cache ??= readSkillFiles().flatMap((f) => (f.skill ? [f.skill] : []));
  return cache;
}

const rank = (s: Skill) => Math.min(...s.tags.map(tagRank));
const group = (s: Skill) => TAG_GROUPS[s.tags.reduce((a, t) => (tagRank(t) < tagRank(a) ? t : a))];

/**
 * At most MAX_SKILLS skills for the tags, ordered safety, then legal, then workflow.
 * The best safety skill and the best legal skill are taken first, so several safety tags cannot crowd out the law;
 * free slots then go by priority.
 */
export function selectSkills(tags: SituationTag[]): Skill[] {
  const matching = listSkills()
    .filter((s) => s.tags.some((t) => tags.includes(t)))
    .sort((a, b) => rank(a) - rank(b));
  const picked: Skill[] = [];
  for (const g of GROUP_ORDER.filter((x) => x !== 'workflow')) {
    const best = matching.find((s) => group(s) === g);
    if (best) picked.push(best);
  }
  for (const s of matching) if (picked.length < MAX_SKILLS && !picked.includes(s)) picked.push(s);
  return picked.sort((a, b) => rank(a) - rank(b));
}

/** The selected skills as prompt text; '' when none. With the classifier tags, also names matching skills left out by the cap. */
export function renderSkills(skills: Skill[], tags?: SituationTag[]): string {
  if (!skills.length) return '';
  const left = tags ? listSkills().filter((s) => !skills.includes(s) && s.tags.some((t) => tags.includes(t))) : [];
  const head = [
    '<playbooks>',
    `Playbooks for the situations found in this case${tags?.length ? ` (${tags.join(', ')})` : ''}. Follow their procedure alongside the policy.`,
    ...(left.length ? [`Also relevant, not attached: ${left.map((s) => s.id).join(', ')}. Read them with load_skill before acting on that part of the case.`] : []),
    '</playbooks>',
  ].join('\n');
  return [head, ...skills.map((s) => `<skill id="${s.id}" title="${s.title}">\n${s.body}\n</skill>`)].join('\n\n');
}

/** Body of one skill for the load_skill tool. Accepts a skill id or a situation tag; an unknown id lists the ids that exist. */
export function loadSkill(id: string): string {
  const key = id.trim().toLowerCase();
  const all = listSkills();
  const s = all.find((x) => x.id === key) ?? all.find((x) => x.id === key.replace(/_/g, '-')) ?? all.find((x) => x.tags.includes(key as SituationTag));
  return s ? `# ${s.title}\n\n${s.body}` : `No skill "${id}". Available: ${all.map((x) => x.id).join(', ') || '(none)'}.`;
}
