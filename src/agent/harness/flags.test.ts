import { describe, expect, it } from 'vitest';
import { HARNESS_FLAGS, NO_FLAGS, flagsLine, parseHarnessFlags } from './flags.js';

describe('harness flags', () => {
  it('are all off by default', () => {
    expect(parseHarnessFlags(undefined)).toEqual(NO_FLAGS);
    expect(parseHarnessFlags('')).toEqual(NO_FLAGS);
    expect(Object.values(NO_FLAGS).every((v) => v === false)).toBe(true);
  });

  it('turn on by name or all', () => {
    expect(parseHarnessFlags('brief, skills')).toMatchObject({ brief: true, skills: true, guardsV2: false });
    expect(Object.values(parseHarnessFlags('all')).every(Boolean)).toBe(true);
    expect(flagsLine(parseHarnessFlags('all'))).toBe(HARNESS_FLAGS.join(','));
    expect(flagsLine(NO_FLAGS)).toBe('none');
  });

  it('reject an unknown name instead of silently running without it', () => {
    expect(() => parseHarnessFlags('brief,skils')).toThrow(/unknown harness flag "skils"/);
  });
});
