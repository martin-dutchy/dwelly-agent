// Case walks: one real organiser case cut at every point where the agency had to decide something, from the
// tenant's request to closure. Each step is a public-format case folder the existing runner and judge handle;
// the agency's recorded next events are the reference for that step.
import type { HistoryEvent } from '../agent/publicCases.js';

const field = (e: HistoryEvent, name: string) => e.body.match(new RegExp(`^- \\*\\*${name}:\\*\\* (.*)$`, 'm'))?.[1]?.trim() ?? '';

/** Prompts the case system raises for a person, plus intake: the moments someone at the agency has to act. */
const SYSTEM_PROMPTS = [
  /^Request description:/,
  /^AI Intake Classification/,
  /Please (check if we need to provide a response|complete landlord approval step|approve selection of provider|review)/i,
  /3\+ reminders have been sent/i,
  /No work results; we need to check/i,
  /Waiting for (landlord|tenant) response before provider selection/i,
  /No .{0,40}response after \d+ days/i,
  /Message received from (landlord|tenant)/i,
  /Email received from provider, but expected data could not be extracted/i,
  /lets do the final checks/i,
  /Need confirmation from landlord/i,
  /We need to check the key return/i,
  /Work results isset|Please add results of inspection/i,
  /This task is closed, but we have received/i,
  /NOT TENANTED/,
  /Paused automatically/i,
];

const PARTY = /tenant|landlord|contractor|provider/i;

/** A message or call from a tenant, landlord or contractor: something arrived that the agency must read. */
export const isInbound = (e: HistoryEvent) => PARTY.test(field(e, 'From')) && !/agency|lettings/i.test(field(e, 'From'));

/** An event that hands the case to a person: an inbound message or a system prompt. */
export function isTrigger(e: HistoryEvent): boolean {
  if (isInbound(e)) return true;
  const text = e.body
    .split('\n')
    .filter((l) => l.trim() && !l.startsWith('- **'))
    .join('\n');
  return SYSTEM_PROMPTS.some((re) => re.test(text));
}

/**
 * Decision points: after each run of consecutive triggers, so the agent sees everything that arrived together and
 * the next recorded event is the agency's own response. Returns 1-based event numbers to cut after; never the last event.
 */
export function walkSteps(events: HistoryEvent[]): number[] {
  const steps: number[] = [];
  events.forEach((e, i) => {
    const next = events[i + 1];
    if (next && isTrigger(e) && !isTrigger(next)) steps.push(e.n);
  });
  return steps;
}

/** One line for a timeline: channel, who to whom, and the first words of the event. */
export function eventLine(e: HistoryEvent | undefined, width = 110): string {
  if (!e) return '(end of record)';
  const text = e.body
    .split('\n')
    .filter((l) => l.trim() && !l.startsWith('- **') && !/^(Address|Job Id):/.test(l))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  const route = `${field(e, 'From') || '?'} → ${field(e, 'To') || '?'}`;
  return `${String(e.n).padStart(3, '0')} ${field(e, 'Channel') || e.header.split(' — ')[1] || ''} ${route}: ${text.slice(0, width)}${text.length > width ? '…' : ''}`;
}

/** The organiser-style marker section; recipient and channel only when the next event is the agency writing to a party. */
export function nextActionSection(next: HistoryEvent): string {
  const n = String(next.n).padStart(3, '0');
  const from = field(next, 'From');
  const to = field(next, 'To');
  const agencyMessage = /agency|lettings/i.test(from) && PARTY.test(to) && /^(email|sms|call)$/i.test(field(next, 'Channel'));
  return [
    '## Next action at escalation',
    '',
    `- **Recorded action:** [History event ${n}](history.md#event-${n})`,
    ...(agencyMessage ? [`- **Recipient:** ${to}`, `- **Channel:** ${field(next, 'Channel')}`] : []),
    '',
    '',
  ].join('\n');
}
