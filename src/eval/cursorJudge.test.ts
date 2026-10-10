import { describe, expect, it } from 'vitest';
import { extractJson, isCursorModel } from './cursorJudge.js';

describe('cursorJudge', () => {
  it('selects the Cursor backend only for cursor: model ids', () => {
    expect(isCursorModel('cursor:composer-2.5')).toBe(true);
    expect(isCursorModel('claude-opus-5-5')).toBe(false);
  });

  it('reads a bare, fenced or wrapped JSON object', () => {
    expect(extractJson('{"a":1}')).toEqual({ a: 1 });
    expect(extractJson('Here you go:\n```json\n{"a":{"b":[1,2]}}\n```')).toEqual({ a: { b: [1, 2] } });
    expect(extractJson('Grades: {"a":"x}y"} done')).toEqual({ a: 'x}y' });
  });

  it('throws when there is no JSON object', () => {
    expect(() => extractJson('no grades here')).toThrow();
  });
});
