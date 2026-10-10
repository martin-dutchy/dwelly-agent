import { randomBytes } from 'node:crypto';
import postgres from 'postgres';

/**
 * The operations record: every case the agents work on, everything that happened on it (calls, tool
 * actions, policy blocks, follow-ups, human decisions) and the human tasks waiting on a person.
 * Postgres (Neon) when DATABASE_URL is set; in memory otherwise (tests, offline dev). Each case also keeps
 * its organiser-format index.md and history.md, so the case worker can be re-run from the latest state.
 */

export type CaseStatus = 'queued' | 'agent_working' | 'waiting_on_human' | 'waiting_on_party' | 'closed' | 'failed';
export type OpsCase = {
  id: string;
  title: string;
  property: string | null;
  /** Where the case came from: a voice call, a public example, an imported batch run. */
  source: 'voice' | 'public' | 'practice' | 'batch';
  source_ref: string | null;
  status: CaseStatus;
  index_md: string;
  history_md: string;
  /** Cases in another layout (our practice cases): every file by relative path. Takes precedence over index/history. */
  files?: Record<string, string> | null;
  /** Set when the case belongs to an eval run; such cases stay out of the live decisions inbox. */
  batch_id?: string | null;
  /** The judge's grade for an eval-run case. */
  grade?: CaseGrade | null;
  created_at: string;
  updated_at: string;
};

/** Who did it. `agent` = case worker, `voice_agent` = the phone agent, `human` = a person in this portal. */
export type Actor = 'agent' | 'voice_agent' | 'human' | 'system' | 'tenant' | 'landlord' | 'contractor';
export type EventKind =
  | 'case_opened'
  | 'call'
  | 'action' // a tool call that changed something (verified, failed or unverified)
  | 'message' // a message sent to a party, verbatim
  | 'blocked' // denied by a hard rule or a missing permission
  | 'escalation'
  | 'follow_up' // a dated follow-up or hold the agent set
  | 'decision' // the case worker's decision for a run
  | 'human_task'
  | 'human_decision'
  | 'run_started'
  | 'run_failed';
export type OpsEvent = {
  id?: number;
  case_id: string;
  ts: string;
  kind: EventKind;
  actor: Actor;
  title: string;
  detail: string | null;
  /** 'verified' | 'failed' | 'unverifiable' for actions; 'P1'.. for escalations. */
  status: string | null;
  run_id: string | null;
  data: Record<string, unknown> | null;
};

export type CaseGrade = { score: number; critical: string[]; failed_required: string[]; red_flags: string[]; note: string };
export type Batch = {
  id: string;
  name: string;
  case_set: string;
  total: number;
  /** Where ANSWER.md / REASONING.md / result.json are written for the judge. */
  answers_dir: string;
  cases_dir: string;
  grading: 'not_started' | 'running' | 'done' | 'failed';
  created_at: string;
};

export type TaskContext = {
  case_state?: string;
  known?: string;
  missing?: string;
  missing_info?: string[];
  conflicts?: string[];
  boundaries?: string[];
  remaining_work?: string[];
  /** The agent's next actions in the run that raised the task. */
  next_actions?: { type: string; action: string; recipient: string; channel: string; status: string }[];
  /** Actions denied by policy in that run: what the agent tried and why it was refused. */
  blocked?: { tool: string; reason: string }[];
  /** The latest events from the case history, verbatim, so the person sees what the agent saw. */
  recent_history?: string;
  /** Call summary and transcript excerpt when the case came from a phone call. */
  call?: { summary?: string; transcript?: string };
  deadline?: string;
};
export type HumanTask = {
  id: string;
  case_id: string;
  run_id: string | null;
  status: 'open' | 'resolved';
  priority: string; // P1 | P2 | P3
  team: string;
  question: string;
  recommendation: string | null;
  options: string[];
  context: TaskContext;
  decision: { choice: string; note: string; by: string } | null;
  created_at: string;
  resolved_at: string | null;
};
export type OpsRun = {
  id: string;
  case_id: string;
  trigger: string;
  started_at: string;
  finished_at: string | null;
  outcome: string | null;
  cost: number | null;
  answer_md: string | null;
  reasoning_md: string | null;
};

