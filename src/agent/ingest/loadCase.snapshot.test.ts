// loadCase is the flags-off path (run.ts: fromLoadedCase(loadCase(...))); its output must not change.
// The hashes were recorded before ingest v2 existed.
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { loadCase } from '../cases.js';
import { goldenFolders } from './golden.js';

const hash = (v: unknown) => createHash('sha256').update(JSON.stringify(v)).digest('hex').slice(0, 16);

describe('loadCase on every golden folder', () => {
  it('is byte-identical to the recorded snapshot', () => {
    const hashes = Object.fromEntries(goldenFolders().map((d) => [d, hash(loadCase(d))]));
    expect(hashes).toMatchSnapshot();
  });
});
