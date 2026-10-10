// Every case folder ingest must handle, minus the holdout split (never read, cut or tuned on).
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

/** Public cuts keep the organiser text (index.md, history.md, attachments/) local and git-ignored; a clone without it has only the grading files. */
export const hasCaseText = (dir: string) => !dir.startsWith('cases/public-cuts/') || existsSync(join(dir, 'index.md'));

const ROOTS = ['cases/practice', 'cases/public-cuts', 'cases/walks', 'HackatonPublicCases/Property Management'];

type Split = { dir: string; only: string[] };
const holdout = (): Split[] => JSON.parse(readFileSync('cases/splits.json', 'utf8')).holdout;

/** Holdout ids per root; public cuts and walks are named "<public id>-…", so they inherit the public holdout. */
function isHoldout(root: string, name: string, splits: Split[]): boolean {
  const id = name.split('-')[0];
  const publicRoot = root !== 'cases/practice';
  return splits.some((s) => (s.dir === root || (publicRoot && s.dir.startsWith('HackatonPublicCases/'))) && s.only.includes(id));
}

export function goldenFolders(): string[] {
  const splits = holdout();
  return ROOTS.flatMap((root) =>
    readdirSync(root)
      .filter((f) => statSync(join(root, f)).isDirectory() && !isHoldout(root, f, splits))
      .sort()
      .map((f) => join(root, f))
      .filter(hasCaseText),
  );
}
