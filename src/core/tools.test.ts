import { describe, expect, it } from 'vitest';
import { db } from './store.js';
import { executeTool } from './tools.js';

const ctx = (id: string) => ({ conversationId: `test-${id}-${Date.now()}`, channel: 'text' as const });

describe('shared tool registry', () => {
  it('finds a tenant by caller id without revealing details', async () => {
    const res = await executeTool('find_tenant', { phone: '07700 900101' }, ctx('find'));
    expect(res).toEqual({ ok: true, matches: [{ tenant_id: 'T-1001', first_name: 'Amelia' }] });
  });

  it('refuses tenancy details before verification', async () => {
    const res = await executeTool('get_tenancy', { tenant_id: 'T-1002' }, ctx('unverified'));
    expect(res).toMatchObject({ ok: false, error: 'not_verified' });
  });

  it('does not verify with a wrong date of birth', async () => {
    const c = ctx('wrongdob');
    const res = await executeTool('verify_identity', { tenant_id: 'T-1002', full_name: 'Jonah Okafor', date_of_birth: '1985-01-01' }, c);
    expect(res).toMatchObject({ verified: false });
    expect(await executeTool('get_tenancy', { tenant_id: 'T-1002' }, c)).toMatchObject({ error: 'not_verified' });
  });

  it('scopes verification to the verified tenant', async () => {
    const c = ctx('scope');
    await executeTool('verify_identity', { tenant_id: 'T-1001', full_name: 'amelia clarke', date_of_birth: '1991-03-14' }, c);
    expect(await executeTool('get_tenancy', { tenant_id: 'T-1001' }, c)).toMatchObject({ ok: true, arrears_gbp: 0 });
    expect(await executeTool('get_tenancy', { tenant_id: 'T-1002' }, c)).toMatchObject({ error: 'not_verified' });
  });

  it('creates tickets idempotently and blocks emergencies', async () => {
    const c = ctx('ticket');
    await executeTool('verify_identity', { tenant_id: 'T-1003', full_name: 'Priya Shah', date_of_birth: '1998-07-21' }, c);
    const args = { tenant_id: 'T-1003', category: 'heating', urgency: 'urgent', description: 'Boiler shows error F28' };
    const first = await executeTool('create_repair_ticket', args, c);
    const second = await executeTool('create_repair_ticket', args, c);
    expect(first).toMatchObject({ ok: true });
    expect(second).toMatchObject({ ticket_ref: first.ticket_ref, duplicate: true });
    const gas = await executeTool('create_repair_ticket', { ...args, category: 'other', description: 'I can smell gas' }, c);
    expect(gas).toMatchObject({ ok: false });
  });

  it('rejects invalid arguments instead of throwing', async () => {
    const res = await executeTool('create_repair_ticket', { tenant_id: 'T-1001', category: 'teleport' }, ctx('invalid'));
    expect(res).toMatchObject({ ok: false });
  });

  it('records escalations with the conversation id', async () => {
    const c = ctx('esc');
    const res = await executeTool(
      'escalate_to_human',
      { priority: 'P2', reason: 'Payment plan request', handover_summary: 'Jonah Okafor, two months arrears, asks for a plan.' },
      c,
    );
    expect(res).toMatchObject({ ok: true });
    expect(db.escalations.some((e) => e.conversation_id === c.conversationId)).toBe(true);
  });
});

describe('voice-tolerant verification', () => {
  it('accepts small name misspellings from speech-to-text but not a wrong DOB', async () => {
    const c = { conversationId: `test-stt-${Date.now()}`, channel: 'voice:livekit' as const };
    expect(await executeTool('verify_identity', { tenant_id: 'T-1001', full_name: 'Amelia Clark', date_of_birth: '1990-03-14' }, c)).toMatchObject({ verified: false });
    expect(await executeTool('verify_identity', { tenant_id: 'T-1001', full_name: 'Amelia Clark', date_of_birth: '1991-03-14' }, c)).toMatchObject({ verified: true });
    expect(await executeTool('verify_identity', { tenant_id: 'T-1001', full_name: 'Priya Shah', date_of_birth: '1991-03-14' }, c)).toMatchObject({ verified: false });
  });
});
