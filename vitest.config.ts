import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({ test: { env: { CALLS_DIR: join(tmpdir(), 'dwelly-test-calls') } } });
