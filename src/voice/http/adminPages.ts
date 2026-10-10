import { whatsappLink, whatsappMessage } from '../campaign.js';
import type { CallLog, Scenario, testerCard } from '../scenarios.js';
import type { CallRow, Tester } from '../store.js';

// Server-rendered admin views. Everything user-supplied (names, transcripts, tool args) goes through esc().

const esc = (v: unknown) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const when = (iso: string | null) => (iso ? new Date(iso).toLocaleString('en-GB', { timeZone: 'Europe/London', dateStyle: 'short', timeStyle: 'short' }) : '');
const dur = (s: number | null) => (s == null ? '' : `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`);

const STYLE = `
  :root { --bg:#f6f5f2; --panel:#fff; --ink:#1c1b19; --muted:#6b6860; --line:#e4e1da; --accent:#2f5d50; --pass:#1f7a4a; --fail:#b3261e; --warn:#9a6700; --chip:#eef3f1; }
  @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --bg:#151514; --panel:#1f1e1c; --ink:#ecebe7; --muted:#a29f96; --line:#33312d; --accent:#7fb8a4; --pass:#5cc48b; --fail:#ff8a80; --warn:#e3b341; --chip:#26302c; } }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--ink); font:14px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  header { display:flex; gap:16px; align-items:center; padding:12px 20px; border-bottom:1px solid var(--line); background:var(--panel); flex-wrap:wrap; }
  header h1 { font-size:16px; margin:0; } header a { color:var(--accent); }
  main { padding:16px 20px; max-width:1200px; margin:0 auto; }
  .panel { background:var(--panel); border:1px solid var(--line); border-radius:10px; padding:14px 16px; margin-bottom:16px; overflow-x:auto; }
  .panel h2 { font-size:12px; text-transform:uppercase; letter-spacing:.06em; color:var(--muted); margin:0 0 10px; }
  table { border-collapse:collapse; width:100%; } th, td { text-align:left; padding:6px 8px; border-bottom:1px solid var(--line); vertical-align:top; }
  th { font-size:12px; color:var(--muted); font-weight:600; }
  a { color:var(--accent); }
  .pass { color:var(--pass); font-weight:700; } .fail { color:var(--fail); font-weight:700; } .muted { color:var(--muted); }
  input, button { font:inherit; } input[type=text], input[type=number] { padding:6px 8px; border:1px solid var(--line); border-radius:6px; background:var(--panel); color:var(--ink); }
  button { padding:6px 12px; border-radius:6px; border:1px solid var(--accent); background:var(--accent); color:var(--panel); cursor:pointer; font-weight:600; }
  button.ghost { background:transparent; color:var(--accent); }
  code { font:12px ui-monospace, Menlo, monospace; word-break:break-all; }
  .msg { padding:6px 10px; border-radius:8px; background:var(--chip); margin:4px 0; max-width:85%; }
  .msg.user { margin-left:auto; background:transparent; border:1px solid var(--line); }
  .msg small { display:block; color:var(--muted); font-size:11px; }
  .tool { font:12px/1.4 ui-monospace, Menlo, monospace; padding:6px 8px; border-left:3px solid var(--line); margin-bottom:4px; word-break:break-word; }
  .tool.ok { border-color:var(--pass); } .tool.bad { border-color:var(--fail); } .tool.write { border-color:var(--warn); }
  .grid { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:16px; } @media (max-width:900px) { .grid { grid-template-columns:1fr; } main { padding:16px; } }
  form.inline { display:flex; gap:8px; flex-wrap:wrap; align-items:center; }`;

