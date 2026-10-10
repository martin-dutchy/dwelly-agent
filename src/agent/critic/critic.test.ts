import { createHash } from 'node:crypto';
import { createModels, fauxAssistantMessage, fauxProvider, fauxToolCall } from '@earendil-works/pi-ai';
import { describe, expect, it } from 'vitest';
import type { LedgerEntry } from '../ledger.js';
import { CHECKLIST, CRITIC_PROMPT, type CriticInput, type ReviewItem, criticCorpus, criticMessage, criticPrompt, evidenceFilter, redFlagChecklist, revisionNote, runCritic } from './critic.js';

const sha = (s: string) => createHash('sha256').update(s).digest('hex');

const ledger: LedgerEntry[] = [
  { id: 'A1', tool: 'send_message', args: { recipient_name: 'Swift Plumbing', body: 'Please go ahead with the\nreplacement of the toilet.' }, key: 'k', attempts: 1, status: 'verified', evidence: ['MSG-1 stored'] },
];
const input: CriticInput = {
  prompt: '<case>Tenant reports a blocked toilet. The landlord has not replied to the quote of £640.</case>',
  attachments: ['attachments/quote.pdf'],
  draft: { outcome: 'action_taken', summary: 'Told the plumber to proceed.' },
  ledger,
  policyLog: [],
};
const item = (over: Partial<ReviewItem>): ReviewItem => ({ id: '1', verdict: 'yes', evidence_quote: '', source: '', ...over });
const items = (...over: Partial<ReviewItem>[]) => CHECKLIST.map(([id], i) => item({ id, ...over[i] }));

function setup(responses: Parameters<ReturnType<typeof fauxProvider>['setResponses']>[0]) {
  const faux = fauxProvider();
  const models = createModels();
  models.setProvider(faux.provider);
  faux.setResponses(responses);
  return { faux, opts: { model: faux.getModel(), streamFn: models.streamSimple.bind(models) } };
}

describe('evidence or drop', () => {
  it('keeps a "no" quoting the case and drops one quoting invented text; only the kept one reaches the note', async () => {
    const review = items(
      { verdict: 'no', evidence_quote: 'The landlord has not replied to the quote', source: 'case', finding: 'Spend was committed without approval.', fix: 'Tell the plumber to wait.' },
      { verdict: 'no', evidence_quote: 'The tenant is 92 and lives alone with no heating', source: 'case', finding: 'Vulnerable tenant.', fix: 'Raise priority.' },
    );
    const { faux, opts } = setup([fauxAssistantMessage([fauxToolCall('submit_review', { items: review })])]);
    const r = await runCritic(input, opts);
    expect(r.status).toBe('ok');
    expect(r.kept.map((f) => f.id)).toEqual(['1']);
    expect(r.dropped.map((f) => f.id)).toEqual(['2']);
    expect(faux.state.callCount).toBe(1);
    const note = revisionNote(r.kept);
    expect(note).toMatch(/^Pre-submit review/);
    expect(note).toContain('The landlord has not replied');
    expect(note).not.toContain('92');
  });

  it('matches quotes inside ledger arguments across line breaks with the injected matcher, and drops short quotes', () => {
    const corpus = criticCorpus(input);
    const words = (q: string, c: string) => c.replace(/\s+/g, ' ').includes(q.replace(/\s+/g, ' '));
    const r = evidenceFilter([item({ verdict: 'no', evidence_quote: 'go ahead with the replacement' }), item({ id: '2', verdict: 'no', evidence_quote: 'go ahead' })], corpus, words);
    expect(r.kept.map((f) => f.id)).toEqual(['1']);
    expect(r.dropped.map((f) => f.id)).toEqual(['2']);
  });
});

describe('error paths', () => {
  it('a provider error gives status "error" and does not throw', async () => {
    const { opts } = setup([fauxAssistantMessage('', { stopReason: 'error', errorMessage: 'invalid request' })]);
    const r = await runCritic(input, { ...opts, maxRetries: 0 });
    expect(r).toMatchObject({ status: 'error', kept: [], dropped: [] });
    expect(r.reason).toContain('api error');
  });

  it('a response without submit_review is unparsable', async () => {
    const { opts } = setup([fauxAssistantMessage('Looks fine to me.')]);
    expect(await runCritic(input, opts)).toMatchObject({ status: 'error', reason: 'unparsable' });
  });

  it('a submit_review that fails the schema, and is not fixed on the retry, is unparsable', async () => {
    const { opts } = setup([fauxAssistantMessage([fauxToolCall('submit_review', { items: [{ id: '99', verdict: 'maybe' }] })]), fauxAssistantMessage('Done.')]);
    expect(await runCritic(input, opts)).toMatchObject({ status: 'error', reason: 'unparsable' });
  });

  it('a response slower than timeoutMs gives a timeout error', async () => {
    const slow = async () => {
      await new Promise((r) => setTimeout(r, 500));
      return fauxAssistantMessage([fauxToolCall('submit_review', { items: items() })]);
    };
    const { opts } = setup([slow]);
    const r = await runCritic(input, { ...opts, timeoutMs: 50 });
    expect(r.status).toBe('error');
    expect(r.reason).toContain('timeout');
    expect(r.ms).toBeLessThan(400);
  });
});

