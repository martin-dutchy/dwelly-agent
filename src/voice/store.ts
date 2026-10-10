import { randomBytes } from 'node:crypto';
import postgres from 'postgres';

/**
 * Durable record of the voice test programme: who was invited, which calls they made, every tool
 * event, and the grade. Postgres (Neon) when DATABASE_URL is set; in memory otherwise (tests, offline dev).
 * Audio and ElevenLabs' own transcript stay in ElevenLabs; we keep a copy of the transcript for grading.
 */

export type Tester = {
  id: string;
  name: string;
  token: string;
  daily_cap: number;
  revoked: boolean;
  created_at: string;
  /** E.164 number to ring when they press "Call me now"; null = browser calls only. */
  phone: string | null;
  /** Fixed case for this person; null = rotate through the scenarios. */
  scenario_id: string | null;
};
export type NewTester = { name: string; dailyCap: number; phone?: string | null; scenarioId?: string | null };
export type CallRow = {
  conversation_id: string;
  tester_id: string | null;
  tester_name?: string | null;
  scenario_id: string;
  brain: string;
  status: 'live' | 'ended' | 'graded' | 'failed';
  started_at: string;
  ended_at: string | null;
  duration_secs: number | null;
  passed: boolean | null;
  grade: { label: string; pass: boolean }[] | null;
  flags: string[] | null;
  transcript: { role: string; message: string | null; time_in_call_secs?: number; interrupted?: boolean }[] | null;
  analysis: Record<string, unknown> | null;
  /** What the volunteer said afterwards: how natural it felt (1-5) and anything odd. */
  feedback?: { rating: number | null; comment: string; at: string } | null;
};
export type EventRow = { ts: string; type: string } & Record<string, unknown>;
export type CallResult = Pick<CallRow, 'duration_secs' | 'passed' | 'grade' | 'flags' | 'transcript' | 'analysis'> & { status: CallRow['status'] };

export interface VoiceStore {
  init(): Promise<void>;
  createTester(t: NewTester): Promise<Tester>;
  listTesters(): Promise<Tester[]>;
  testerByToken(token: string): Promise<Tester | undefined>;
  setRevoked(id: string, revoked: boolean): Promise<void>;
  registerCall(c: { conversationId: string; testerId: string | null; scenarioId: string; brain: string }): Promise<void>;
  callsToday(testerId: string): Promise<number>;
  scenarioCounts(testerId: string): Promise<Record<string, number>>;
  markEnded(conversationId: string): Promise<void>;
  saveResult(conversationId: string, r: CallResult): Promise<void>;
  getCall(conversationId: string): Promise<CallRow | undefined>;
  saveFeedback(conversationId: string, f: { rating: number | null; comment: string }): Promise<void>;
  listCalls(limit?: number): Promise<CallRow[]>;
  appendEvent(conversationId: string, e: EventRow): Promise<void>;
  events(conversationId: string): Promise<EventRow[]>;
}

const newToken = () => randomBytes(9).toString('base64url');
const now = () => new Date().toISOString();
const startOfDay = () => new Date(new Date().toISOString().slice(0, 10)).toISOString();

export function memoryStore(): VoiceStore {
  const testers: Tester[] = [];
  const calls = new Map<string, CallRow>();
  const events = new Map<string, EventRow[]>();
  return {
    init: async () => {},
    async createTester({ name, dailyCap, phone = null, scenarioId = null }) {
      const t = { id: `t_${newToken()}`, name, token: newToken(), daily_cap: dailyCap, revoked: false, created_at: now(), phone, scenario_id: scenarioId };
      testers.push(t);
      return t;
    },
    listTesters: async () => [...testers].reverse(),
    testerByToken: async (token) => testers.find((t) => t.token === token),
    async setRevoked(id, revoked) {
      const t = testers.find((x) => x.id === id);
      if (t) t.revoked = revoked;
    },
    async registerCall({ conversationId, testerId, scenarioId, brain }) {
      if (calls.has(conversationId)) return;
      calls.set(conversationId, {
        conversation_id: conversationId, tester_id: testerId, scenario_id: scenarioId, brain, status: 'live', started_at: now(), ended_at: null,
        duration_secs: null, passed: null, grade: null, flags: null, transcript: null, analysis: null,
      });
    },
    callsToday: async (testerId) => [...calls.values()].filter((c) => c.tester_id === testerId && c.started_at >= startOfDay()).length,
    async scenarioCounts(testerId) {
      const out: Record<string, number> = {};
      for (const c of calls.values()) if (c.tester_id === testerId) out[c.scenario_id] = (out[c.scenario_id] ?? 0) + 1;
      return out;
    },
    async markEnded(id) {
      const c = calls.get(id);
      if (c && c.status === 'live') Object.assign(c, { status: 'ended', ended_at: now() });
    },
    async saveResult(id, r) {
      const c = calls.get(id);
      if (c) Object.assign(c, r, { ended_at: c.ended_at ?? now() });
    },
    async saveFeedback(id, f) {
      const c = calls.get(id);
      if (c) c.feedback = { ...f, at: now() };
    },
    async getCall(id) {
      const c = calls.get(id);
      return c && { ...c, tester_name: testers.find((t) => t.id === c.tester_id)?.name ?? null };
    },
    listCalls: async (limit = 200) =>
      [...calls.values()]
        .sort((a, b) => b.started_at.localeCompare(a.started_at))
        .slice(0, limit)
        .map((c) => ({ ...c, tester_name: testers.find((t) => t.id === c.tester_id)?.name ?? null })),
    async appendEvent(id, e) {
      events.set(id, [...(events.get(id) ?? []), e]);
    },
    events: async (id) => events.get(id) ?? [],
  };
}

