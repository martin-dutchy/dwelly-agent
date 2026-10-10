// Shared contracts between the harness layers. Frozen after Wave 0 of
// docs/plans/harness-v2-implementation-plan.md: layer owners request changes, the integrator applies them.
import type { FailurePlan } from '../../core/failures.js';
import type { Decision } from '../caseAgent.js';
import type { CaseMedia, ParseInfo } from '../cases.js';
import type { LedgerEntry } from '../ledger.js';
import type { OpsState, Ticket } from '../opsTools.js';
import type { HarnessFlags } from './flags.js';

export type { HarnessFlags };

/** Where a fact came from: "doc:inputs/email_tenant.eml", "ev:27", "crm:property.spend_limit". */
export type SourceId = string;

export type DocKind = 'email' | 'chat' | 'transcript' | 'json' | 'markdown' | 'pdf' | 'image' | 'text' | 'unknown';
export interface CaseDocument {
  id: SourceId;
  /** Path relative to the case folder; the name the agent sees. */
  path: string;
  kind: DocKind;
  text: string;
  parse?: ParseInfo;
  /** Set when the file could not be read reliably, with why. */
  flagged?: string;
}

export type Channel = 'email' | 'sms' | 'whatsapp' | 'call' | 'note' | 'update' | 'hold' | 'other';
export interface TimelineEvent {
  id: SourceId;
  at?: string;
  channel: Channel;
  from?: string;
  to?: string;
  text: string;
  doc: SourceId;
}

export type PartyRole = 'tenant' | 'landlord' | 'provider' | 'agency' | 'other';
export interface Party {
  role: PartyRole;
  name?: string;
  contacts: string[];
  sources: SourceId[];
}

export interface ManifestEntry {
  path: string;
  kind: DocKind;
  parse: string;
  /** False when the file was withheld or could not be shown. */
  included: boolean;
  note?: string;
}

/** One case, whatever folder format it arrived in. Every loader produces this. */
export interface CaseBundle {
  id: string;
  dir: string;
  format: 'practice' | 'organiser' | 'generic';
  /** "Today" for the case, ISO when known. */
  now?: string;
  /** The case brief (case.md / index.md text) the agent reads first. */
  brief: string;
  documents: CaseDocument[];
  events: TimelineEvent[];
  parties: Party[];
  questions: string[];
  seedTickets: Ticket[];
  failures: FailurePlan;
  media: CaseMedia[];
  manifest: ManifestEntry[];
  withheld: { name: string; reason: string }[];
  /** Organiser-format replays only: the hidden ending, never shown to the agent. */
  reference?: string;
  cutoff?: number;
  totalEvents?: number;
  missingAttachments?: string[];
}

export type SituationTag =
  | 'gas'
  | 'co'
  | 'water'
  | 'electrical'
  | 'fire'
  | 'damp_mould'
  | 'out_of_hours'
  | 'landlord_approval'
  | 'quote_invoice'
  | 'contractor_chase'
  | 'closure'
  | 'legal_claim'
  | 'deposit'
  | 'arrears'
  | 'identity_privacy'
  | 'vulnerable'
  | 'void_keys'
  | 'unrelated_issue'
  | 'fraud_injection'
  | 'access_entry'
  | 'compliance'
  | 'tenancy_lifecycle';

export interface Fact {
  id: string;
  kind: string;
  value: string;
  sources: SourceId[];
}
export type ConflictKind = 'address' | 'name' | 'company' | 'amount' | 'spend_limit' | 'date_past' | 'weekday' | 'attachment_missing' | 'gate_order' | 'crm_vs_history' | 'other';
export interface Conflict {
  kind: ConflictKind;
  detail: string;
  sources: SourceId[];
  severity: 'info' | 'warn' | 'block';
}
export interface Deadline {
  what: string;
  due: string;
  basis: 'promised' | 'hold_review' | 'statutory' | 'sla';
  sources: SourceId[];
}
export interface Money {
  quotes: Fact[];
  approvals: Fact[];
  invoices: Fact[];
  spendLimit?: Fact;
}

/** What code can establish about the case before the model reads it. */
export interface CaseBrief {
  now?: string;
  stage?: string;
  parties: Party[];
  facts: Fact[];
  conflicts: Conflict[];
  deadlines: Deadline[];
  money: Money;
  questions: string[];
  tags: SituationTag[];
  /** Derived lines not yet typed (the organiser-format state hints). */
  notes: string[];
}

/** 0 read · 1 internal record · 2 outbound communication · 3 money, legal or closure. */
export type Tier = 0 | 1 | 2 | 3;

export interface GuardContext {
  bundle?: CaseBundle;
  brief?: CaseBrief;
  ledger: readonly LedgerEntry[];
  state: OpsState;
  flags: HarnessFlags;
}
export interface GuardVerdict {
  /** Stable id, e.g. "message.unknown_person". Logged with every block. */
  rule: string;
  /** What is wrong and how to fix it, written to the agent. */
  reason: string;
}
export interface ToolCall {
  tool: string;
  args: Record<string, unknown>;
}
export interface Guard {
  id: string;
  /** Tool names this guard inspects; '*' is every domain tool (never submit_decision). */
  tools: string[] | '*';
  check(call: ToolCall, ctx: GuardContext): GuardVerdict | undefined;
}

export interface CompletionProblem {
  check: string;
  message: string;
}
export interface CompletionCheck {
  id: string;
  check(decision: Partial<Decision>, ctx: GuardContext): CompletionProblem[];
}

export interface Skill {
  id: string;
  title: string;
  tags: SituationTag[];
  whenToUse: string;
  body: string;
  redFlags: string[];
}

export type FailureClass = 'retry' | 'alternative_route' | 'record_and_escalate';

export type Layer = 'ingest' | 'brief' | 'skill' | 'guard' | 'completion' | 'critic' | 'render' | 'model_judgement' | 'unclassified';

/** What the case agent receives from the harness layers. Absent means today's behaviour. */
export interface HarnessRun {
  flags: HarnessFlags;
  bundle?: CaseBundle;
  brief?: CaseBrief;
  skills?: Skill[];
  /** The rendered brief, for the critic. */
  briefText?: string;
}
