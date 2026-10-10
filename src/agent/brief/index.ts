// Brief: facts, conflicts, deadlines and money computed from the bundle before the model reads it.
// Every item cites SourceIds that resolve to a document or event of the bundle; anything that cannot is dropped.
import { parseQuestions } from '../decisionPoints.js';
import type { CaseBrief, CaseBundle, Conflict, Deadline, Fact, Money, Party, SourceId } from '../harness/contracts.js';
import { detectConflicts } from './conflicts.js';
import { computeDeadlines, partyText } from './deadlines.js';
import { type Amount, type Model, buildModel, companyKey, gbp, mergeAmounts, nameOverlap, safeBundle, sameName, short, uniq } from './model.js';
import { type OrganiserPart, organiserBrief } from './organiser.js';

export { MAX_BRIEF_CHARS, renderBrief } from './render.js';

const HAZARD =
  /smell(s|ing)? (of )?gas|gas (smell|leak)|rotten eggs?|eggy|carbon monoxide|\bco alarm|leak\w*|water (is )?(coming|pouring|dripping|leaking)|flood\w*|burst|sparking|burning smell|smoke|no (heating|hot water|power|electricity)|hot water (is )?off|\bmou?ld|\bdamp\b|locked out|snapped|break-?in|broken (window|lock|door)|sewage|ceiling/i;

function toParty(p: Model['people'][number]): Party {
  return { role: p.role, name: p.preferred && p.name ? `${p.name} (${p.preferred})` : p.name, contacts: uniq([...p.phones, ...p.emails]), sources: p.sources };
}

function mergeParties(lists: Party[][]): Party[] {
  const out: Party[] = [];
  for (const p of lists.flat()) {
    const same = out.find((o) =>
      o.role === p.role && (p.name && o.name ? sameName(o.name.replace(/\s*\(.*\)$/, ''), p.name.replace(/\s*\(.*\)$/, '')) && nameOverlap(o.name, p.name) : p.contacts.some((c) => o.contacts.includes(c))),
    );
    if (!same) out.push({ ...p, contacts: [...p.contacts], sources: [...p.sources] });
    else {
      if (!same.name || (p.name && p.name.length > same.name.length && !same.name.includes('('))) same.name = p.name ?? same.name;
      same.contacts = uniq([...same.contacts, ...p.contacts]);
      same.sources = uniq([...same.sources, ...p.sources]);
    }
  }
  return out;
}

function partiesFrom(m: Model): Party[] {
  const crm = m.people.filter((p) => p.crm);
  const out: Party[] = crm.map(toParty);
  const agency = uniq(m.emails.flatMap((e) => (e.to ?? '').toLowerCase().match(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g) ?? []));
  if (agency.length) out.push({ role: 'agency', contacts: agency, sources: m.emails.filter((e) => agency.some((a) => (e.to ?? '').toLowerCase().includes(a))).map((e) => e.doc.id) });
  for (const e of m.emails) {
    if (!e.fromAddr || agency.includes(e.fromAddr)) continue;
    const owner = crm.find((p) => p.emails.includes(e.fromAddr!));
    if (owner) {
      out.push({ ...toParty(owner), sources: [e.doc.id] });
      continue;
    }
    const lookalike = crm.find((p) => e.fromName && nameOverlap(p.name, e.fromName));
    const host = (e.fromAddr.split('@')[1] ?? '').replace(/[^a-z0-9]/g, '');
    const provider = crm.find((p) => p.role === 'provider' && p.name && companyKey(p.name).replace(/ /g, '').length > 3 && host.includes(companyKey(p.name).replace(/ /g, '')));
    const signed = e.body.split('\n').map((l) => l.trim()).filter(Boolean).slice(-3);
    const company = provider ?? crm.find((p) => p.role === 'provider' && p.name && signed.some((l) => sameName(l, p.name) && nameOverlap(l, p.name)));
    out.push({
      role: lookalike ? 'other' : company ? 'provider' : 'other',
      name: lookalike ? `${e.fromName} (sender not matching the records)` : e.fromName ?? company?.name,
      contacts: [e.fromAddr],
      sources: [e.doc.id],
    });
  }
  for (const d of m.docs) {
    for (const line of d.text.split('\n')) {
      const caller = /\bCALLER\b/.test(line) ? line.match(/\b(?:I'm|I am|this is|my name is|it's|it is)\s+([A-Z][a-z'-]+(?:\s+[A-Z][a-z'-]+){1,2})\b/)?.[1] : undefined;
      const speaker = line.match(/^\s*\[[^\]]+\]\s*([A-Z][a-z'-]+(?:\s+[A-Z][a-z'-]+){1,2}):/)?.[1];
      const who = caller ?? speaker;
      if (!who || /lettings|agency|\bco\b/i.test(who)) continue;
      const match = crm.find((p) => nameOverlap(p.name, who) && sameName(p.name, who));
      out.push(match ? { ...toParty(match), sources: [d.id] } : { role: 'other', name: who, contacts: [], sources: [d.id] });
    }
  }
  return out;
}

