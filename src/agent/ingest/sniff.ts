// Decides whether a file can be shown to the model as text, so binary garbage never reaches the prompt.
import { extname } from 'node:path';

// Containers and media we cannot read as text or send natively.
const BINARY_EXT = new Set(
  '.docx .doc .xlsx .xls .xlsm .pptx .ppt .odt .ods .odp .pages .numbers .key .msg .zip .gz .tgz .tar .7z .rar .bz2 .exe .dll .bin .dat .db .sqlite .heic .heif .tif .tiff .bmp .ico .psd .mp3 .wav .m4a .aac .ogg .flac .amr .mp4 .mov .avi .mkv .webm .3gp'.split(' '),
);

export const knownBinary = (path: string) => BINARY_EXT.has(extname(path).toLowerCase());

/** UTF-8 text when it decodes with almost no replacement or control characters; UTF-16 when it has a BOM. */
export function asText(buf: Buffer): string | undefined {
  if (buf.length >= 2 && ((buf[0] === 0xff && buf[1] === 0xfe) || (buf[0] === 0xfe && buf[1] === 0xff))) {
    return new TextDecoder(buf[0] === 0xff ? 'utf-16le' : 'utf-16be').decode(buf);
  }
  if (buf.subarray(0, 8192).includes(0)) return undefined;
  const text = buf.toString('utf8');
  if (!text.length) return text;
  const bad = (text.match(/[\ufffd\u0000-\u0008\u000e-\u001f\u007f]/g) ?? []).length;
  if (bad / text.length > 0.01) return undefined;
  return text;
}

export function unreadable(path: string, buf: Buffer): string | undefined {
  if (knownBinary(path)) return `binary ${extname(path).toLowerCase()} file`;
  return asText(buf) === undefined ? 'not valid text (binary or unknown encoding)' : undefined;
}

export const placeholder = (path: string, bytes: number, why: string) =>
  `[${path}: ${why}, ${bytes.toLocaleString('en-GB')} bytes. Its content could not be read and is not shown.]`;