export interface OpsStore {
  init(): Promise<void>;
  upsertCase(c: Omit<OpsCase, 'created_at' | 'updated_at'>): Promise<OpsCase>;
  getCase(id: string): Promise<OpsCase | undefined>;
  listCases(limit?: number): Promise<OpsCase[]>;
  setStatus(id: string, status: CaseStatus): Promise<void>;
  setHistory(id: string, history_md: string): Promise<void>;
  setFiles(id: string, files: Record<string, string>): Promise<void>;
  setGrade(id: string, grade: CaseGrade): Promise<void>;
  addBatch(b: Omit<Batch, 'created_at'>): Promise<Batch>;
  getBatch(id: string): Promise<Batch | undefined>;
  listBatches(): Promise<Batch[]>;
  setGrading(id: string, grading: Batch['grading']): Promise<void>;
  batchCases(batchId: string): Promise<OpsCase[]>;
  addEvents(events: OpsEvent[]): Promise<void>;
  events(caseId: string): Promise<OpsEvent[]>;
  addTask(t: Omit<HumanTask, 'id' | 'created_at' | 'resolved_at' | 'decision' | 'status'>): Promise<HumanTask>;
  getTask(id: string): Promise<HumanTask | undefined>;
  listTasks(filter?: { status?: HumanTask['status']; caseId?: string }): Promise<HumanTask[]>;
  resolveTask(id: string, decision: NonNullable<HumanTask['decision']>): Promise<HumanTask | undefined>;
  /** Demo reset: reopen a decided task and drop what people did on the case. */
  reopenTask(id: string): Promise<void>;
  deleteHumanEvents(caseId: string): Promise<void>;
  startRun(r: { id: string; case_id: string; trigger: string }): Promise<void>;
  finishRun(id: string, r: Pick<OpsRun, 'outcome' | 'cost' | 'answer_md' | 'reasoning_md'>): Promise<void>;
  runs(caseId: string): Promise<OpsRun[]>;
  getRun(id: string): Promise<OpsRun | undefined>;
}

export const newId = (prefix: string) => `${prefix}_${randomBytes(6).toString('base64url')}`;
const now = () => new Date().toISOString();

export function memoryOpsStore(): OpsStore {
  const cases = new Map<string, OpsCase>();
  const events: OpsEvent[] = [];
  const tasks = new Map<string, HumanTask>();
  const runs = new Map<string, OpsRun>();
  const batches = new Map<string, Batch>();
  let seq = 0;
  const touch = (id: string) => {
    const c = cases.get(id);
    if (c) c.updated_at = now();
  };
  return {
    init: async () => {},
    async upsertCase(c) {
      const prev = cases.get(c.id);
      const row = { ...c, created_at: prev?.created_at ?? now(), updated_at: now() };
      cases.set(c.id, row);
      return row;
    },
    getCase: async (id) => cases.get(id),
    listCases: async (limit = 200) =>
      [...cases.values()]
        .filter((c) => !c.batch_id)
        .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
        .slice(0, limit),
    async setStatus(id, status) {
      const c = cases.get(id);
      if (c) Object.assign(c, { status, updated_at: now() });
    },
    async setHistory(id, history_md) {
      const c = cases.get(id);
      if (c) Object.assign(c, { history_md, updated_at: now() });
    },
    async setFiles(id, files) {
      const c = cases.get(id);
      if (c) Object.assign(c, { files, updated_at: now() });
    },
    async setGrade(id, grade) {
      const c = cases.get(id);
      if (c) c.grade = grade;
    },
    async addBatch(b) {
      const row = { ...b, created_at: now() };
      batches.set(b.id, row);
      return row;
    },
    getBatch: async (id) => batches.get(id),
    listBatches: async () => [...batches.values()].sort((a, b) => b.created_at.localeCompare(a.created_at)),
    async setGrading(id, grading) {
      const b = batches.get(id);
      if (b) b.grading = grading;
    },
    batchCases: async (batchId) => [...cases.values()].filter((c) => c.batch_id === batchId).sort((a, b) => a.id.localeCompare(b.id)),
    async addEvents(es) {
      for (const e of es) events.push({ ...e, id: ++seq });
      for (const id of new Set(es.map((e) => e.case_id))) touch(id);
    },
    events: async (caseId) => events.filter((e) => e.case_id === caseId).sort((a, b) => a.ts.localeCompare(b.ts) || a.id! - b.id!),
    async addTask(t) {
      const task: HumanTask = { ...t, id: newId('task'), status: 'open', decision: null, created_at: now(), resolved_at: null };
      tasks.set(task.id, task);
      touch(t.case_id);
      return task;
    },
    getTask: async (id) => tasks.get(id),
    listTasks: async (f = {}) =>
      [...tasks.values()]
        .filter((t) => (!f.status || t.status === f.status) && (!f.caseId || t.case_id === f.caseId))
        .sort((a, b) => a.priority.localeCompare(b.priority) || b.created_at.localeCompare(a.created_at)),
    async resolveTask(id, decision) {
      const t = tasks.get(id);
      if (!t || t.status !== 'open') return undefined;
      Object.assign(t, { status: 'resolved', decision, resolved_at: now() });
      touch(t.case_id);
      return t;
    },
    async reopenTask(id) {
      const t = tasks.get(id);
      if (t) Object.assign(t, { status: 'open', decision: null, resolved_at: null });
    },
    async deleteHumanEvents(caseId) {
      for (let k = events.length - 1; k >= 0; k--) if (events[k].case_id === caseId && events[k].actor === 'human') events.splice(k, 1);
    },
    async startRun({ id, case_id, trigger }) {
      runs.set(id, { id, case_id, trigger, started_at: now(), finished_at: null, outcome: null, cost: null, answer_md: null, reasoning_md: null });
    },
    async finishRun(id, r) {
      const run = runs.get(id);
      if (run) Object.assign(run, r, { finished_at: now() });
    },
    runs: async (caseId) => [...runs.values()].filter((r) => r.case_id === caseId).sort((a, b) => b.started_at.localeCompare(a.started_at)),
    getRun: async (id) => runs.get(id),
  };
}

