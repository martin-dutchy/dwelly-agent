// HTTP calls to the organiser tool API. Throws on any transport failure; the adapter turns that into a trip.
import type { OrganiserConfig, Target } from './toolMap.js';

export type HttpReply = { status: number; body: any };

export async function httpCall(cfg: OrganiserConfig, target: Target, args: Record<string, unknown>): Promise<HttpReply> {
  const headers: Record<string, string> = { accept: 'application/json' };
  if (cfg.key) headers.authorization = `Bearer ${cfg.key}`;
  let url = `${cfg.url}${target.path}`;
  let body: string | undefined;
  if (target.method === 'GET' || target.method === 'DELETE') {
    const q = new URLSearchParams(Object.entries(args).map(([k, v]) => [k, typeof v === 'string' ? v : JSON.stringify(v)]));
    if ([...q].length) url += `${url.includes('?') ? '&' : '?'}${q}`;
  } else {
    headers['content-type'] = 'application/json';
    body = JSON.stringify(args);
  }
  let res: Response;
  try {
    res = await fetch(url, { method: target.method, headers, body, signal: AbortSignal.timeout(cfg.timeoutMs) });
  } catch (e) {
    const name = (e as Error)?.name;
    throw new Error(name === 'TimeoutError' || name === 'AbortError' ? `timeout after ${cfg.timeoutMs / 1000}s` : `network error: ${(e as Error)?.message ?? e}`);
  }
  const text = await res.text().catch(() => '');
  if (res.status >= 400) throw new Error(`HTTP ${res.status}`);
  try {
    return { status: res.status, body: text.trim() ? JSON.parse(text) : {} };
  } catch {
    throw new Error(`HTTP ${res.status} with a non-JSON body`);
  }
}
