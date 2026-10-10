import { createModels, fauxAssistantMessage, fauxProvider, fauxToolCall } from '@earendil-works/pi-ai';
import { describe, expect, it } from 'vitest';
import type { LedgerEntry } from '../ledger.js';
import { CHECKLIST, CRITIC_PROMPT, type CriticInput, type ReviewItem, criticCorpus, evidenceFilter, revisionNote, runCritic } from './critic.js';

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
});
