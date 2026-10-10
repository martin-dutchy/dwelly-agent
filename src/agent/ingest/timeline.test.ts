import { describe, expect, it } from 'vitest';
import { toIso, todayOf } from './dates.js';
import { parseEml } from './eml.js';
import { chatEvents, csvEvents, datedLineEvents, emailEvents, jsonEvents, textEvents, transcriptEvents } from './timeline.js';

describe('dates', () => {
  it.each([
    ['Saturday 2026-10-10 12:52, shortly after the call', '2026-10-10T12:52'],
    ['2026-08-07 11:48:38 UTC', '2026-08-07T11:48:38Z'],
    ['2026-10-10T12:47:30Z', '2026-10-10T12:47:30Z'],
    ['2026-10-09T22:55:10+01:00', '2026-10-09T22:55:10+01:00'],
    ['Sat, 10 Oct 2026 11:02:40 +0100', '2026-10-10T11:02:40+01:00'],
    ['9 Oct 2026, at 16:10, lettings@x.example', '2026-10-09T16:10'],
    ['Oct 9, 2026 4:10 PM', '2026-10-09T16:10'],
    ['09/10/2026, 18:02', '2026-10-09T18:02'],
    ['2026-09-22', '2026-09-22'],
    ['sometime last week', undefined],
  ])('%s', (raw, iso) => expect(toIso(raw)).toBe(iso));

  it('reads the Today line of a brief', () => {
    expect(todayOf('# Case\n\n- **Today:** Friday 2026-10-09 22:41 (out of hours)\n')).toBe('2026-10-09T22:41');
    expect(todayOf('# Case without a date')).toBeUndefined();
  });
});

describe('call transcripts', () => {
  it('turns elapsed stamps into clock times from the call start in the header', () => {
    const ev = transcriptEvents('# Desk call\n# Saturday 2026-10-10, call started 12:46:16, duration 3:05.\n\n[00:00] AGENT (AI phone line): Hello?\n[01:44] CALLER: I smell gas\n[01:49] [AI phone line ran tool: escalate_to_human]\nstill talking\n', {});
    expect(ev).toEqual([
      { at: '2026-10-10T12:46:16', channel: 'call', from: 'AGENT (AI phone line)', text: 'Hello?' },
      { at: '2026-10-10T12:48:00', channel: 'call', from: 'CALLER', text: 'I smell gas' },
      { at: '2026-10-10T12:48:05', channel: 'call', from: 'system', text: 'AI phone line ran tool: escalate_to_human\nstill talking' },
    ]);
  });

  it('reads clock stamps on the case day, the day before when that would be after now', () => {
    const ctx = { day: '2026-10-10', now: '2026-10-10T16:05' };
    expect(transcriptEvents('[16:02:00] AGENT: Hello\n[16:02:03] CALLER: Hi', ctx).map((e) => e.at)).toEqual(['2026-10-10T16:02:00', '2026-10-10T16:02:03']);
    expect(transcriptEvents('[19:35:00] AGENT: Hello\n[19:35:03] CALLER: Hi', ctx)[0].at).toBe('2026-10-09T19:35:00');
  });

  it('leaves elapsed stamps undated when the call start is unknown', () => {
    expect(transcriptEvents('[00:00] AGENT: Hi\n[00:03] CALLER: Priya here\n-- call dropped --', { day: '2026-10-10' }).map((e) => e.at)).toEqual([undefined, undefined]);
  });
});

describe('chat exports and logs', () => {
  it('reads WhatsApp-style lines with continuations', () => {
    expect(chatEvents('[09/10/2026, 22:40] Amelia Clarke: eggy smell\nsecond line\n09/10/2026, 22:43 - Mare & Co Lettings: get out now', 'whatsapp')).toEqual([
      { at: '2026-10-09T22:40', channel: 'whatsapp', from: 'Amelia Clarke', text: 'eggy smell\nsecond line' },
      { at: '2026-10-09T22:43', channel: 'whatsapp', from: 'Mare & Co Lettings', text: 'get out now' },
    ]);
  });

  it('reads dated log lines with a channel and the named party', () => {
    const ev = datedLineEvents('LOG\n2026-10-09 22:46  WHATSAPP OUT to Amelia Clarke: safety steps.\n2026-10-09 23:10  CALL OUT Ben Hartley. No answer.\n  voicemail left\n2019-05-14 email from Benjamin Hartley: "call me first"\n2026-09-25 10:02 To: luca@x.example  Subject: gas check');
    expect(ev.map((e) => [e.at, e.channel, e.from, e.to])).toEqual([
      ['2026-10-09T22:46', 'whatsapp', undefined, 'Amelia Clarke'],
      ['2026-10-09T23:10', 'call', undefined, undefined],
      ['2019-05-14', 'email', 'Benjamin Hartley', undefined],
      ['2026-09-25T10:02', 'email', undefined, 'luca@x.example'],
    ]);
    expect(ev[1].text).toContain('voicemail left');
  });

  it('reads CSV rows with a date column', () => {
    expect(csvEvents('date,author,note\n2025-11-02,jt (old agency),"gas cert renewed, all good"\n,x,undated')).toEqual([{ at: '2025-11-02', channel: 'note', from: 'jt (old agency)', to: undefined, text: 'author: jt (old agency); note: gas cert renewed, all good' }]);
  });

  it('picks the reader by the shape of the text', () => {
    expect(textEvents('notes.txt', 'Just a paragraph about the boiler.\nAnother line.', {})).toEqual([]);
    expect(textEvents('x.txt', '[01/10/2026, 09:00] A: one\n[01/10/2026, 09:01] B: two', {})).toHaveLength(2);
  });
});

