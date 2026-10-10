import type { SituationTag } from '../harness/contracts.js';

export type TagGroup = 'safety' | 'legal' | 'workflow';

/**
 * Every situation tag, in selection priority: safety, then the law (with fraud and data protection),
 * then workflow. Within a group, earlier tags win when the skill cap is reached.
 */
export const TAG_GROUPS: Record<SituationTag, TagGroup> = {
  gas: 'safety',
  co: 'safety',
  fire: 'safety',
  electrical: 'safety',
  water: 'safety',
  vulnerable: 'safety',
  damp_mould: 'safety',
  out_of_hours: 'safety',
  arrears: 'legal',
  fraud_injection: 'legal',
  legal_claim: 'legal',
  access_entry: 'legal',
  identity_privacy: 'legal',
  void_keys: 'legal',
  deposit: 'legal',
  tenancy_lifecycle: 'legal',
  compliance: 'legal',
  landlord_approval: 'workflow',
  quote_invoice: 'workflow',
  contractor_chase: 'workflow',
  unrelated_issue: 'workflow',
  closure: 'workflow',
};

export const ALL_TAGS = Object.keys(TAG_GROUPS) as SituationTag[];
export const EMERGENCY_TAGS: readonly SituationTag[] = ['gas', 'co', 'fire', 'electrical', 'water'];
export const GROUP_ORDER: readonly TagGroup[] = ['safety', 'legal', 'workflow'];

export const tagRank = (t: SituationTag) => ALL_TAGS.indexOf(t);