const SCHEMA = [
  `create table if not exists ops_cases (
    id text primary key, title text not null, property text, source text not null, source_ref text,
    status text not null, index_md text not null, history_md text not null,
    created_at timestamptz not null default now(), updated_at timestamptz not null default now())`,
  `alter table ops_cases add column if not exists files jsonb`,
  `alter table ops_cases add column if not exists batch_id text`,
  `alter table ops_cases add column if not exists grade jsonb`,
  `create index if not exists ops_cases_batch_idx on ops_cases (batch_id)`,
  `create table if not exists ops_batches (
    id text primary key, name text not null, case_set text not null, total int not null, answers_dir text not null,
    cases_dir text not null, grading text not null default 'not_started', created_at timestamptz not null default now())`,
  `create table if not exists ops_events (
    id bigserial primary key, case_id text not null, ts timestamptz not null, kind text not null, actor text not null,
    title text not null, detail text, status text, run_id text, data jsonb)`,
  `create index if not exists ops_events_case_idx on ops_events (case_id, ts, id)`,
  `create table if not exists ops_tasks (
    id text primary key, case_id text not null, run_id text, status text not null, priority text not null, team text not null,
    question text not null, recommendation text, options jsonb not null, context jsonb not null, decision jsonb,
    created_at timestamptz not null default now(), resolved_at timestamptz)`,
  `create index if not exists ops_tasks_status_idx on ops_tasks (status, priority, created_at)`,
  `create table if not exists ops_runs (
    id text primary key, case_id text not null, trigger text not null, started_at timestamptz not null default now(),
    finished_at timestamptz, outcome text, cost double precision, answer_md text, reasoning_md text)`,
];