const amountFact = (a: Amount): Fact => ({ id: '', kind: a.kind, value: `${gbp(a.amount)}: ${a.label}${a.date ? `, dated ${a.date}` : ''}${a.job ? `, job ${a.job}` : ''}`, sources: a.sources });

function factsFrom(m: Model): Fact[] {
  const facts: Fact[] = [];
  const seenProp = new Set<string>();
  for (const p of m.properties) if (!seenProp.has(p.address)) seenProp.add(p.address), facts.push({ id: '', kind: 'property', value: `${p.address}${p.id ? ` (${p.id})` : ''}`, sources: p.sources });
  for (const j of m.jobs) {
    const open = !/closed|complete|cancel|resolved/i.test(`${j.stage ?? ''} ${j.status ?? ''}`);
    facts.push({
      id: '',
      kind: open ? 'open_job' : 'closed_job',
      value: [`${j.ref}${j.category ? ` ${j.category}` : ''}${j.urgency ? ` (${j.urgency})` : ''}`, j.stage && `stage ${j.stage}`, j.description, j.assigned ? `assigned ${j.assigned}` : 'no contractor assigned', j.visitDate && `visit ${j.visitDate}`, j.created && `created ${j.created}`].filter(Boolean).join('; '),
      sources: j.sources,
    });
  }
  for (const e of m.escalations) facts.push({ id: '', kind: 'escalation', value: [e.ref, e.priority, e.status, e.reason].filter(Boolean).join('; '), sources: e.sources });
  for (const n of m.notes) facts.push({ id: '', kind: n.kind, value: n.value, sources: n.sources });
  for (const x of m.dated) if (!/expir|review|follow|hold/i.test(x.key)) facts.push({ id: '', kind: 'scheduled', value: `${x.what} on ${x.date}`, sources: x.sources });
  let issues = 0;
  for (const t of partyText(m)) {
    for (const s of t.text.split(/(?<=[.!?])\s+|\n/)) {
      if (issues >= 5 || !HAZARD.test(s)) continue;
      const said = short(s.replace(/^\s*\[[^\]]*\]\s*/, ''), 160);
      if (facts.some((f) => f.kind === 'reported_issue' && f.value === said)) continue;
      facts.push({ id: '', kind: 'reported_issue', value: said, sources: t.sources });
      issues++;
    }
  }
  for (const e of m.emails) facts.push({ id: '', kind: 'email', value: `${e.date ?? 'undated'} from ${e.fromName ? `${e.fromName} ` : ''}<${e.fromAddr ?? '?'}>${e.replyTo ? ` (Reply-To ${e.replyTo})` : ''}: ${e.subject ?? '(no subject)'}`, sources: [e.doc.id] });
  return facts;
}

function stageFrom(m: Model, org?: OrganiserPart): string | undefined {
  if (org?.stage) return org.stage;
  const open = m.jobs.filter((j) => j.stage && !/closed|complete|cancel/i.test(`${j.stage} ${j.status ?? ''}`));
  return open.length ? open.map((j) => `job ${j.ref} at stage "${j.stage}"`).join('; ') : undefined;
}