describe('prompt', () => {
  it('lists all 16 items', () => {
    for (const [id] of CHECKLIST) expect(CRITIC_PROMPT).toContain(`\n${id}. `);
  });

  it('prompt, message and evidence corpus without context are byte-identical to the pre-context critic', () => {
    expect(criticPrompt(input)).toBe(CRITIC_PROMPT);
    expect([sha(CRITIC_PROMPT), sha(criticMessage(input)), sha(criticCorpus(input))]).toEqual([
      'acf925b42359a66319ce4fb6cef57f91a38720569d3bc047db2cac497cfe7128',
      '68dbf4a734d61f95bf9dc35f9115d8bbc6f9896a1a21effcb534496e63ec3fa0',
      '431e18c8764f322dcd0c64204f95a940e165776ea825905691c34323110293ce',
    ]);
  });
});

describe('context', () => {
  const brief = 'Derived: the quote of £640 is above the landlord spend limit of £250.';
  const skill = '<skill id="spend" title="Approval before spend">\nNever tell a provider to proceed above the limit without written landlord approval.\n</skill>';
  const flags = ['Telling a provider to go ahead before the landlord approves', 'A WAIT with no review date'];
  const withCtx: CriticInput = { ...input, prompt: `${input.prompt}\n\n${brief}\n\n${skill}`, context: { brief, redFlags: flags } };

  it('red flags reach the model as items S1..Sn after the fixed 16, and the brief gets its own section outside <case>', async () => {
    let seen: { messages: unknown[] } | undefined;
    const { opts } = setup([
      (context) => {
        seen = context;
        return fauxAssistantMessage([fauxToolCall('submit_review', { items: [...items(), item({ id: 'S1' }), item({ id: 'S2', verdict: 'n/a' })] })]);
      },
    ]);
    const r = await runCritic(withCtx, opts);
    expect(r.status).toBe('ok');
    expect(r.redFlagItems).toEqual([['S1', flags[0]], ['S2', flags[1]]]);
    const sent = JSON.stringify(seen!.messages);
    const inRequest = (s: string) => expect(sent).toContain(JSON.stringify(s).slice(1, -1));
    const system = criticPrompt(withCtx);
    inRequest(system);
    expect(system.indexOf('\nS1. Red flag for this kind of case: Telling a provider to go ahead before the landlord approves.')).toBeGreaterThan(system.indexOf('\nM3. '));
    expect(system).toContain('\nS2. Red flag for this kind of case: A WAIT with no review date.');
    expect(system).toContain('with all 18 items');
    expect(system).toContain('<derived_brief> was computed from the case by code and can be wrong');
    expect(system).not.toMatch(/judge|grader|score/i);
    const message = criticMessage(withCtx);
    inRequest(message);
    const caseSection = message.slice(0, message.indexOf('</case>'));
    expect(caseSection).toContain('The landlord has not replied');
    expect(caseSection).not.toContain(brief);
    expect(caseSection).not.toContain('<skill');
    expect(message).toContain(`</case>\n\n<derived_brief>\n${brief}\n</derived_brief>\n\n<attachments_present>`);
  });

  it('an empty context leaves prompt, message and corpus unchanged', () => {
    for (const context of [{}, { brief: '  ', redFlags: [] }, { redFlags: ['', ' \n '] }]) {
      const c = { ...input, context };
      expect(criticPrompt(c)).toBe(CRITIC_PROMPT);
      expect(criticMessage(c)).toBe(criticMessage(input));
      expect(criticCorpus(c)).toBe(criticCorpus(input));
    }
  });

  it('red flags are whitespace-normalised, deduplicated and capped at 12', () => {
    const many = ['No  safety\nadvice', 'no safety advice', ...Array.from({ length: 20 }, (_, i) => `Flag ${i}`)];
    const list = redFlagChecklist(many);
    expect(list).toHaveLength(12);
    expect(list[0]).toEqual(['S1', 'No safety advice']);
    expect(list[1]).toEqual(['S2', 'Flag 0']);
    expect(list.at(-1)![0]).toBe('S12');
  });

  it('drops a finding with no evidence and one quoting only the brief or a skill; keeps red-flag and fixed findings quoting the case', async () => {
    const review = [
      ...items(
        { verdict: 'no', evidence_quote: '', source: 'case', finding: 'Severity is wrong.' },
        { verdict: 'no', evidence_quote: 'above the landlord spend limit of £250', source: 'derived_brief', finding: 'Spend above limit.' },
        { verdict: 'no', evidence_quote: 'without written landlord approval', source: 'skill', finding: 'No approval.' },
      ),
      item({ id: 'S1', verdict: 'no', evidence_quote: 'Please go ahead with the replacement', source: 'ledger A1', finding: 'Provider told to proceed before approval.', fix: 'Tell the plumber to wait.' }),
    ];
    review[4] = item({ id: '5', verdict: 'no', evidence_quote: 'The landlord has not replied to the quote', source: 'case', finding: 'No landlord approval.' });
    const { opts } = setup([fauxAssistantMessage([fauxToolCall('submit_review', { items: review })])]);
    const words = (q: string, c: string) => c.replace(/\s+/g, ' ').includes(q.replace(/\s+/g, ' '));
    const r = await runCritic(withCtx, { ...opts, match: words });
    expect(r.kept.map((f) => f.id)).toEqual(['5', 'S1']);
    expect(r.dropped.map((f) => f.id)).toEqual(['1', '2', '3']);
    expect(revisionNote(r.kept)).toContain('[S1] Provider told to proceed before approval.');
  });

  it('a review that uses red-flag ids without context fails the schema', async () => {
    const { opts } = setup([fauxAssistantMessage([fauxToolCall('submit_review', { items: [...items(), item({ id: 'S1' })] })]), fauxAssistantMessage('Done.')]);
    expect(await runCritic(input, opts)).toMatchObject({ status: 'error', reason: 'unparsable' });
  });
});
