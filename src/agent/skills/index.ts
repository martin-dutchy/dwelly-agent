// Skills: situation playbooks chosen by a deterministic classifier, plus load_skill mid-run.
// Wave 0 stub: no skills, so nothing is injected and load_skill is not registered.
import type { CaseBrief, CaseBundle, SituationTag, Skill } from '../harness/contracts.js';

export function listSkills(): Skill[] {
  return [];
}

export function classify(_b: CaseBundle, _brief?: CaseBrief): SituationTag[] {
  return [];
}

export function selectSkills(_tags: SituationTag[]): Skill[] {
  return [];
}

/** The selected skills as prompt text; '' when none. */
export function renderSkills(skills: Skill[]): string {
  return skills.length ? skills.map((s) => `<skill id="${s.id}" title="${s.title}">\n${s.body}\n</skill>`).join('\n\n') : '';
}

/** Body of one skill for the load_skill tool; an unknown id lists the ids that exist. */
export function loadSkill(id: string): string {
  const s = listSkills().find((x) => x.id === id);
  return s ? s.body : `No skill "${id}". Available: ${listSkills().map((x) => x.id).join(', ') || '(none)'}.`;
}
