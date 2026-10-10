import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    env: { CALLS_DIR: join(tmpdir(), 'dwelly-test-calls') },
    // Claude Code worktrees live inside the repo; their copies of the tests are not ours to run.
    exclude: [...configDefaults.exclude, '.claude/worktrees/**'],
  },
});
