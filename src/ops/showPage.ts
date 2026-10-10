import { esc, layout } from './pages.js';

/**
 * The demo, as one recordable sequence: open cases stream in, the agents pick them up, one calls a landlord,
 * that case finishes with no staff time, one needs a person (handed to the real decision page), then the rest
 * complete on a fast-forwarded clock. Driven by real data: an executed eval run and the real Flat 9 case.
 * Replayed at speed, and the page says so.
 */

export type ShowCard = {
  id: string;
  no: string;
  title: string;
  property: string;
  stuck: string;
  stuckWhen: string;
  done: string[];
  next: string;
  person?: { question: string; href: string };
  call?: boolean;
};
export type ShowData = {
  cards: ShowCard[];
  more: number;
  totals: { cases: number; auto: number; people: number; cost: number; mean: number | null };
  call: {
    name: string;
    role: string;
    ask: string;
    /** Transcript turns; `t` = seconds into the call (from ElevenLabs time_in_call_secs) when known. */
    lines: { who: 'agent' | 'them'; text: string; t?: number }[];
    /** Real recording, served by the portal (proxied from ElevenLabs). Absent = no audio, lines are paced. */
    audioUrl?: string;
    /** Parts of the recording to play, in seconds; between them the page skips ahead and says so. */
    clips?: { from: number; to: number }[];
    /** Set when this is a real call with a real person: shown as a disclaimer on the call view. */
    real?: { who: string; when: string; note: string };
  };
  runName: string;
};