/** Keeps only sources that resolve in the bundle; drops items left with none. */
function resolve(b: CaseBundle, brief: CaseBrief): CaseBrief {
  const known = new Set<SourceId>([...b.documents.map((d) => d.id), ...b.events.map((e) => e.id)]);
  const keep = <T extends { sources: SourceId[] }>(xs: T[]) => xs.map((x) => ({ ...x, sources: uniq(x.sources.filter((s) => known.has(s))) })).filter((x) => x.sources.length);
  const facts = keep(brief.facts).map((f, i) => ({ ...f, id: `${f.kind}:${i + 1}` }));
  const money: Money = {
    quotes: keep(brief.money.quotes).map((f, i) => ({ ...f, id: `quote:${i + 1}` })),
    approvals: keep(brief.money.approvals).map((f, i) => ({ ...f, id: `approval:${i + 1}` })),
    invoices: keep(brief.money.invoices).map((f, i) => ({ ...f, id: `invoice:${i + 1}` })),
    ...(brief.money.spendLimit && keep([brief.money.spendLimit]).length ? { spendLimit: keep([brief.money.spendLimit])[0] } : {}),
  };
  return { ...brief, parties: keep(brief.parties), facts, conflicts: keep(brief.conflicts), deadlines: keep(brief.deadlines), money };
}

const errorText = (e: unknown) => (e instanceof Error ? e.message : String(e));

export function compileBrief(input: CaseBundle): CaseBrief {
  const errors: string[] = [];
  const step = <T>(name: string, fn: () => T, fallback: T): T => {
    try {
      return fn();
    } catch (e) {
      errors.push(`${name}: ${errorText(e)}`);
      return fallback;
    }
  };
  const b = safeBundle(input);
  const questions = b.questions.length ? b.questions : step('questions', () => parseQuestions(b.brief), []);
  const m = step('model', () => buildModel(b), { b, docs: b.documents, people: [], jobs: [], escalations: [], emails: [], amounts: [], properties: [], dated: [], notes: [] } as Model);
  const org = step('organiser', () => (b.format === 'organiser' || b.documents.some((d) => /(^|\/)history\.md$/i.test(d.path)) ? organiserBrief(b) : undefined), undefined);
  m.amounts = step('money', () => mergeAmounts([...m.amounts, ...(org?.amounts ?? [])]), m.amounts);
  const amounts = m.amounts;
  const conflicts: Conflict[] = [...detectConflicts(m, errors), ...(org?.conflicts ?? [])];
  const deadlines: Deadline[] = [...step('deadlines', () => computeDeadlines(m, org?.texts ?? []), []), ...(org?.deadlines ?? [])];
  const parties = step('parties', () => mergeParties([b.parties, partiesFrom(m), org?.parties ?? []]), b.parties);
  const facts = [...step('facts', () => factsFrom(m), []), ...(org?.facts ?? [])];
  const brief: CaseBrief = {
    now: m.now ?? b.now,
    stage: stageFrom(m, org),
    parties,
    facts,
    conflicts,
    deadlines: deadlines.sort((x, y) => x.due.localeCompare(y.due)),
    money: {
      quotes: amounts.filter((a) => a.kind === 'quote').map(amountFact),
      approvals: [...amounts.filter((a) => a.kind === 'approval').map(amountFact), ...(org?.approvals ?? [])],
      invoices: amounts.filter((a) => a.kind === 'invoice').map(amountFact),
      ...(m.spendLimit && { spendLimit: { id: 'spend_limit', kind: 'spend_limit', value: `${gbp(m.spendLimit.amount)}${m.spendLimit.who ? ` (${m.spendLimit.who})` : ''}`, sources: m.spendLimit.sources } }),
    },
    questions,
    tags: [],
    notes: [...(org?.notes ?? []), ...(errors.length ? [`- Some derived checks did not run (${errors.map((e) => short(e, 80)).join('; ')}); read the files directly for those.`] : [])],
  };
  return resolve(b, brief);
}
