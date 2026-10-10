import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadCase } from '../cases.js';
import { hasCaseText } from '../ingest/golden.js';
import { hintsFor } from './stateReconstruct.js';

// Pins the flags-off prompt: hintsFor output must not change while the brief layer reuses this module.
const HOLDOUT = new Set(['031', '036', '041', '045', '048', '050']);
const ROOTS = ['HackatonPublicCases/Property Management', 'cases/public-cuts'];
const dirs = ROOTS.flatMap((root) =>
  readdirSync(root, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !HOLDOUT.has(d.name.slice(0, 3)))
    .map((d) => join(root, d.name))
    .filter(hasCaseText)
    .sort(),
);

describe('hintsFor output is unchanged', () => {
  it.each(dirs)('%s', (dir) => {
    expect(hintsFor(loadCase(dir))).toMatchSnapshot();
  });
});
