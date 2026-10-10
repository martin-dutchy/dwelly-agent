import type { LoadedCase } from './cases.js';
import type { OpsSeed, Property, Ticket } from './opsTools.js';

/**
 * Builds the ops environment a case starts in: open jobs, the property record and "today".
 * Practice cases carry these in inputs/crm.json and inputs/tickets.json. Public cases are one
 * job each, so we rebuild that job from what is visible in its history at the decision point.
 */
export function seedFromCase(c: LoadedCase): OpsSeed {
  const today = c.brief.match(/\*\*Today:\*\*\s*(?:[A-Za-z]+\s+)?(\d{4}-\d{2}-\d{2}(?:[ T]\d{1,2}:\d{2})?)/)?.[1];
  const properties: Property[] = [];
  for (const i of c.inputs.filter((i) => /crm\.json$/i.test(i.name))) {
    try {
      const crm = JSON.parse(i.content);
      const p = crm.property;
      if (p?.address)
        properties.push({
          id: p.property_id,
          address: p.address,
          tenanted: crm.tenant ? crm.tenant.status !== 'ended' : undefined,
          landlord: crm.landlord && { name: crm.landlord.name, email: crm.landlord.email, phone: crm.landlord.phone, spend_limit_gbp: crm.landlord.spend_limit_gbp, notes: crm.landlord.notes },
          contractors: crm.contractors,
        });
    } catch {
      // Not JSON we understand: the agent still sees the raw file.
    }
  }

  const history = c.inputs.find((i) => i.name === 'history.md')?.content;
  const tickets: Ticket[] = [...c.seedTickets];
  if (history) {
    const address = c.brief.match(/\*\*Property:\*\*\s*(.+)/)?.[1]?.trim();
    const voidProperty = /NOT TENANTED/.test(history);
    if (address) properties.push({ address, tenanted: voidProperty ? false : undefined, landlord: agencyLandlord(history) });
    tickets.push(publicJob(c, history, address));
  }
  const evidence = [c.brief, ...c.inputs.map((i) => i.content)].join('\n\n');
  return { tickets, properties, today, evidence, mediaNames: c.media.map((m) => m.name) };
}

/**
 * Case exports name parties by role only, but the agency manages the property and its system holds
 * the landlord's details: it messages "To: Landlord" throughout the public cases. No address is invented.
 */
function agencyLandlord(history: string): NonNullable<Property['landlord']> {
  const events = history.split(/^#+ [^\n]*\bevent (?=\d+\s*$)/m).slice(1).flatMap((block) => {
    const id = block.match(/^(\d+)/)?.[1];
    const field = (k: string) => block.match(new RegExp(`- \\*\\*${k}:\\*\\* ([^\\n]+)`))?.[1]?.trim() ?? '';
    const dir = /landlord/i.test(field('To')) ? 'to landlord' : /landlord/i.test(field('From')) ? 'from landlord' : '';
    return id && dir ? [`event ${id} (${field('Channel').toLowerCase() || 'message'}, ${dir})`] : [];
  });
  return {
    contact: 'agency landlord record',
    notes: [
      'Contact details are held in the agency system and not shown in this case file; messages to the landlord go through it. Use contact "agency landlord record".',
      events.length ? `Landlord messages visible in this case: ${events.join('; ')}.` : 'No landlord message is visible in this case yet.',
    ],
  };
}

/** The job's state as the workflow engine would show it after the last visible event. */
function publicJob(c: LoadedCase, history: string, address?: string): Ticket {
  const last = (re: RegExp) => {
    let at = -1;
    for (const m of history.matchAll(new RegExp(re, 'g'))) at = m.index;
    return at;
  };
  const stages: [string, RegExp][] = [
    ['mp_time', /Maintenance provider assigned/],
    ['visit', /Visit date (selected|confirmed)|moved to Visit date/],
    ['result', /moved to Result/],
    ['documents', /Request marked as completed/],
    ['completed', /request is now closed|completed without payment|completed by supervisor/],
  ];
  const stage = stages.map(([s, re]) => [s, last(re)] as const).filter(([, at]) => at >= 0).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'init';
  const approvedAt = last(/Landlord approval confirmed|Quote was approved by landlord/);
  const requiredAt = last(/Please complete landlord approval step first/);
  const holdAt = last(/Put on hold by/);
  const resumedAt = last(/Manually updated via Change Mode|return(ed)? (this request )?to auto mode|Resumed auto/);
  const hold = holdAt > resumedAt ? history.slice(holdAt).match(/Reason: ([^.\n]+)\.?(?: Comment: ([^\n]*))?/) : null;
  return {
    ref: history.match(/Job Id:\s*(\S+)/)?.[1] ?? `NBL-${c.id}`,
    stage,
    property: address,
    description: c.brief.match(/## Initial request\s+([\s\S]*?)(\n## |$)/)?.[1]?.trim(),
    landlord_approval: approvedAt > requiredAt ? 'confirmed' : requiredAt >= 0 ? 'required' : undefined,
    ...(hold ? { hold: { reason: hold[1], comment: hold[2] ?? '' } } : {}),
  };
}
