import { describe, expect, it } from 'vitest';
import { readOrganiserEnv, renameArgs, resolveTarget } from './toolMap.js';

const quiet = () => {};

describe('readOrganiserEnv', () => {
  it('is off without a URL', () => {
    expect(readOrganiserEnv({})).toBeUndefined();
    expect(readOrganiserEnv({ ORGANISER_API_URL: '  ' })).toBeUndefined();
  });

  it('applies ORGANISER_TOOL_MAP overrides', () => {
    const cfg = readOrganiserEnv({
      ORGANISER_API_URL: 'http://api.example.test/v1/',
      ORGANISER_TOOL_MAP: JSON.stringify({ send_message: { tool: 'send_email', route: 'POST /emails', args: { body: 'text' } }, add_note: null, log_call: 'record_call' }),
    })!;
    expect(cfg.url).toBe('http://api.example.test/v1');
    expect(resolveTarget('send_message', cfg)).toEqual({ tool: 'send_email', method: 'POST', path: '/emails', args: { body: 'text' } });
    expect(resolveTarget('add_note', cfg)).toBeUndefined();
    expect(resolveTarget('log_call', cfg)).toMatchObject({ tool: 'record_call', path: '/tools/record_call' });
    expect(resolveTarget('get_ticket', cfg)).toMatchObject({ tool: 'get_ticket', method: 'POST', path: '/tools/get_ticket' });
    expect(resolveTarget('put_on_hold', cfg)).toBeUndefined();
  });

  it('maps the identity and consent tools by default', () => {
    const cfg = readOrganiserEnv({ ORGANISER_API_URL: 'http://x.test' }, quiet)!;
    expect(resolveTarget('verify_identity', cfg)).toMatchObject({ tool: 'verify_identity', path: '/tools/verify_identity' });
    expect(resolveTarget('share_tenant_contact', cfg)).toMatchObject({ tool: 'share_tenant_contact', path: '/tools/share_tenant_contact' });
  });

  it('disables itself with a warning on bad configuration', () => {
    const warnings: string[] = [];
    expect(readOrganiserEnv({ ORGANISER_API_URL: 'http://x.test', ORGANISER_TOOL_MAP: '{nope' }, (s) => warnings.push(s))).toBeUndefined();
    expect(readOrganiserEnv({ ORGANISER_API_URL: 'http://x.test', ORGANISER_API_TRANSPORT: 'mcp' }, (s) => warnings.push(s))).toBeUndefined();
    expect(readOrganiserEnv({ ORGANISER_API_URL: 'not a url' }, (s) => warnings.push(s))).toBeUndefined();
    expect(warnings).toEqual([expect.stringMatching(/not valid JSON/), expect.stringMatching(/mcp is not supported/), expect.stringMatching(/not a valid URL/)]);
  });

  it('keeps the key out of everything but the config object', () => {
    const cfg = readOrganiserEnv({ ORGANISER_API_URL: 'http://x.test', ORGANISER_API_KEY: 'sk-test-123' }, quiet)!;
    expect(cfg.key).toBe('sk-test-123');
    expect(cfg.host).toBe('x.test');
  });
});

describe('renameArgs', () => {
  it('renames shallowly and passes the rest through', () => {
    expect(renameArgs({ body: 'hi', recipient_name: 'Sam' }, { body: 'text' })).toEqual({ text: 'hi', recipient_name: 'Sam' });
  });
});