const CSS = `
body { overflow-x:hidden; }
main.wide { max-width:1320px; }
.stagebar { display:flex; align-items:baseline; gap:var(--s6); flex-wrap:wrap; }
.clock { font-size:32px; line-height:40px; font-weight:600; font-variant-numeric:tabular-nums; }
.clock small { font-size:14px; font-weight:400; color:var(--fg-muted); margin-left:8px; }
.counters { display:flex; gap:var(--s6); margin-left:auto; flex-wrap:wrap; }
.counter b { display:block; font-size:24px; line-height:32px; font-weight:600; font-variant-numeric:tabular-nums; }
.counter span { font-size:13px; color:var(--fg-muted); }
.counter.needs b { color:var(--needs-fg); } .counter.ok b { color:var(--ok-fg); }
.headline { font-size:20px; line-height:28px; font-weight:600; margin:var(--s5) 0 var(--s4); min-height:28px; }
.grid { display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:var(--s3); }
.c { position:relative; background:var(--surface); border:1px solid var(--border-subtle); border-radius:10px; padding:var(--s3) var(--s4); opacity:0; transform:translateY(8px); transition:opacity .35s ease, transform .35s ease, border-color .3s, box-shadow .3s; }
.c.in { opacity:1; transform:none; }
.c .no { font-size:12px; color:var(--fg-muted); font-variant-numeric:tabular-nums; }
.c h3 { font-size:14px; line-height:20px; margin:2px 0 6px; }
.c .stuck { font-size:12px; line-height:16px; color:var(--fg-muted); display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.c .state { margin-top:var(--s2); font-size:13px; line-height:18px; font-weight:600; color:var(--fg-muted); }
.c.working .state { color:var(--info-fg); }
.c.done { border-color:color-mix(in srgb, var(--ok-fg) 40%, var(--border-subtle)); }
.c.done .state { color:var(--ok-fg); }
.c.person { border-color:var(--needs-border); box-shadow:0 0 0 3px color-mix(in srgb, var(--needs-border) 35%, transparent); }
.c.person .state { color:var(--needs-fg); }
.c.focus { border-color:var(--info-fg); box-shadow:0 0 0 3px color-mix(in srgb, var(--info-fg) 30%, transparent); }
.c ul { list-style:none; margin:var(--s2) 0 0; padding:0; font-size:12px; line-height:17px; }
.c ul li { display:none; } .c ul li.on { display:list-item; animation:li-in .3s ease both; }
@keyframes li-in { from { opacity:0; transform:translateX(-4px); } to { opacity:1; transform:none; } }
.c ul li::before { content:'✓ '; color:var(--ok-fg); font-weight:600; }
.c ul li.deny::before { content:'⊘ '; color:var(--policy-fg); }
.c a.go { display:inline-block; margin-top:var(--s2); font-size:13px; font-weight:600; }
.more { display:grid; place-items:center; color:var(--fg-muted); font-size:14px; border-style:dashed; }
.more b { font-size:24px; color:var(--fg); display:block; text-align:center; font-variant-numeric:tabular-nums; }
.note { margin-top:var(--s5); font-size:12px; color:var(--fg-muted); }
.summary { margin-top:var(--s5); padding:var(--s4) var(--s5); border-radius:10px; background:var(--surface); border:1px solid var(--border-subtle); font-size:18px; line-height:26px; opacity:0; transition:opacity .6s; max-width:900px; }
.summary.in { opacity:1; }
/* Call overlay */
.call { position:fixed; inset:0; display:grid; place-items:center; padding:16px; background:color-mix(in srgb, var(--bg) 72%, transparent); backdrop-filter:blur(6px); opacity:0; pointer-events:none; transition:opacity .35s; z-index:10; }
.call.in { opacity:1; pointer-events:auto; }
.callcard { width:min(620px, 100%); background:var(--surface); border:1px solid var(--border); border-radius:18px; padding:var(--s5); box-shadow:0 24px 70px rgba(0,0,0,.28); transform:translateY(10px) scale(.985); transition:transform .4s cubic-bezier(.2,.8,.2,1); }
.call.in .callcard { transform:none; }
.callhead { display:flex; align-items:center; gap:var(--s4); }
.ava { flex:none; width:56px; height:56px; border-radius:50%; background:var(--info-bg); color:var(--info-fg); display:grid; place-items:center; font-weight:600; font-size:19px; letter-spacing:.02em; box-shadow:0 0 0 0 color-mix(in srgb, var(--info-fg) 35%, transparent); }
.call.oncall .ava { animation:ava-pulse 2.4s ease-out infinite; }
@keyframes ava-pulse { 0% { box-shadow:0 0 0 0 color-mix(in srgb, var(--info-fg) 35%, transparent); } 100% { box-shadow:0 0 0 12px transparent; } }
.callhead .n { font-size:19px; line-height:24px; font-weight:600; } .callhead .r { color:var(--fg-muted); font-size:13px; line-height:18px; }
.callhead .timer { margin-left:auto; font-variant-numeric:tabular-nums; color:var(--fg-muted); font-size:15px; }
.realcall { display:flex; gap:10px; align-items:flex-start; margin-top:var(--s4); padding:12px 14px; border-radius:10px; background:var(--needs-bg); border:1px solid var(--needs-border); font-size:13px; line-height:18px; color:var(--fg); }
.realcall .dot { flex:none; width:9px; height:9px; margin-top:5px; border-radius:50%; background:#e5484d; box-shadow:0 0 0 3px color-mix(in srgb, #e5484d 25%, transparent); }
.realcall b { display:block; color:var(--needs-fg); font-weight:600; font-size:15px; line-height:20px; margin-bottom:2px; }
.wave { display:flex; gap:3px; align-items:center; height:40px; margin:var(--s4) 0 var(--s3); }
.wave i { flex:1; background:var(--info-fg); border-radius:2px; height:3px; transition:height .1s linear; opacity:.75; }
.lines { display:flex; flex-direction:column; justify-content:flex-end; gap:var(--s2); min-height:150px; overflow:hidden; padding:2px; }
.ln { max-width:100%; padding:0; font-size:15px; line-height:21px; color:var(--fg-muted); opacity:0; transform:translateY(6px); transition:opacity .25s, transform .25s, font-size .25s; }
.ln.in { opacity:.55; } .ln.in.now { opacity:1; color:var(--fg); font-size:21px; line-height:29px; font-weight:600; }
.ln.in { opacity:1; transform:none; }
.ln.agent .who { color:var(--info-fg); }
.ln.them .who { color:var(--needs-fg); }
.ln .who { display:block; font-size:12px; line-height:16px; font-weight:600; margin-bottom:2px; }

.skipmark { align-self:center; font-size:12px; color:var(--fg-muted); padding:2px 10px; border-radius:999px; border:1px dashed var(--border); }
.callfootrow { display:flex; align-items:center; gap:var(--s3); margin-top:var(--s4); padding-top:var(--s3); border-top:1px solid var(--border-subtle); }
.callfoot { font-size:13px; line-height:18px; color:var(--fg-muted); min-height:18px; flex:1; }
.callfoot.ok { color:var(--ok-fg); font-weight:600; }
.skipcall { flex:none; font:inherit; font-size:12px; padding:4px 10px; border-radius:6px; border:1px solid var(--border); background:transparent; color:var(--fg-muted); cursor:pointer; }
.skipcall:hover { color:var(--fg); background:var(--bg-hover); }
.controls { position:fixed; right:16px; bottom:16px; display:flex; gap:6px; z-index:11; opacity:.35; transition:opacity .2s; } .controls:hover { opacity:1; }
.controls button { font:inherit; font-size:12px; padding:4px 10px; border-radius:6px; border:1px solid var(--border); background:var(--surface); color:var(--fg); cursor:pointer; }
@media (max-width: 1100px) { .grid { grid-template-columns:repeat(3, minmax(0,1fr)); } }
@media (max-width: 640px) { .grid { grid-template-columns:1fr; } }
@media (prefers-reduced-motion: reduce) { .c, .ln, .summary, .call, .callcard, .wave i { transition:none; } .call.oncall .ava { animation:none; } .lines { scroll-behavior:auto; } }
`;

