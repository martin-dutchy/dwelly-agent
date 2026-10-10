import { describe, expect, it } from 'vitest';
import { PartyBook, addCrmParties, addEventParties, isPrimaryCrm } from './parties.js';

const crm = {
  tenant: { full_name: 'Priya Shah', phone: '+447700900103', email: 'priya@mailbox.example', household: '1 adult, 2 children', guarantor: { name: 'Anil Shah', phone: '07700 900199' } },
  landlord: { name: 'Benjamin Hartley', preferred_name: 'Ben', email: 'ben@hartleyhomes.example', phone: '+447700900201' },
  contractors: [{ name: 'QuickFix Handyman Services', phone: '+447700900330' }, { name: 'HeatRight Ltd', phone: '+447700900311' }],
  joint_tenants: ['Priya Shah', 'Tom Reed'],
};

describe('parties', () => {
  const book = new PartyBook();
  addCrmParties(book, crm, 'doc:inputs/crm.json', true);
  addCrmParties(book, { tenant: { full_name: 'Amelia Clarke', phone: '+447700900101' } }, 'doc:inputs/crm_record_T-1001.json', false);
  addEventParties(book, [
    { id: 'ev:a#1', channel: 'email', from: 'Accounts <accounts@quickfix-handyman.example>', to: 'lettings@mare.example', text: '', doc: 'doc:a' },
    { id: 'ev:b#1', channel: 'call', from: 'Ben Hartley', text: '', doc: 'doc:b' },
    { id: 'ev:b#2', channel: 'whatsapp', from: '07700 900103', to: 'Mare & Co Lettings', text: '', doc: 'doc:b' },
    { id: 'ev:b#3', channel: 'call', from: 'CALLER', to: 'AGENT', text: '', doc: 'doc:b' },
  ]);
  const by = (name: string) => book.parties.find((p) => p.name === name);

  it('reads roles from the CRM, skipping descriptions that are not names', () => {
    expect(book.parties.map((p) => [p.role, p.name])).toEqual([
      ['tenant', 'Priya Shah'],
      ['other', 'Anil Shah'],
      ['landlord', 'Benjamin Hartley'],
      ['provider', 'QuickFix Handyman Services'],
      ['provider', 'HeatRight Ltd'],
      ['tenant', 'Tom Reed'],
      ['other', 'Amelia Clarke'],
      ['agency', 'Mare & Co Lettings'],
    ]);
    expect(by('Anil Shah')!.contacts).toEqual(['07700 900199']);
  });

  it('merges senders by email domain, preferred name and phone number', () => {
    expect(by('QuickFix Handyman Services')!.sources).toEqual(['doc:inputs/crm.json', 'ev:a#1']);
    expect(by('Benjamin Hartley')!.sources).toEqual(['doc:inputs/crm.json', 'ev:b#1']);
    expect(by('Priya Shah')!.sources).toEqual(['doc:inputs/crm.json', 'ev:b#2']);
    expect(book.parties.find((p) => p.role === 'agency')).toEqual({ role: 'agency', name: 'Mare & Co Lettings', contacts: ['lettings@mare.example'], sources: ['ev:a#1', 'ev:b#2', 'ev:b#3'] });
  });

  it('treats only the case CRM export as primary', () => {
    expect(isPrimaryCrm('inputs/crm.json')).toBe(true);
    expect(isPrimaryCrm('inputs/crm_record_T-1001.json')).toBe(false);
    expect(isPrimaryCrm('inputs/tickets.json')).toBe(false);
  });
});