const shell = (title: string, body: string, script = '') => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title><style>${STYLE}</style></head><body>
<header><h1>Voice testing</h1><a href="/admin">Calls &amp; invites</a><a href="/admin/console">Test console</a></header>
<main>${body}</main><script>${script}</script></body></html>`;

const verdict = (c: Pick<CallRow, 'passed' | 'status'>) =>
  c.passed === true ? '<span class="pass">PASS</span>' : c.passed === false ? '<span class="fail">FAIL</span>' : `<span class="muted">${esc(c.status)}</span>`;

type Card = ReturnType<typeof testerCard>;

export function adminHomePage(testers: Tester[], calls: CallRow[], base: string, cards: Card[] = [], phoneReady = false, callerId = '') {
  const testerRows = testers
    .map((t) => {
      const link = `${base.replace(/\/$/, '')}/t/${t.token}`;
      const card = cards.find((c) => c.id === t.scenario_id);
      const message = whatsappMessage(card, { name: t.name, from: callerId, link, phone: !!t.phone && phoneReady });
      const wa = t.phone ? whatsappLink(message, t.phone) : whatsappLink(message);
      return `<tr><td>${esc(t.name)}${t.phone ? `<br><span class="muted">${esc(t.phone)}</span>` : ''}</td>
        <td><code>${esc(link)}</code><br><span class="muted">${esc(card?.title ?? 'rotating cases')}</span></td>
        <td style="white-space:nowrap"><a href="${esc(wa)}" target="_blank" rel="noopener"><button class="ghost" type="button">WhatsApp</button></a>
          <button class="ghost" data-copy="${esc(message)}">Copy message</button></td>
        <td>${t.daily_cap}/day</td><td>${t.revoked ? '<span class="fail">revoked</span>' : 'active'}</td>
        <td><button class="ghost" data-revoke="${esc(t.id)}" data-to="${t.revoked ? 'false' : 'true'}">${t.revoked ? 'Restore' : 'Revoke'}</button></td></tr>`;
    })
    .join('');
  const callRows = calls
    .map(
      (c) => `<tr><td><a href="/admin/calls/${esc(c.conversation_id)}">${esc(when(c.started_at))}</a></td><td>${esc(c.tester_name ?? 'admin console')}</td>
      <td>${esc(c.scenario_id)}</td><td>${esc(c.brain)}</td><td>${dur(c.duration_secs)}</td><td>${verdict(c)}</td>
      <td>${c.flags?.length ? `<span class="fail">${c.flags.length}</span>` : ''}</td>
      <td>${c.feedback?.rating ? `${'★'.repeat(c.feedback.rating)}` : ''}${c.feedback?.comment ? ` <span class="muted" title="${esc(c.feedback.comment)}">💬</span>` : ''}</td></tr>`,
    )
    .join('');
  const passed = calls.filter((c) => c.passed === true).length;
  const graded = calls.filter((c) => c.passed !== null).length;
  return shell(
    'Voice testing',
    `<div class="panel"><h2>Call a phone</h2>
      ${phoneReady ? '' : '<p class="fail">Set ELEVENLABS_PHONE_NUMBER_ID to enable outbound calls.</p>'}
      <form class="inline" id="phone"><select name="scenarioId">${cards.map((c) => `<option value="${esc(c.id)}">${esc(c.title)}</option>`).join('')}</select>
      <input type="text" name="to" placeholder="+447700900123" required pattern="\\+[1-9][0-9]{7,14}" style="width:170px">
      <button ${phoneReady ? '' : 'disabled'}>Call</button></form>
      <p class="muted">The agent rings this number from our Twilio number. On a Twilio trial account, press any key when the trial message plays. The call is graded when you hang up.</p>
      <div id="card"></div></div>
    <div class="panel"><h2>Invite someone</h2>
      <form class="inline" id="invite"><input type="text" name="name" placeholder="Name, e.g. Mum" required maxlength="60">
      <input type="text" name="phone" placeholder="Phone (optional) +447…" style="width:170px">
      <select name="scenarioId"><option value="">Rotate cases</option>${cards.map((c) => `<option value="${esc(c.id)}">${esc(c.title)}</option>`).join('')}</select>
      <label class="muted">Calls per day <input type="number" name="dailyCap" value="10" min="1" max="50" style="width:70px"></label>
      <button>Create link</button></form>
      <p class="muted">Each person gets their own link. With a phone number, their page has a "Call me now" button that makes the agent ring them; without one they call from the browser. Calls are tagged with their name and capped per day.</p></div>
    <div class="panel"><h2>Invites</h2><table><tr><th>Name</th><th>Link and case</th><th>Send</th><th>Cap</th><th>Status</th><th></th></tr>${testerRows || '<tr><td colspan="6" class="muted">No invites yet.</td></tr>'}</table>
      <p class="muted">WhatsApp opens your own chat with the message ready (on a Mac it sometimes drops the text: use Copy message and paste).</p></div>
    <div class="panel"><h2>Calls (${passed}/${graded} passed)</h2><table><tr><th>When (UK)</th><th>Who</th><th>Scenario</th><th>Brain</th><th>Length</th><th>Grade</th><th>Flags</th><th>Tester said</th></tr>
      ${callRows || '<tr><td colspan="8" class="muted">No calls yet.</td></tr>'}</table></div>`,
    `const CARDS = ${JSON.stringify(cards).replace(/</g, '\\u003c')};
    const escH = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
    const phoneForm = document.getElementById('phone');
    const showCard = (c, note) => { document.getElementById('card').innerHTML = c ? '<div class="panel" style="margin-top:10px"><h2>' + escH(c.role) + '</h2><p style="font-size:18px;margin:0"><b>You are playing ' + escH(c.persona) + '</b></p><p class="muted">' + escH(c.who) + '</p><p><b>When the phone rings:</b> ' + escH(c.opening) + '</p><b>What to do on the call</b><ol>' + c.beats.map((b) => '<li>' + escH(b) + '</li>').join('') + '</ol><b>Details, if they ask</b><ul>' + c.facts.map(([k, v]) => '<li>' + escH(k) + ': <b>' + escH(v) + '</b></li>').join('') + '</ul>' + (note || '') + '</div>' : ''; };
    try { phoneForm.to.value = localStorage.getItem('voice-phone') || ''; } catch {}
    phoneForm.scenarioId.addEventListener('change', () => showCard(CARDS.find((c) => c.id === phoneForm.scenarioId.value)));
    showCard(CARDS.find((c) => c.id === phoneForm.scenarioId.value));
    phoneForm.addEventListener('submit', async (e) => {
      e.preventDefault(); const f = new FormData(phoneForm); const btn = phoneForm.querySelector('button');
      try { localStorage.setItem('voice-phone', f.get('to')); } catch {}
      btn.disabled = true; btn.textContent = 'Calling…';
      const r = await fetch('/admin/api/phone-call', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ scenarioId: f.get('scenarioId'), to: f.get('to') }) });
      const out = await r.json().catch(() => ({}));
      btn.disabled = false; btn.textContent = 'Call';
      if (!r.ok) return alert(out.error || 'Call failed');
      showCard(out.card, '<p><b>Ringing ' + escH(out.to) + ' now.</b> <a href="/admin/calls/' + encodeURIComponent(out.conversationId) + '">Open this call</a> (graded after you hang up).</p>');
    });
    document.getElementById('invite').addEventListener('submit', async (e) => {
      e.preventDefault(); const f = new FormData(e.target);
      const r = await fetch('/admin/api/testers', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: f.get('name'), dailyCap: f.get('dailyCap'), phone: f.get('phone') || null, scenarioId: f.get('scenarioId') || null }) });
      if (r.ok) location.reload(); else alert(await r.text());
    });
    document.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', async () => { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = 'Copied ✓'; }));
    document.querySelectorAll('[data-revoke]').forEach((b) => b.addEventListener('click', async () => {
      await fetch('/admin/api/testers/' + b.dataset.revoke + '/revoke', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ revoked: b.dataset.to === 'true' }) });
      location.reload();
    }));`,
  );
}

export function adminCallPage(call: CallRow, log: CallLog, scenario: Scenario | undefined) {
  const transcript = (call.transcript ?? [])
    .filter((t) => t.message)
    .map((t) => `<div class="msg ${t.role === 'user' ? 'user' : ''}"><small>${t.role === 'user' ? 'caller' : 'agent'} · ${Math.round(t.time_in_call_secs ?? 0)}s${t.interrupted ? ' · interrupted' : ''}</small>${esc(t.message)}</div>`)
    .join('');
  const tools = [
    ...log.tools.map((t) => `<div class="tool ${t.result?.ok === false ? 'bad' : 'ok'}"><b>${esc(t.name)}</b> ${esc(JSON.stringify(t.args))}<br>→ ${esc(JSON.stringify(t.result).slice(0, 300))}</div>`),
    ...log.refused.map((n) => `<div class="tool bad"><b>${esc(n)}</b> refused: no read-back confirmation</div>`),
    ...log.ledger.map((e) => `<div class="tool write">ledger: <b>${esc(e.tool)}</b> ${esc(e.status)}${e.ref ? ` (${esc(e.ref)})` : ''}</div>`),
  ].join('');
  const analysis = (call.analysis ?? {}) as { transcript_summary?: string; data_collection_results?: Record<string, { value: unknown }> };
  const extracted = Object.entries(analysis.data_collection_results ?? {})
    .map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(JSON.stringify(v.value))}</td></tr>`)
    .join('');
  return shell(
    `Call ${call.conversation_id}`,
    `<div class="panel"><h2>${esc(scenario?.title ?? call.scenario_id)}</h2>
      <p>${verdict(call)} · ${esc(call.tester_name ?? 'admin console')} · ${esc(when(call.started_at))} · ${dur(call.duration_secs)} · brain ${esc(call.brain)} · <code>${esc(call.conversation_id)}</code></p>
      <audio controls preload="none" src="/admin/api/calls/${esc(call.conversation_id)}/audio" style="width:100%"></audio>
      <p><button class="ghost" id="regrade">Regrade</button></p></div>
    <div class="grid">
      <div>
        <div class="panel"><h2>Grade</h2>${(call.grade ?? []).map((r) => `<div>${r.pass ? '<span class="pass">✓</span>' : '<span class="fail">✗</span>'} ${esc(r.label)}</div>`).join('') || '<span class="muted">Not graded yet.</span>'}</div>
        <div class="panel"><h2>What the tester said</h2>${call.feedback ? `<p>${call.feedback.rating ? `${'★'.repeat(call.feedback.rating)}${'☆'.repeat(5 - call.feedback.rating)} natural` : 'no rating'}</p><p>${esc(call.feedback.comment)}</p>` : '<span class="muted">No feedback.</span>'}</div>
        <div class="panel"><h2>Needs a look</h2>${(call.flags ?? []).map((f) => `<div class="fail">• ${esc(f)}</div>`).join('') || '<span class="muted">Nothing flagged.</span>'}</div>
        <div class="panel"><h2>What a good agent does</h2><ul>${(scenario?.expected ?? []).map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
        <div class="panel"><h2>What the agent did (server log)</h2>${tools || '<span class="muted">No tool calls.</span>'}</div>
      </div>
      <div>
        <div class="panel"><h2>Summary (ElevenLabs)</h2><p>${esc(analysis.transcript_summary ?? '')}</p><table>${extracted}</table></div>
        <div class="panel"><h2>Transcript</h2>${transcript || '<span class="muted">Not available yet: regrade in a minute.</span>'}</div>
      </div>
    </div>`,
    `document.getElementById('regrade').addEventListener('click', async (e) => {
      e.target.textContent = 'Regrading…';
      await fetch('/admin/api/calls/${esc(call.conversation_id)}/regrade', { method: 'POST' });
      location.reload();
    });`,
  );
}