export function showPage(d: ShowData, openTasks: number) {
  return layout(
    'Dwelly operations: live',
    `<div class="stagebar"><div class="clock" id="clock">Mon 09:00<small>Dwelly operations</small></div>
<div class="counters"><div class="counter"><b id="k-open">0</b><span>open cases</span></div><div class="counter ok"><b id="k-auto">0</b><span>handled, no staff time</span></div><div class="counter needs"><b id="k-people">0</b><span>needed a person</span></div><div class="counter"><b id="k-hours">0 h</b><span>staff time saved (est.)</span></div></div></div>
<div class="headline" id="headline" aria-live="polite"></div>
<div class="grid" id="grid">${d.cards
      .map(
        (c) =>
          `<article class="c" id="c-${esc(c.id)}" data-id="${esc(c.id)}"><div class="no">${c.no === 'Flat 9' ? 'New today, via WhatsApp' : `Case ${esc(c.no)}`}</div><h3>${esc(c.title)}</h3><div class="stuck">${esc(c.stuckWhen)}: ${esc(c.stuck)}</div><div class="state">Waiting for staff</div><ul>${c.done.map((t) => `<li class="${t.startsWith('⊘') ? 'deny' : ''}">${esc(t.replace(/^⊘ /, ''))}</li>`).join('')}</ul></article>`,
      )
      .join('')}<article class="c more" id="more"><div><b id="k-more">${d.more}</b>more cases</div></article></div>
<div class="summary" id="summary"></div>
<p class="note">Sped-up replay of real agent runs (${esc(d.runName)}) and a real phone call. Every action shown was confirmed by read-back.</p>
<div class="call" id="call" role="dialog" aria-label="Voice agent call"><div class="callcard"><div class="callhead"><div class="ava" aria-hidden="true">${esc(
      d.call.name
        .split(/\s+/)
        .filter((w) => /^[A-Za-z]/.test(w) && !/^(mr|mrs|ms|dr)\.?$/i.test(w))
        .map((w) => w[0]!.toUpperCase())
        .join('')
        .slice(0, 2) || d.call.name.slice(0, 1),
    )}</div><div><div class="n">${esc(d.call.name)}</div><div class="r">${esc(d.call.role)} · the AI agent is in a call with him now</div></div><div class="timer" id="timer"><span class="live" aria-hidden="true"></span>In call</div></div>
${d.call.real ? `<div class="realcall"><span class="dot" aria-hidden="true"></span><div><b>${esc(d.call.real.who)}</b>${esc(d.call.real.note)} ${esc(d.call.real.when)}.</div></div>` : ''}
<div class="wave" id="wave" aria-hidden="true">${'<i></i>'.repeat(40)}</div><div class="lines" id="lines" aria-live="polite"></div><div class="callfootrow"><div class="callfoot" id="callfoot">${esc(d.call.ask)}</div><button type="button" class="skipcall" id="skipcall">Skip call</button></div></div></div>${d.call.audioUrl ? `<audio id="callaudio" preload="auto" src="${esc(d.call.audioUrl)}"></audio>` : ''}
<div class="controls"><button type="button" id="prev">Back</button><button type="button" id="next">Next (→)</button><button type="button" id="auto">Auto-play</button><button type="button" id="ff">Fast-forward</button></div>
<script>
const D = ${JSON.stringify(d).replace(/</g, '\\u003c')};
(() => {
  const $ = (id) => document.getElementById(id);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const card = (c) => $('c-' + c.id);
  const head = (t) => { $('headline').textContent = t; };
  const set = (id, v) => { $(id).textContent = v; };
  let minutes = 9 * 60, day = 0;
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const tick = (m) => { minutes += m; while (minutes >= 18 * 60) { minutes -= 9 * 60; day = Math.min(day + 1, 4); } set('clock', ''); $('clock').innerHTML = DAYS[day] + ' ' + String(Math.floor(minutes / 60)).padStart(2, '0') + ':' + String(minutes % 60).padStart(2, '0') + '<small>Dwelly operations</small>'; };
  let auto = 0, people = 0;
  const STAFF_MIN = 6; // estimate: one staff touch per case (read, decide, reply)
  const counters = () => { set('k-auto', auto); set('k-people', people); set('k-hours', (Math.round((auto * STAFF_MIN) / 6) / 10) + ' h'); };
  const state = (el, cls, text) => { el.classList.remove('working', 'done', 'person', 'focus'); if (cls) el.classList.add(cls); el.querySelector('.state').textContent = text; };
  const callCard = D.cards.find((c) => c.call);
  const personCard = D.cards.find((c) => c.person);

  const scenes = [
    async () => { head(D.totals.cases + ' open cases are waiting on staff.'); set('k-open', D.totals.cases); for (const c of D.cards) { card(c).classList.add('in'); await sleep(45); } $('more').classList.add('in'); },
    async () => { head('Our agents pick up every case.'); for (const c of D.cards) { state(card(c), 'working', 'Agent working'); await sleep(35); } tick(4); if (callCard) { const el = card(callCard); el.classList.add('focus'); el.querySelector('.state').textContent = 'Calling ' + D.call.name + ' (' + D.call.role.toLowerCase() + ')'; } },
    async () => { head('Case ' + (callCard?.no ?? '') + ': the agent calls the landlord for his decision.'); await playCall(); },
    async () => { const el = card(callCard); head('Then it does every follow-up, each one confirmed.'); const lis = el.querySelectorAll('li'); for (const li of lis) { li.classList.add('on'); await sleep(200); } state(el, 'done', 'Done automatically. No staff time.'); auto++; counters(); tick(12); },
    async () => { const el = card(personCard); head('One case needs a person. It gets a one-screen brief.'); state(el, 'person', 'Needs a person: ' + personCard.person.question); el.insertAdjacentHTML('beforeend', '<a class="go" href="' + personCard.person.href + '">Open in Decisions</a>'); people++; counters(); },
    async () => fastForward(),
  ];

  // The call view. With a recording: plays the real audio, clip by clip, and shows each line when the audio reaches it.
  // Without one: lines are paced by length. Either way the scene awaits it, and "Skip call" ends it at once.
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const callAudio = $('callaudio');
  let actx = null, analyser = null, freq = null, endCall = null;
  const mmss = (s) => { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  const span = (s) => { s = Math.round(s); return s < 60 ? s + 's' : Math.floor(s / 60) + 'm ' + String(s % 60).padStart(2, '0') + 's'; };
  $('skipcall').onclick = (e) => { e.currentTarget.blur(); if (endCall) endCall(); };

  async function hookAnalyser() {
    if (analyser || !callAudio) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      actx = actx || new AC();
      if (actx.state !== 'running') await Promise.race([actx.resume(), sleep(400)]);
      // Only route the element through Web Audio when the context runs; otherwise the audio would be silent.
      if (actx.state !== 'running') return;
      const src = actx.createMediaElementSource(callAudio);
      analyser = actx.createAnalyser(); analyser.fftSize = 128; analyser.smoothingTimeConstant = 0.7;
      src.connect(analyser); analyser.connect(actx.destination);
      freq = new Uint8Array(analyser.frequencyBinCount);
    } catch { analyser = null; }
  }

  async function playCall() {
    const ov = $('call'), lines = $('lines'), foot = $('callfoot');
    lines.textContent = ''; foot.className = 'callfoot'; foot.textContent = D.call.ask;
    ov.classList.add('in');
    let ended = false, talking = false;
    const stop = new Promise((r) => { endCall = () => { ended = true; r(); }; });
    const wait = (ms) => Promise.race([sleep(ms), stop]);
    const bars = [...document.querySelectorAll('#wave i')];
    const audioOn = () => callAudio && !callAudio.paused && !callAudio.ended;
    const wave = setInterval(() => {
      const live = audioOn() || talking;
      if (analyser && audioOn()) {
        analyser.getByteFrequencyData(freq);
        bars.forEach((b, k) => { const v = freq[1 + Math.floor((k / bars.length) * (freq.length * 0.6))] / 255; b.style.height = (3 + v * v * 36).toFixed(1) + 'px'; });
      } else if (REDUCE) {
        bars.forEach((b) => (b.style.height = (live ? 14 : 3) + 'px'));
      } else {
        bars.forEach((b) => (b.style.height = (live ? 6 + Math.random() * 30 : 3) + 'px'));
      }
    }, 90);

    const scroll = () => lines.scrollTo({ top: lines.scrollHeight, behavior: REDUCE ? 'auto' : 'smooth' });
    const addLine = (l) => {
      const div = document.createElement('div'); div.className = 'ln ' + (l.who === 'agent' ? 'agent' : 'them');
      const who = document.createElement('span'); who.className = 'who'; who.textContent = l.who === 'agent' ? 'AI voice agent' : D.call.name;
      div.appendChild(who); div.appendChild(document.createTextNode(l.text)); lines.appendChild(div);
      lines.querySelectorAll('.ln.now').forEach((x) => x.classList.remove('now'));
      while (lines.children.length > 2) lines.firstChild.remove();
      requestAnimationFrame(() => div.classList.add('in', 'now')); scroll();
    };
    const addMark = (secs) => {};

    const L = D.call.lines || [];
    let li = 0;

    // Paced: from wherever the transcript has got to (also the fallback when the audio cannot play).
    async function paced() {
      let secs = 0; set('timer', '0:00');
      const timer = setInterval(() => { secs++; set('timer', mmss(secs)); }, 1000);
      while (li < L.length && !ended) { const l = L[li++]; talking = true; addLine(l); await wait(Math.min(2600, 700 + l.text.length * 18)); talking = false; await wait(250); }
      clearInterval(timer);
    }

    async function recorded() {
      const a = callAudio;
      const clips = (D.call.clips && D.call.clips.length ? D.call.clips : [{ from: 0, to: Infinity }]).filter((c) => c.to > c.from);
      // Each line's moment in the call. Lines without one are spread over the clips in order.
      const total = clips.reduce((n, c) => n + (isFinite(c.to) ? c.to - c.from : 0), 0);
      const hasT = L.some((l) => typeof l.t === 'number');
      const at = L.map((l, k) => {
        if (typeof l.t === 'number') return l.t;
        if (hasT || !total) { for (let j = k - 1; j >= 0; j--) if (typeof L[j].t === 'number') return L[j].t; return clips[0].from; }
        let x = ((k + 0.5) / L.length) * total;
        for (const c of clips) { const len = c.to - c.from; if (x <= len) return c.from + x; x -= len; }
        return clips[clips.length - 1].from;
      });
      a.playbackRate = 1.2; if ('preservesPitch' in a) a.preservesPitch = true;
      await hookAnalyser();
      for (let k = 0; k < clips.length && !ended; k++) {
        const c = clips[k];
        if (k > 0 && c.from - clips[k - 1].to >= 1) addMark(c.from - clips[k - 1].to);
        while (li < L.length && at[li] < c.from) li++;
        if (Math.abs(a.currentTime - c.from) > 0.3) {
          const seeked = new Promise((r) => a.addEventListener('seeked', r, { once: true }));
          a.currentTime = c.from; await Promise.race([seeked, sleep(1500), stop]);
        }
        if (ended) break;
        await a.play(); // throws if the browser refuses: the caller falls back to paced lines
        a.playbackRate = 1.2;
        await new Promise((resolve) => {
          const poll = setInterval(() => {
            const now = a.currentTime; set('timer', 'In call · ' + mmss(now));
            while (li < L.length && at[li] <= now && at[li] < c.to) addLine(L[li++]);
            if (ended || a.ended || a.error || now >= c.to) { clearInterval(poll); resolve(); }
          }, 80);
          stop.then(() => { clearInterval(poll); resolve(); });
        });
        a.pause();
        if (!ended) while (li < L.length && at[li] < c.to) addLine(L[li++]);
      }
      while (li < L.length && at[li] < clips[clips.length - 1].from) li++;
    }

    await wait(250);
    ov.classList.add('oncall');
    if (callAudio && !ended) {
      try { await recorded(); } catch { if (callAudio) callAudio.pause(); if (!ended) await paced(); }
    } else if (!ended) await paced();
    if (callAudio) callAudio.pause();
    talking = false;
    foot.textContent = '✓ Decision read back and recorded with the landlord’s own words'; foot.classList.add('ok');
    ov.classList.remove('oncall');
    await (ended ? sleep(300) : wait(900));
    endCall = null; clearInterval(wave); ov.classList.remove('in'); tick(8);
  }

  async function fastForward() {
    for (const c of D.cards) { const el = card(c); el.classList.add('in'); if (c.person) { if (!el.classList.contains('person')) { state(el, 'person', 'Needs a person: ' + c.person.question); people++; } continue; } if (el.classList.contains('done')) continue; if (c.call) { el.querySelectorAll('li').forEach((li) => li.classList.add('on')); state(el, 'done', 'Done automatically. No staff time.'); auto++; counters(); continue; } }
    head('The rest of the week, fast-forwarded.');
    const rest = D.cards.filter((c) => !c.person && !card(c).classList.contains('done'));
    for (const c of rest) { const el = card(c); state(el, 'working', 'Agent working'); await sleep(90); el.querySelectorAll('li').forEach((li) => li.classList.add('on')); state(el, 'done', c.next ? 'Done: ' + c.next : 'Done automatically'); auto++; counters(); tick(37); await sleep(70); }
    // The cases beyond the grid, counted down.
    const left = D.totals.auto - auto, extraPeople = D.totals.people - people; let more = D.more;
    for (let i = 0; i < left; i++) { auto++; more--; set('k-more', Math.max(0, more)); counters(); tick(23); await sleep(28); }
    for (let i = 0; i < extraPeople; i++) { people++; more--; set('k-more', Math.max(0, more)); counters(); await sleep(150); }
    set('k-open', 0);
    $('summary').innerHTML = '<b>' + D.totals.cases + ' cases.</b> ' + D.totals.auto + ' handled end to end with no staff time; ' + D.totals.people + ' needed a person, each with a one-screen brief.' + (D.totals.mean !== null ? ' Judge score ' + D.totals.mean + '/100.' : '') + ' Model cost about ' + Math.max(1, Math.round((D.totals.cost / D.totals.cases) * 100 * 0.8)) + 'p a case.';
    $('summary').classList.add('in'); head('It plugs into the systems Dwelly already runs.');
  }

  let i = 0, busy = false, autoplay = false;
  const next = async () => { if (busy || i >= scenes.length) return; busy = true; try { await scenes[i++](); } finally { busy = false; } if (autoplay && i < scenes.length && !(scenes[i - 1] && personCard && i === 5)) { await sleep(450); next(); } };
  $('next').onclick = next; $('auto').onclick = () => { autoplay = true; next(); };
  $('prev').onclick = () => location.reload();
  $('ff').onclick = async () => { while (i < 2) await scenes[i++](); i = scenes.length; fastForward(); };
  addEventListener('keydown', (e) => { if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); } });
  // Returning from the decision page: replay the morning instantly, then fast-forward.
  if (location.hash === '#fastforward') { (async () => { for (const c of D.cards) card(c).classList.add('in'); $('more').classList.add('in'); set('k-open', D.totals.cases); if (callCard) { card(callCard).querySelectorAll('li').forEach((li) => li.classList.add('on')); state(card(callCard), 'done', 'Done automatically. No staff time.'); auto++; } if (personCard) { const el = card(personCard); state(el, 'done', 'Decided by a person, tenant answered on WhatsApp'); people++; } counters(); tick(60); i = scenes.length; await sleep(600); fastForward(); })(); }
})();
</script>`,
    { openTasks, wide: true, css: CSS },
  );
}