export function pgOpsStore(url: string): OpsStore {
  const sql = postgres(url, { max: 5, idle_timeout: 30, onnotice: () => {} });
  const iso = (v: unknown) => (v instanceof Date ? v.toISOString() : (v as string | null));
  const dates = <T>(r: Record<string, unknown>, keys: string[]) => ({ ...r, ...Object.fromEntries(keys.map((k) => [k, iso(r[k])])) }) as T;
  const json = (v: unknown) => (v === null || v === undefined ? null : sql.json(v as never));
  const caseRow = (r: Record<string, unknown>) => dates<OpsCase>(r, ['created_at', 'updated_at']);
  const taskRow = (r: Record<string, unknown>) => dates<HumanTask>(r, ['created_at', 'resolved_at']);
  const runRow = (r: Record<string, unknown>) => dates<OpsRun>(r, ['started_at', 'finished_at']);
  return {
    async init() {
      for (const s of SCHEMA) await sql.unsafe(s);
    },
    async upsertCase(c) {
      const [r] = await sql`insert into ops_cases (id, title, property, source, source_ref, status, index_md, history_md, files, batch_id)
        values (${c.id}, ${c.title}, ${c.property}, ${c.source}, ${c.source_ref}, ${c.status}, ${c.index_md}, ${c.history_md}, ${json(c.files ?? null)}, ${c.batch_id ?? null})
        on conflict (id) do update set title = excluded.title, property = excluded.property, status = excluded.status,
          index_md = excluded.index_md, history_md = excluded.history_md, files = excluded.files, updated_at = now()
        returning *`;
      return caseRow(r);
    },
    getCase: async (id) => {
      const [r] = await sql`select * from ops_cases where id = ${id}`;
      return r ? caseRow(r) : undefined;
    },
    listCases: async (limit = 200) => (await sql`select * from ops_cases where batch_id is null order by updated_at desc limit ${limit}`).map(caseRow),
    async setStatus(id, status) {
      await sql`update ops_cases set status = ${status}, updated_at = now() where id = ${id}`;
    },
    async setHistory(id, history_md) {
      await sql`update ops_cases set history_md = ${history_md}, updated_at = now() where id = ${id}`;
    },
    async setFiles(id, files) {
      await sql`update ops_cases set files = ${json(files)}, updated_at = now() where id = ${id}`;
    },
    async setGrade(id, grade) {
      await sql`update ops_cases set grade = ${json(grade)} where id = ${id}`;
    },
    async addBatch(b) {
      const [r] = await sql`insert into ops_batches (id, name, case_set, total, answers_dir, cases_dir, grading)
        values (${b.id}, ${b.name}, ${b.case_set}, ${b.total}, ${b.answers_dir}, ${b.cases_dir}, ${b.grading}) returning *`;
      return dates<Batch>(r, ['created_at']);
    },
    getBatch: async (id) => {
      const [r] = await sql`select * from ops_batches where id = ${id}`;
      return r ? dates<Batch>(r, ['created_at']) : undefined;
    },
    listBatches: async () => (await sql`select * from ops_batches order by created_at desc`).map((r) => dates<Batch>(r, ['created_at'])),
    async setGrading(id, grading) {
      await sql`update ops_batches set grading = ${grading} where id = ${id}`;
    },
    batchCases: async (batchId) => (await sql`select * from ops_cases where batch_id = ${batchId} order by id`).map(caseRow),
    async addEvents(es) {
      for (const e of es)
        await sql`insert into ops_events (case_id, ts, kind, actor, title, detail, status, run_id, data)
          values (${e.case_id}, ${e.ts}, ${e.kind}, ${e.actor}, ${e.title}, ${e.detail}, ${e.status}, ${e.run_id}, ${json(e.data)})`;
      for (const id of new Set(es.map((e) => e.case_id))) await sql`update ops_cases set updated_at = now() where id = ${id}`;
    },
    events: async (caseId) => (await sql`select * from ops_events where case_id = ${caseId} order by ts, id`).map((r) => dates<OpsEvent>(r, ['ts'])),
    async addTask(t) {
      const [r] = await sql`insert into ops_tasks (id, case_id, run_id, status, priority, team, question, recommendation, options, context)
        values (${newId('task')}, ${t.case_id}, ${t.run_id}, 'open', ${t.priority}, ${t.team}, ${t.question}, ${t.recommendation}, ${json(t.options)}, ${json(t.context)})
        returning *`;
      await sql`update ops_cases set updated_at = now() where id = ${t.case_id}`;
      return taskRow(r);
    },
    getTask: async (id) => {
      const [r] = await sql`select * from ops_tasks where id = ${id}`;
      return r ? taskRow(r) : undefined;
    },
    listTasks: async (f = {}) =>
      (
        await sql`select * from ops_tasks where (${f.status ?? null}::text is null or status = ${f.status ?? null})
          and (${f.caseId ?? null}::text is null or case_id = ${f.caseId ?? null}) order by priority, created_at desc`
      ).map(taskRow),
    async resolveTask(id, decision) {
      const [r] = await sql`update ops_tasks set status = 'resolved', decision = ${json(decision)}, resolved_at = now()
        where id = ${id} and status = 'open' returning *`;
      return r ? taskRow(r) : undefined;
    },
    async reopenTask(id) {
      await sql`update ops_tasks set status = 'open', decision = null, resolved_at = null where id = ${id}`;
    },
    async deleteHumanEvents(caseId) {
      await sql`delete from ops_events where case_id = ${caseId} and actor = 'human'`;
    },
    async startRun({ id, case_id, trigger }) {
      await sql`insert into ops_runs (id, case_id, trigger) values (${id}, ${case_id}, ${trigger})`;
    },
    async finishRun(id, r) {
      await sql`update ops_runs set outcome = ${r.outcome}, cost = ${r.cost}, answer_md = ${r.answer_md}, reasoning_md = ${r.reasoning_md}, finished_at = now() where id = ${id}`;
    },
    runs: async (caseId) => (await sql`select * from ops_runs where case_id = ${caseId} order by started_at desc`).map(runRow),
    getRun: async (id) => {
      const [r] = await sql`select * from ops_runs where id = ${id}`;
      return r ? runRow(r) : undefined;
    },
  };
}

export const createOpsStore = (url = process.env.DATABASE_URL) => (url ? pgOpsStore(url) : memoryOpsStore());
