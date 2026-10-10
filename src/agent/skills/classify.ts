// Deterministic, multi-label situation classifier: keywords over what people wrote, CRM fields,
// the brief's conflicts and money, and the case's "now". No model call, so the same case always gets the same tags.
import type { CaseBrief, CaseBundle, ConflictKind, SituationTag } from '../harness/contracts.js';
import { ALL_TAGS, EMERGENCY_TAGS, tagRank } from './tags.js';

/** JSON keys whose string values are things people wrote; everything else in a record (names, trades, ids) is skipped. */
const NARRATIVE_KEYS =
  /^(text|body|message|messages|description|summary|reason|handover_summary|notes?|transcript|content|subject|comments?|details|issue|request|result|vulnerability_notes|household|status|tenancy_status|occupancy)$/i;

const RULES: [SituationTag, RegExp[]][] = [
  ['gas', [/smell(s|ing|ed)? (of )?gas\b/i, /\bgas (smell|leak|escape|emergency)/i, /\bleak(ing)? gas\b/i, /0800 111 999/, /\bnational gas\b/i, /\bcapped (the )?(gas|meter|supply)/i]],
  ['co', [/carbon monoxide/i, /\bCO (alarm|detector|poisoning|reading|levels?)\b/, /\bCO (is |was )?(beeping|sounding|going off)/]],
  [
    'water',
    [
      /(?<!gas )\bleak(s|ing|ed|age)?\b(?! (of )?gas)/i,
      /\bflood(s|ing|ed)?\b/i,
      /\bburst (pipe|main|tank)/i,
      /\bwater (is |was )?(coming|pouring|dripping|leaking|running|gushing) (through|from|down|in|into|out)/i,
      /\bescape of water\b/i,
      /\bthrough (my|the|our) (kitchen |bathroom |bedroom )?ceiling\b/i,
      /\bsewage\b/i,
      /\boverflow(ing)?\b/i,
      /\bwater damage\b/i,
    ],
  ],
  [
    'electrical',
    [
      /\bspark(s|ing|ed)?\b/i,
      /\b(burning|melting) smell|smell of burning\b/i,
      /\bexposed wir(e|es|ing)\b/i,
      /\belectric(al)? shock\b/i,
      /\bno (power|electricity)\b/i,
      /\bpower cut\b/i,
      /\btripp(ing|ed)\b/i,
      /\b(fuse ?box|consumer unit)\b/i,
      /\b(light fitting|socket)s?\b[^.\n]{0,40}\b(water|wet|drip|hot|melt|scorch)/i,
      /\b(water|drip\w*)\b[^.\n]{0,40}\b(light fitting|socket|electrics)\b/i,
      /\bscorch(ed|ing)?\b/i,
    ],
  ],
  ['fire', [/\bon fire\b/i, /\b(a|the|kitchen|house|electrical) fire\b/i, /\bfire (brigade|service|damage)\b/i, /\bsmoke (is |was )?(coming|pouring|filling)/i, /\bcaught fire\b/i, /\bcharred\b/i]],
  ['damp_mould', [/\bdamp\b/i, /\bmou?ld(y|s)?\b/i, /\bcondensation\b/i, /\bblack spots\b/i, /\bawaab/i]],
  ['out_of_hours', [/\bout[- ]of[- ]hours\b/i, /\boffice (is )?closed\b/i, /\bafter hours\b/i, /\bmiddle of the night\b/i]],
  [
    'landlord_approval',
    [
      /\blandlord approval\b/i,
      /\blandlord\b[^.\n]{0,40}\b(approv\w*|consent\w*|authori[sz]\w*|decision|decide\w*)/i,
      /\bapprov(e|al|ed)\b[^.\n]{0,40}\b(landlord|quote|works?|spend|provider)\b/i,
      /\bspend(ing)? limit\b/i,
      /\b(own|preferred) contractors?\b/i,
      /\bwaiting for (a )?(response from )?(the )?(landlord|LL)\b/i,
      /\binstruct a contractor\b/i,
      /\bsend (one of )?(our|your) (own )?contractors?\b/i,
    ],
  ],
  ['quote_invoice', [/\bquot(e|es|ed|ation)\b/i, /\binvoic(e|es|ed)\b/i, /\bestimate (for|of) £/i]],
  [
    'contractor_chase',
    [
      /\bno work results\b/i,
      /\breminders? (have|has) been sent\b/i,
      /\bno (response|reply) (from (the )?(provider|contractor)|after \d)/i,
      /\b(provider|contractor|engineer|plumber)\b[^.\n]{0,40}\b(has(n't| not)|did(n't| not)) (responded|replied|been in touch|turned up|attended|shown up|come)/i,
      /\bno[- ]show\b/i,
      /\bmissed (the )?appointment\b/i,
      /\bnobody (came|turned up|showed up)\b/i,
    ],
  ],
  [
    'closure',
    [
      /\bclos(e|ing) (the |this )?(job|ticket|case|request)\b/i,
      /\bfinal checks\b/i,
      /\b(work|job|repair)s? (is |are |has been |have been )?(now )?(done|complete|completed|finished)\b/i,
      /\b(managed to|have|has|I|we) fix(ed)? (it|the \w+)( myself| ourselves)?\b/i,
      /\bit'?s (working|fixed) now\b/i,
      /\bno invoice (is )?needed\b/i,
      /\bpay the contractor directly\b/i,
    ],
  ],
  [
    'legal_claim',
    [
      /\bletter of claim\b/i,
      /\bletter before (action|claim)\b/i,
      /\bpre-action\b/i,
      /\bsolicitors?\b/i,
      /\blegal action\b/i,
      /\bsmall claims?\b/i,
      /\b(sue|suing)\b/i,
      /\bcompensat(e|ion)\b/i,
      /\bliab(le|ility)\b/i,
      /\byour fault\b/i,
      /\b(who('s| is) going to|you('ll| will)) (pay|cover) for\b/i,
      /\bin writing that you('ll| will) (cover|pay)/i,
      /\bdisrepair\b/i,
      /\bombudsman\b/i,
      /\benvironmental health\b|\bEHO\b/i,
      /\bformal complaint\b/i,
      /\bharass(ment|ing)?\b/i,
    ],
  ],
  [
    'deposit',
    [
      /\b(tenancy|security|damage) deposit\b/i,
      /\bdeposit (return|returned|dispute|deduction|scheme|protection|protected|back)\b/i,
      /\b(DPS|TDS|mydeposits)\b/,
      /\bdeductions?\b[^.\n]{0,30}\bdeposit\b/i,
      /\bcheck-?out (report|inspection|inventory)\b/i,
    ],
  ],
  [
    'arrears',
    [/\barrears\b/i, /\bbehind (on|with) (the |my )?rent\b/i, /\b\d+ months? behind\b/i, /\brent (is )?(owed|overdue|unpaid)\b/i, /\bmissed (rent|payments?)\b/i, /\bpayment plan\b/i, /\bbreathing space\b/i, /\bdebt (adviser|advice|respite)\b/i],
  ],
  [
    'identity_privacy',
    [
      /\bverif(y|ied|ication)\b[^.\n]{0,30}\bidentity\b|\bidentity (check|verification)\b/i,
      /\b(verification|identity check) failed\b|\bfailed (identity )?verification\b/i,
      /\bverified: false\b/i,
      /\bdo not disclose\b/i,
      /\bdata protection\b|\bGDPR\b|\bsubject access\b/i,
      /\b(give|send|pass) (me |us )?(the )?(tenant'?s?|her|his|their) (phone |mobile |contact )?(number|details|address)\b/i,
      /\bconsent to (share|pass on)\b/i,
    ],
  ],
  [
    'vulnerable',
    [
      /\bvulnerab(le|ility)\b/i,
      /\b(elderly|disabled|disability|wheelchair|pregnan\w*|newborn|baby|infant|toddler|dementia|oxygen)\b/i,
      /\b(children|kids)\b/i,
      /\bmental health\b|\banxiety\b|\bdepress(ed|ion)\b/i,
      /\bsuicid\w*|\bself[- ]harm\b/i,
      /\bdomestic abuse\b/i,
    ],
  ],
  [
    'void_keys',
    [/\bnot tenanted\b/i, /\bvoid (property|period)\b/i, /\b(vacant|unoccupied|empty) (property|flat|house)\b/i, /\bkey ?safe\b/i, /\bkey ?holder\b/i, /\bcaretaker\b/i, /\blockbox\b/i, /\bspare keys?\b/i, /\bmaster key\b/i, /\bkeys? (returned|collection|release)\b/i],
  ],
  [
    'unrelated_issue',
    [
      /\b(another|separate|unrelated|different|second) (issue|problem|fault|matter)\b/i,
      /\bother things (are|might be|may be) broken\b/i,
      /\bwhile (you'?re|you are|he'?s|they'?re) (here|there|at it)\b/i,
      /\b(bins?|parking|direct debit)\b/i,
    ],
  ],
  [
    'fraud_injection',
    [
      /\b(AI|assistant|agent|model|LLM|chatbot|system)\b[^.\n]{0,80}\b(ignore|mark (this |it )?(as )?(approved|paid)|pre-?approved|do not (request|ask|escalate|check))/i,
      /\bignore (all |any )?(previous|prior|above|earlier) instructions\b/i,
      /\b(white|hidden) (text|font)\b|\b1 ?pt font\b/i,
      /\b(change|update|new)\b[^.\n]{0,20}\bbank (details|account)\b/i,
      /\bbank (details|account)\b[^.\n]{0,30}\b(changed|frozen|new|updated)\b/i,
      /\b(pay|payment) (today|immediately|urgently)\b/i,
    ],
  ],
  [
    'access_entry',
    [
      /\blocked (myself )?out\b|\block-?out\b/i,
      /\b(snapped|broken) key\b|\bkey (snapped|broke|is stuck|stuck)\b/i,
      /\bcan(no|')?t get (in|into)\b/i,
      /\b(enter|entry|entering|access)\b[^.\n]{0,40}\bwithout\b[^.\n]{0,20}\bnotice\b/i,
      /\b24 hours'? (written )?notice\b/i,
      /\bright of entry\b/i,
      /\blet (them|him|her|the contractor|someone|my contractor) in\b/i,
      /\brefus(e|ed|es|ing) access\b|\bno access\b/i,
      /\bforce (entry|the door)\b/i,
    ],
  ],
  [
    'compliance',
    [/\bgas safety (record|certificate|check|inspection)\b/i, /\bCP12\b/, /\bEICR\b/, /\belectrical (installation )?condition report\b/i, /\bEPC\b/, /\bsmoke alarms?\b/i, /\bHMO\b/, /\b(selective|additional|HMO) licen[cs]\w*/i, /\bright to rent\b/i, /\blegionella\b/i],
  ],
  [
    'tenancy_lifecycle',
    [
      /\bnotice to (quit|leave)\b/i,
      /\b(give|giving|gave|handing in) (my |our )?notice\b/i,
      /\bmov(e|ing) out\b/i,
      /\bend (of )?(my |our |the )?tenancy\b/i,
      /\bjoint tenan(t|cy)\b/i,
      /\b(passed away|died|death of|executor|bereave\w*)\b/i,
      /\brent increase\b|\bsection 13\b/i,
      /\bpet request\b|\b(keep|get) a (dog|cat|pet)\b/i,
      /\bsub-?let\w*\b/i,
      /\babandon(ed|ment)\b/i,
    ],
  ],
];

const CONFLICT_TAGS: Partial<Record<ConflictKind, SituationTag[]>> = {
  spend_limit: ['landlord_approval', 'quote_invoice'],
  amount: ['quote_invoice'],
  company: ['quote_invoice'],
  gate_order: ['landlord_approval'],
  name: ['identity_privacy'],
  address: ['identity_privacy'],
  crm_vs_history: ['identity_privacy'],
};

function walkJson(v: unknown, key: string | undefined, out: string[], facts: CrmFacts): void {
  if (typeof v === 'string') {
    if (key && NARRATIVE_KEYS.test(key)) out.push(v);
  } else if (typeof v === 'number') {
    if (key && /spend_limit/i.test(key)) facts.spendLimits.push(v);
    if (key && /^(balance_gbp|arrears_gbp|amount_owed_gbp)$/i.test(key) && v > 0) facts.arrears = true;
  } else if (typeof v === 'boolean') {
    if (key === 'vulnerable' && v) facts.vulnerable = true;
    if (key === 'tenanted' && !v) facts.void = true;
  } else if (Array.isArray(v)) {
    for (const x of v) walkJson(x, key, out, facts);
  } else if (v && typeof v === 'object') {
    for (const [k, x] of Object.entries(v)) {
      if (k === 'arrears' && x && typeof x === 'object' && Object.values(x).some((n) => typeof n === 'number' && n > 0)) facts.arrears = true;
      walkJson(x, k, out, facts);
    }
  }
}

interface CrmFacts {
  vulnerable: boolean;
  arrears: boolean;
  void: boolean;
  spendLimits: number[];
}

/** What people wrote (brief, messages, transcripts, notes, ticket descriptions), plus the structured CRM facts. */
export function caseText(b: CaseBundle): { text: string; facts: CrmFacts } {
  const facts: CrmFacts = { vulnerable: false, arrears: false, void: false, spendLimits: [] };
  const parts: string[] = [b.brief];
  for (const d of b.documents ?? []) {
    if (d.kind === 'json' || d.path.endsWith('.json')) {
      try {
        walkJson(JSON.parse(d.text), undefined, parts, facts);
      } catch {
        parts.push(d.text);
      }
    } else parts.push(d.text);
  }
  for (const e of b.events ?? []) parts.push(e.text);
  for (const t of b.seedTickets ?? []) walkJson(t, undefined, parts, facts);
  return { text: parts.join('\n'), facts };
}

/** Hour and weekday of the case's "now" on UK wall-clock time, when the case states one. */
export function caseClock(b: CaseBundle, brief?: CaseBrief): { hour: number; weekday: number } | undefined {
  const raw = b.now ?? brief?.now ?? b.brief.match(/\bToday:?\**:?\s*([^\n]+)/i)?.[1];
  const m = raw?.match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}))?/);
  if (!raw || !m || m[4] === undefined) return undefined;
  const [y, mo, d, h, mi] = m.slice(1).map(Number);
  const from = raw.slice(m.index!);
  const iso = from.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})/)?.[0];
  const utc = iso ? new Date(iso) : /^(:\d{2})?\s*(UTC|GMT)\b/.test(from.slice(m[0].length)) ? new Date(Date.UTC(y, mo - 1, d, h, mi)) : undefined;
  if (!utc) return { hour: h, weekday: new Date(Date.UTC(y, mo - 1, d)).getUTCDay() };
  if (Number.isNaN(utc.getTime())) return undefined;
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', hourCycle: 'h23', weekday: 'short' }).formatToParts(utc).map((p) => [p.type, p.value]),
  );
  return { hour: Number(parts.hour), weekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday) };
}

