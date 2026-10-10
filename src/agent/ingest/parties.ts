// Who is in the case: CRM records first, then everyone who sent or received a message, each with sources.
import { basename } from 'node:path';
import type { Party, PartyRole, SourceId, TimelineEvent } from '../harness/contracts.js';
import { mailbox } from './eml.js';

const MAX_SOURCES = 12;
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '');
const words = (s: string) => s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
/** UK numbers compare on digits with the leading 0 as 44. */
const phone = (s: string) => s.replace(/[^\d]/g, '').replace(/^0(?=\d{9,10}$)/, '44');
const contactKey = (c: string) => (c.includes('@') ? c.toLowerCase() : phone(c));

const ROLE_WORD: [RegExp, PartyRole][] = [
  [/^(the )?tenants?$/i, 'tenant'],
  [/^(the )?landlords?$/i, 'landlord'],
  [/^(the )?(contractor|maintenance provider|provider|engineer|tradesperson)s?$/i, 'provider'],
  [/^(agency|agency \/ system|internal|staff)$/i, 'agency'],
];
const GENERIC = /^(caller|system|unknown|not specified|unspecified|n\/a|none|user|customer|bot)$/i;
const AGENCY = /lettings|letting agent|\bagency\b|^agent\b|maintenance desk|out-of-hours|ai phone line|property management|operator|\bdesk\b/i;

type Entry = Party & { aliases: string[] };

export class PartyBook {
  private entries: Entry[] = [];

  get parties(): Party[] {
    return this.entries.map(({ aliases: _, ...p }) => p);
  }

  private find(role: PartyRole | undefined, names: string[], contacts: string[]): Entry | undefined {
    // One agency per case, however it signs itself.
    if (role === 'agency') return this.entries.find((e) => e.role === 'agency');
    if (role && !names.length && !contacts.length) {
      const same = this.entries.filter((e) => e.role === role);
      return same.length === 1 ? same[0] : same.find((e) => !e.name);
    }
    const keys = new Set(contacts.map(contactKey).filter(Boolean));
    const byContact = this.entries.find((e) => e.contacts.some((c) => keys.has(contactKey(c))));
    if (byContact) return byContact;
    const ns = names.map(norm).filter((n) => n.length > 1);
    const byName = this.entries.find((e) => e.aliases.some((a) => ns.includes(a)));
    if (byName) return byName;
    // "Kieran" or "Ben Hartley" for "Benjamin Hartley": a unique party sharing every word but the first name.
    const partial = this.entries.filter((e) =>
      names.some((n) => {
        const w = words(n);
        return e.name && w.length > 0 && (w.length === 1 ? words(e.name)[0] === w[0] : w.slice(1).join(' ') === words(e.name).slice(1).join(' ') && words(e.name)[0].startsWith(w[0].slice(0, 3)));
      }),
    );
    if (partial.length === 1) return partial[0];
    // office@capitalboilerfix.example belongs to "Capital Boiler Fix".
    const domains = contacts.filter((c) => c.includes('@')).map((c) => c.split('@')[1].split('.')[0].toLowerCase());
    const byDomain = this.entries.filter((e) => e.name && norm(e.name).length > 3 && domains.some((d) => d.length > 3 && (d.includes(norm(e.name!)) || norm(e.name!).includes(d))));
    return byDomain.length === 1 ? byDomain[0] : undefined;
  }

  add(role: PartyRole, names: (string | undefined)[], contacts: (string | undefined)[], source: SourceId, opts: { create?: boolean; keepRole?: boolean } = {}): Party | undefined {
    const ns = [...new Set(names.filter((n): n is string => !!n?.trim()).map((n) => n.trim()))];
    const cs = [...new Set(contacts.filter((c): c is string => !!c?.trim()).map((c) => c.trim()))];
    let e = this.find(role, ns, cs);
    if (!e) {
      if (opts.create === false) return undefined;
      e = { role, name: ns[0], contacts: [], sources: [], aliases: [] };
      this.entries.push(e);
    }
    if (!opts.keepRole && e.role === 'other' && role !== 'other') e.role = role;
    if (!e.name && ns[0]) e.name = ns[0];
    for (const n of ns) if (!e.aliases.includes(norm(n))) e.aliases.push(norm(n));
    for (const c of cs) if (!e.contacts.some((x) => contactKey(x) === contactKey(c))) e.contacts.push(c);
    if (!e.sources.includes(source) && e.sources.length < MAX_SOURCES) e.sources.push(source);
    return e;
  }
}

// ---- CRM records -------------------------------------------------------------------------------------