describe('JSON logs', () => {
  it('reads message and call logs, and time-only tool actions on the case day', () => {
    const msgs = jsonEvents('inputs/message_log.json', { source: 'gateway', messages: [{ message_id: 'WA-1', sent_at: '2026-10-09T22:43:04+01:00', channel: 'whatsapp', to: '+447700900101', preview: 'get out', status: 'failed' }] }, {});
    expect(msgs).toEqual([{ at: '2026-10-09T22:43:04+01:00', channel: 'whatsapp', from: undefined, to: '+447700900101', text: 'get out · message_id: WA-1; status: failed' }]);
    const calls = jsonEvents('inputs/call_log.json', [{ call_id: 'C-1', started_at: '2026-10-09T22:55:10+01:00', from: 'OOH line', to: '+44770', result: 'voicemail' }], {});
    expect(calls[0]).toMatchObject({ channel: 'call', from: 'OOH line', to: '+44770' });
    const actions = jsonEvents('inputs/ai_phone_line_actions.json', [{ time: '12:48:11', tool: 'escalate_to_human', args: { priority: 'P1' }, result: 'E-4902 created' }, { note: 'find_tenant never called' }], { day: '2026-10-10' });
    expect(actions).toEqual([
      { at: '2026-10-10T12:48:11', channel: 'note', from: undefined, to: undefined, text: 'escalate_to_human({"priority":"P1"}) → E-4902 created' },
      { at: undefined, channel: 'note', from: undefined, to: undefined, text: 'find_tenant never called' },
    ]);
  });

  it('ignores records that are not logs', () => {
    expect(jsonEvents('inputs/crm.json', { contractors: [{ name: 'A', created: '2026-01-01' }] }, {})).toEqual([]);
    expect(jsonEvents('inputs/tickets.json', [{ ref: 'R-1', created: '2026-10-09', description: 'leak' }], {})).toEqual([]);
    expect(jsonEvents('inputs/compliance_list.json', [{ item: 'EICR' }, { item: 'CP12' }], {})).toEqual([]);
  });
});

describe('email events', () => {
  it('splits a reply from the quoted message it answers', () => {
    const ev = emailEvents(parseEml('From: Kieran <k@cbf.example>\nTo: lettings@mare.example\nDate: Sat, 10 Oct 2026 11:02:40 +0100\nSubject: RE: Job\n\nQuote £640.\n\n> On 9 Oct 2026, at 16:10, lettings@mare.example wrote:\n> Please attend Flat 9.\n'));
    expect(ev).toEqual([
      { at: '2026-10-10T11:02:40+01:00', channel: 'email', from: 'Kieran <k@cbf.example>', to: 'lettings@mare.example', text: 'Subject: RE: Job\n\nQuote £640.' },
      { at: '2026-10-09T16:10', channel: 'email', from: 'lettings@mare.example', to: 'Kieran <k@cbf.example>', text: 'Please attend Flat 9.' },
    ]);
  });

  it('splits an Outlook-style original message', () => {
    const ev = emailEvents(parseEml('From: a@x.example\nSubject: FW: invoice\n\nSee below.\n\n-----Original Message-----\nFrom: Billing <b@y.example>\nSent: 8 Oct 2026 09:00\nTo: a@x.example\nSubject: invoice\n\nPlease pay £300.'));
    expect(ev[1]).toEqual({ at: '2026-10-08T09:00', channel: 'email', from: 'Billing <b@y.example>', to: 'a@x.example', text: 'Subject: invoice\n\nPlease pay £300.' });
  });
});
