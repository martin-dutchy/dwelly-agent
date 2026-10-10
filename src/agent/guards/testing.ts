// Hand-built guard contexts for the guard tests.
import type { CaseBrief, CaseBundle, GuardContext, Party } from '../harness/contracts.js';
import { NO_FLAGS } from '../harness/flags.js';
import type { LedgerEntry } from '../ledger.js';
import type { OpsState } from '../opsTools.js';

export const bundle = (docs: Record<string, string>, over: Partial<CaseBundle> = {}): CaseBundle => ({
  id: 't',
  dir: 'cases/t',
  format: 'practice',
  brief: '# Case t',
  documents: Object.entries(docs).map(([path, text]) => ({ id: `doc:${path}`, path, kind: 'text', text })),
  events: [],
  parties: [],
  questions: [],
  seedTickets: [],
  failures: {},
  media: [],
  manifest: [],
  withheld: [],
  ...over,
});

export const brief = (over: Partial<CaseBrief> = {}): CaseBrief => ({
  parties: [],
  facts: [],
  conflicts: [],
  deadlines: [],
  money: { quotes: [], approvals: [], invoices: [] },
  questions: [],
  tags: [],
  notes: [],
  ...over,
});

export const party = (role: Party['role'], name: string, contacts: string[] = []): Party => ({ role, name, contacts, sources: ['doc:inputs/crm.json'] });

export const entry = (id: string, tool: string, args: Record<string, unknown>, status: LedgerEntry['status'] = 'verified', attempts = 1): LedgerEntry => ({ id, tool, args, key: `${tool}:${id}`, attempts, status, evidence: [] });

export const ctx = (over: Partial<GuardContext> = {}, state: Partial<OpsState> = {}): GuardContext => ({
  ledger: [],
  state: { tickets: [], records: [], properties: [], ...state },
  flags: { ...NO_FLAGS, guardsV2: true },
  ...over,
});