/** Outside 08:00-18:00, or a Sunday. Saturday daytime is staffed. */
export const outsideOfficeHours = (c: { hour: number; weekday: number }) => c.weekday === 0 || c.hour < 8 || c.hour >= 18;

const amountsNear = (text: string, words: RegExp) =>
  [...text.matchAll(new RegExp(`${words.source}[^£\\n]{0,60}£\\s?([\\d,]+(?:\\.\\d{1,2})?)`, 'gi'))].map((m) => Number(m[m.length - 1].replace(/,/g, '')));

export function classify(b: CaseBundle, brief?: CaseBrief): SituationTag[] {
  const tags = new Set<SituationTag>();
  const { text, facts } = caseText(b);
  for (const [tag, patterns] of RULES) if (patterns.some((p) => p.test(text))) tags.add(tag);

  if (facts.vulnerable) tags.add('vulnerable');
  if (facts.arrears) tags.add('arrears');
  if (facts.void) tags.add('void_keys');
  const limit = facts.spendLimits.length ? Math.min(...facts.spendLimits) : undefined;
  if (limit !== undefined && amountsNear(text, /\b(quot\w*|invoice\w*|total|estimate)/).some((a) => a > limit)) tags.add('landlord_approval');

  if (brief) {
    for (const t of brief.tags ?? []) tags.add(t);
    for (const c of brief.conflicts ?? []) for (const t of CONFLICT_TAGS[c.kind] ?? []) tags.add(t);
    const money = brief.money;
    if (money && (money.quotes.length || money.invoices.length)) tags.add('quote_invoice');
    if (money && (money.approvals.length || money.spendLimit)) tags.add('landlord_approval');
  }

  const clock = caseClock(b, brief);
  if (clock && outsideOfficeHours(clock) && [...EMERGENCY_TAGS, 'access_entry' as const].some((t) => tags.has(t))) tags.add('out_of_hours');

  return [...tags].filter((t) => ALL_TAGS.includes(t)).sort((x, y) => tagRank(x) - tagRank(y));
}
