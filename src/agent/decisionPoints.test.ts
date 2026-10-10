import { describe, expect, it } from 'vitest';
import { overlap, parseQuestions, unansweredQuestions } from './decisionPoints.js';

const brief = '# Case 21: Status plus an off-topic question\n\n- **Today:** x\n\n## Task\n\nDo it.\n\n## Questions / decision points\n\n1. Where does this case stand right now?\n2) What is the next action and who is it for?\n- Should we assign a provider?\n\nWrite your answer.\n\n## Other\n\n1. Not a question';

describe('parseQuestions', () => {
  it('reads numbered and bulleted items under a questions heading, not under the title or other sections', () => {
    expect(parseQuestions(brief)).toEqual(['Where does this case stand right now?', 'What is the next action and who is it for?', 'Should we assign a provider?']);
  });
  it('is empty when the brief lists no questions', () => {
    expect(parseQuestions('# Case\n\n## Task\n\n1. Do this')).toEqual([]);
  });
});

describe('unansweredQuestions', () => {
  it('names the one question of three that has no answer', () => {
    const answers = [
      { question: 'Where does the case stand right now?', answer: 'x' },
      { question: 'Next action, and for whom?', answer: 'y' },
    ];
    expect(unansweredQuestions(brief, answers)).toEqual(['Should we assign a provider?']);
  });
  it('accepts paraphrased questions and a full positional list', () => {
    expect(unansweredQuestions(brief, ['Where does this case stand?', 'What is the next action?', 'Should we assign a provider?'].map((question) => ({ question, answer: 'a' })))).toEqual([]);
    expect(unansweredQuestions(brief, ['Q1', 'Q2', 'Q3'].map((question) => ({ question, answer: 'a' })))).toEqual([]);
  });
  it('does not count an empty answer', () => {
    expect(unansweredQuestions(brief, [{ question: 'Should we assign a provider?', answer: ' ' }])).toHaveLength(3);
  });
  it('is empty when the brief has no questions section', () => {
    expect(unansweredQuestions('# Case\n\n## Task\n\nDo it.', [])).toEqual([]);
  });
  it('overlap ignores stop words and punctuation', () => {
    expect(overlap('What is the next action?', 'next action')).toBe(1);
  });
});
