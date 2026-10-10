import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export type Tenant = {
  tenant_id: string;
  full_name: string;
  phone: string;
  date_of_birth: string;
  property_id: string;
  vulnerable: boolean;
};
export type Property = { property_id: string; address: string; landlord: string; monthly_rent_gbp: number };
export type Tenancy = { tenant_id: string; start: string; end: string; arrears_gbp: number };
export type Ticket = {
  ref: string;
  tenant_id: string;
  category: string;
  urgency: string;
  status: string;
  description: string;
  access_notes?: string;
  created: string;
};
export type Escalation = {
  ref: string;
  conversation_id: string;
  tenant_id?: string;
  priority: 'P1' | 'P2' | 'P3';
  reason: string;
  handover_summary: string;
  created: string;
};

type Data = {
  tenants: Tenant[];
  properties: Property[];
  tenancies: Tenancy[];
  tickets: Ticket[];
  escalations: Escalation[];
};

// In-memory store seeded from fixtures. Swap for the organisers' APIs on the day.
const fixturesPath = fileURLToPath(new URL('../../data/fixtures.json', import.meta.url));
const load = (): Data => ({ escalations: [], ...JSON.parse(readFileSync(fixturesPath, 'utf8')) });
export const db: Data = load();

/** Back to the fixtures, in place (tools hold a reference to db). Used between voice test calls. */
export const resetDb = () => Object.assign(db, load());

let seq = 4900;
export const nextRef = (prefix: string) => `${prefix}-${++seq}`;
export const today = () => new Date().toISOString().slice(0, 10);