const SCHEMA = [
  `create table if not exists voice_testers (
    id text primary key, name text not null, token text not null unique, daily_cap int not null default 10,
    revoked boolean not null default false, created_at timestamptz not null default now())`,
  `alter table voice_testers add column if not exists phone text`,
  `alter table voice_testers add column if not exists scenario_id text`,
  `create table if not exists voice_calls (
    conversation_id text primary key, tester_id text references voice_testers(id), scenario_id text not null, brain text not null,
    status text not null default 'live', started_at timestamptz not null default now(), ended_at timestamptz,
    duration_secs int, passed boolean, grade jsonb, flags jsonb, transcript jsonb, analysis jsonb)`,
  `alter table voice_calls add column if not exists feedback jsonb`,
  `create index if not exists voice_calls_tester_idx on voice_calls (tester_id, started_at)`,
  `create table if not exists voice_events (
    id bigserial primary key, conversation_id text not null, ts timestamptz not null, type text not null, payload jsonb not null)`,
  `create index if not exists voice_events_conv_idx on voice_events (conversation_id, id)`,
];

export function pgStore(url: string): VoiceStore {
  const sql = postgres(url, { max: 5, idle_timeout: 30, onnotice: () => {} });
  const iso = (v: unknown) => (v instanceof Date ? v.toISOString() : (v as string | null));
  const row = <T>(r: Record<string, unknown>) => ({ ...r, started_at: iso(r.started_at), ended_at: iso(r.ended_at), created_at: iso(r.created_at) }) as unknown as T;
  const json = (v: unknown) => (v === null || v === undefined ? null : sql.json(v as never));
  return {
    async init() {
      for (const s of SCHEMA) await sql.unsafe(s);
    },
    async createTester({ name, dailyCap, phone = null, scenarioId = null }) {
      const [t] = await sql`insert into voice_testers (id, name, token, daily_cap, phone, scenario_id)
        values (${`t_${newToken()}`}, ${name}, ${newToken()}, ${dailyCap}, ${phone}, ${scenarioId}) returning *`;
      return row<Tester>(t);
    },
    listTesters: async () => (await sql`select * from voice_testers order by created_at desc`).map((r) => row<Tester>(r)),
    testerByToken: async (token) => {
      const [t] = await sql`select * from voice_testers where token = ${token}`;
      return t ? row<Tester>(t) : undefined;
    },
    async setRevoked(id, revoked) {
      await sql`update voice_testers set revoked = ${revoked} where id = ${id}`;
    },
    async registerCall({ conversationId, testerId, scenarioId, brain }) {
      await sql`insert into voice_calls (conversation_id, tester_id, scenario_id, brain) values (${conversationId}, ${testerId}, ${scenarioId}, ${brain}) on conflict do nothing`;
    },
    callsToday: async (testerId) => {
      const [r] = await sql`select count(*)::int as n from voice_calls where tester_id = ${testerId} and started_at >= ${startOfDay()}`;
      return r.n as number;
    },
    async scenarioCounts(testerId) {
      const rows = await sql`select scenario_id, count(*)::int as n from voice_calls where tester_id = ${testerId} group by scenario_id`;
      return Object.fromEntries(rows.map((r) => [r.scenario_id, r.n]));
    },
    async markEnded(id) {
      await sql`update voice_calls set status = 'ended', ended_at = now() where conversation_id = ${id} and status = 'live'`;
    },
    async saveResult(id, r) {
      await sql`update voice_calls set status = ${r.status}, ended_at = coalesce(ended_at, now()), duration_secs = ${r.duration_secs},
        passed = ${r.passed}, grade = ${json(r.grade)}, flags = ${json(r.flags)}, transcript = ${json(r.transcript)}, analysis = ${json(r.analysis)}
        where conversation_id = ${id}`;
    },
    async saveFeedback(id, f) {
      await sql`update voice_calls set feedback = ${sql.json({ ...f, at: now() } as never)} where conversation_id = ${id}`;
    },
    getCall: async (id) => {
      const [c] = await sql`select c.*, t.name as tester_name from voice_calls c left join voice_testers t on t.id = c.tester_id where c.conversation_id = ${id}`;
      return c ? row<CallRow>(c) : undefined;
    },
    listCalls: async (limit = 200) =>
      (await sql`select c.conversation_id, c.tester_id, c.scenario_id, c.brain, c.status, c.started_at, c.ended_at, c.duration_secs, c.passed, c.grade, c.flags, c.feedback,
        t.name as tester_name from voice_calls c left join voice_testers t on t.id = c.tester_id order by c.started_at desc limit ${limit}`).map((r) => row<CallRow>(r)),
    async appendEvent(id, e) {
      const { ts, type, ...payload } = e;
      await sql`insert into voice_events (conversation_id, ts, type, payload) values (${id}, ${ts}, ${type}, ${sql.json(payload as never)})`;
    },
    events: async (id) =>
      (await sql`select ts, type, payload from voice_events where conversation_id = ${id} order by id`).map((r) => ({ ts: iso(r.ts)!, type: r.type, ...(r.payload as object) })),
  };
}

export const createStore = (url = process.env.DATABASE_URL) => (url ? pgStore(url) : memoryStore());