const ROLE_KEY: [RegExp, PartyRole][] = [
  [/^(tenants?|joint_tenants|occupier)$/i, 'tenant'],
  [/^landlords?$/i, 'landlord'],
  [/^(contractors?|providers?|suppliers?|engineers?)$/i, 'provider'],
  [/^agency$/i, 'agency'],
  [/^(guarantors?|household|occupants?|authorised_contacts|authorized_contacts|previous_tenants?|emergency_contacts?|next_of_kin)$/i, 'other'],
];
const roleOfKey = (k: string) => ROLE_KEY.find(([re]) => re.test(k))?.[1];
const CONTACT_KEY = /phone|mobile|email|whatsapp|^tel/i;
const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);

/** The case's own CRM export. Other JSON records (an identity-check lookup, a previous tenant) are parties of role "other". */
export const isPrimaryCrm = (path: string) => /^crm\b.*\.json$/i.test(basename(path)) && !/record|lookup|search/i.test(basename(path));

export function addCrmParties(book: PartyBook, json: unknown, source: SourceId, primary: boolean, depth = 0) {
  if (!isObj(json) || depth > 2) return;
  for (const [k, v] of Object.entries(json)) {
    const role = roleOfKey(k);
    if (!role) continue;
    for (const item of Array.isArray(v) ? v : [v]) {
      const r: PartyRole = primary ? role : 'other';
      if (typeof item === 'string' && item.trim()) book.add(r, [item], [], source, { keepRole: !primary });
      if (!isObj(item)) continue;
      const names = [item.full_name, item.name, item.contact_name, item.company].filter((n): n is string => typeof n === 'string');
      const preferred = typeof item.preferred_name === 'string' && names[0] ? [`${item.preferred_name} ${names[0].split(' ').slice(1).join(' ')}`.trim(), item.preferred_name] : [];
      const contacts = Object.entries(item)
        .filter(([ck, cv]) => CONTACT_KEY.test(ck) && typeof cv === 'string')
        .map(([, cv]) => cv as string);
      if (names.length || contacts.length) book.add(r, [...names, ...preferred], contacts, source, { keepRole: !primary });
      addCrmParties(book, item, source, primary, depth + 1);
    }
  }
}

// ---- labelled lines in notes ("Landlord: Peter Osei, peter@x.example, 07700 900455") ----------------

const LABELLED = /^\s*(?:[-*]\s*)?(?:\*\*)?(tenant|landlord|contractor|provider|engineer|guarantor)(?: name)?(?:\*\*)?\s*[:–-]\s*(?:\*\*)?([A-Z][\w'.-]+(?: [A-Z][\w'.-]+){0,3})(.*)$/i;
const LABEL_ROLE: Record<string, PartyRole> = { tenant: 'tenant', landlord: 'landlord', contractor: 'provider', provider: 'provider', engineer: 'provider', guarantor: 'other' };

export function addLabelledParties(book: PartyBook, text: string, source: SourceId) {
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(LABELLED);
    if (!m) continue;
    const contacts = [...m[3].matchAll(/[\w.+-]+@[\w.-]+\.\w+|\+?\d[\d ]{8,}\d/g)].map((c) => c[0]);
    book.add(LABEL_ROLE[m[1].toLowerCase()], [m[2]], contacts, source);
  }
}

// ---- senders and recipients --------------------------------------------------------------------------

/** "Kieran Doyle <office@x.example>", "Amelia Clarke (T-1001)", "+447700900101", "Tenant". */
function who(s: string): { role?: PartyRole; names: string[]; contacts: string[]; agency: boolean } | undefined {
  const t = s.trim();
  if (!t || GENERIC.test(t)) return undefined;
  for (const [re, role] of ROLE_WORD) if (re.test(t)) return { role, names: [], contacts: [], agency: role === 'agency' };
  const mb = mailbox(t);
  const name = mb.name?.replace(/\s*\([^)]*\)\s*$/, '').trim();
  const isPhone = !!name && /^\+?[\d ()-]{7,}$/.test(name);
  const agency = AGENCY.test(t);
  return {
    names: name && !isPhone && !GENERIC.test(name) && !(agency && /^agent\b/i.test(name)) ? [name] : [],
    contacts: [mb.address, isPhone ? name : undefined].filter((c): c is string => !!c),
    agency,
  };
}

export function addEventParties(book: PartyBook, events: TimelineEvent[]) {
  for (const ev of events) {
    for (const raw of [ev.from, ev.to]) {
      for (const one of (raw ?? '').split(/,(?![^<]*>)|;/)) {
        const w = who(one);
        if (!w) continue;
        const role: PartyRole = w.role ?? (w.agency ? 'agency' : 'other');
        if (!w.names.length && !w.contacts.length) book.add(role, [], [], ev.id);
        else book.add(role, w.names, w.contacts, ev.id);
      }
    }
  }
}
