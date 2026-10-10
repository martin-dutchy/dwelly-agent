import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { type LoadedCase, loadCase } from '../agent/cases.js';
import { ATTACHMENT_HONESTY, REFERENCE_RUBRIC, type Rubric, attachmentsGiven, referenceRubric, rubricItems } from './rubric.js';

const xa = (rubric: Rubric) => rubricItems(rubric).filter((i) => i.id === 'XA');

describe('universal attachment-honesty item (AC8)', () => {
  it('is appended to a rubric case as prohibited item XA, after its own X items', () => {
    const rubric = JSON.parse(readFileSync('cases/public-cuts/034-attachment-missing-landlord-asks/rubric.json', 'utf8')) as Rubric;
    const items = rubricItems(rubric);
    expect(xa(rubric)).toEqual([{ id: 'XA', key: 'prohibited_actions', text: ATTACHMENT_HONESTY.text, meaning: 'TRUE if the agent DID this (prohibited).' }]);
    expect(items.filter((i) => i.key === 'prohibited_actions').map((i) => i.id)).toEqual(['X1', 'X2', 'XA']);
    expect(new Set(items.map((i) => i.id)).size).toBe(items.length);
  });

  it('is appended to the generic and the reference-derived rubric for public examples', () => {
    expect(xa(REFERENCE_RUBRIC)).toHaveLength(1);
    const reference = '## Next action at escalation\n\n- **Recipient:** Landlord\n- **Channel:** Email\n';
    expect(rubricItems(referenceRubric(reference)).filter((i) => i.key === 'prohibited_actions').map((i) => i.id)).toEqual(['X1', 'XA']);
  });

  it('keeps the rubric numbering unchanged', () => {
    const ids = rubricItems({ ...REFERENCE_RUBRIC, prohibited_actions: ['a', 'b', 'c'] }).map((i) => i.id);
    expect(ids).toEqual(['R1', 'R2', 'P1', 'P2', 'F1', 'F2', 'X1', 'X2', 'X3', 'C1', 'XA']);
  });
});

describe('attachmentsGiven', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dwelly-att-'));
  afterAll(() => rmSync(dir, { recursive: true, force: true }));

  it('lists given, native, missing and later-only attachments from the loader', () => {
    mkdirSync(join(dir, 'attachments'));
    writeFileSync(join(dir, 'index.md'), '# Case 900: Leak\n\n## Details\n\n- **Property:** 1 Test Road\n');
    writeFileSync(join(dir, 'attachments', 'quote.txt'), 'Quote £300');
    writeFileSync(join(dir, 'attachments', 'invoice.txt'), 'Invoice £420');
    writeFileSync(join(dir, 'attachments', 'photo.png'), Buffer.from('89504e470d0a1a0a', 'hex'));
    const event = (n: number, body: string) => `<a id="event-${String(n).padStart(3, '0')}"></a>\n## 2026-01-0${n} — event ${String(n).padStart(3, '0')}\n\n${body}\n`;
    writeFileSync(
      join(dir, 'history.md'),
      `# Case 900 history\n\nTotal events: 3\n\n${event(1, 'Quote: [quote.txt](attachments/quote.txt), photo [photo.png](attachments/photo.png), see attachment-07-document')}\n${event(2, 'Chased.')}\n${event(3, 'Invoice: [invoice.txt](attachments/invoice.txt)')}`,
    );
    const block = attachmentsGiven(loadCase(dir, '2'));
    expect(block).toBe(
      [
        '<attachments_given>',
        'Case files the agent was given (nothing else):',
        '- history.md',
        '- attachments/photo.png: image or scanned PDF sent to the agent natively; its content is not reproduced in <inputs>',
        '- attachments/quote.txt',
        'Referenced in the visible history but not in the case files: attachment-07-document',
        'Withheld from the agent:',
        '- attachments/invoice.txt: first linked from an event after the decision point',
        '</attachments_given>',
      ].join('\n'),
    );
  });

  it('omits the missing line for practice-format cases and says none when nothing is missing', () => {
    const practice = { inputs: [{ name: 'email.txt', content: '' }], media: [], withheld: [{ name: 'rubric.json', reason: 'grading' }] } as unknown as LoadedCase;
    expect(attachmentsGiven(practice)).toBe('<attachments_given>\nCase files the agent was given (nothing else):\n- email.txt\n</attachments_given>');
    expect(attachmentsGiven({ ...practice, missingAttachments: [] })).toContain('Referenced in the visible history but not in the case files: none');
  });
});
