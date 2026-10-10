# Voice gateway: deploy and run

One Node process (`src/voice/server.ts`) on Fly.io, London region. It serves:

| Path | Who | What |
|---|---|---|
| `/t/<token>` | testers (family, friends) | consent, persona card (no script), mic check, call |
| `/admin` | you (Basic auth, `ADMIN_PASSWORD`) | create and revoke invite links, list calls with grade and flags |
| `/admin/calls/<id>` | you | audio, transcript, tool log, grade, ElevenLabs analysis, regrade |
| `/admin/console` | you | full test console: script, stress tips, live tool log, text-only mode |
| `/voice/tools/<name>` | ElevenLabs (Bearer `VOICE_TOOL_SECRET`) | webhook tools, native brain |
| `/v1/chat/completions` | ElevenLabs (Bearer `VOICE_TOOL_SECRET`) | Custom LLM, pi brain |
| `/voice/webhooks/elevenlabs` | ElevenLabs (HMAC) | optional post-call webhook; grading also runs without it |

Data: Neon Postgres (`DATABASE_URL`) holds invites, calls, the tool event log, transcripts and grades. Tables are created on boot. Audio stays in ElevenLabs and is streamed through `/admin/calls/<id>`.

## First deploy

```bash
fly auth login
fly launch --no-deploy --copy-config --name <app-name> --region lhr   # keeps fly.toml; pick any free app name
```

Set secrets. Values come from your `.env`; generate a new VOICE_TOOL_SECRET and ADMIN_PASSWORD for production.

```bash
fly secrets set ELEVENLABS_API_KEY=... ANTHROPIC_API_KEY=... DATABASE_URL=... VOICE_TOOL_SECRET=... ADMIN_PASSWORD=... PUBLIC_BASE_URL=https://<app-name>.fly.dev
```

```bash
fly deploy --ha=false
```

Create the production ElevenLabs agent, pointed at Fly. Run this locally with production values, leaving `ELEVENLABS_AGENT_ID` unset the first time:

```bash
PUBLIC_BASE_URL=https://<app-name>.fly.dev VOICE_TOOL_SECRET=<prod secret> ELEVENLABS_AGENT_ID= ELEVENLABS_AGENT_NAME="Dwelly tenant line (prod)" pnpm voice:sync
```

Then store the printed id, which redeploys:

```bash
fly secrets set ELEVENLABS_AGENT_ID=agent_...
```

Open `https://<app-name>.fly.dev/admin`, create an invite per person and send them their link.

## Updating

- Code: `bash src/voice/deploy-when-idle.sh` (waits until no call is in progress, then deploys; a deploy mid-call drops that call's in-memory state).
- Agent prompt or settings: run `pnpm voice:sync` with the production `ELEVENLABS_AGENT_ID`, `PUBLIC_BASE_URL` and `VOICE_TOOL_SECRET`. Tools are matched only within that agent, so a local agent (ngrok) and production never overwrite each other.

## Notes

- Keep exactly one machine (`--ha=false`, `min_machines_running = 1`): per-call state lives in memory, so a second machine would split calls. A redeploy drops calls in progress.
- Costs: each invite has a daily cap, and `VOICE_DAILY_CALL_CAP` (default 200) caps everyone together. The agent has `enable_auth`, so only tokens minted by this server can start a conversation.
- Optional post-call webhook: in ElevenLabs workspace settings, add `https://<app-name>.fly.dev/voice/webhooks/elevenlabs` and set `ELEVENLABS_WEBHOOK_SECRET`. Without it, grading starts when the tester hangs up, or from "Regrade" in the admin.
