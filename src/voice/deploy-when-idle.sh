#!/usr/bin/env bash
# Deploy the voice gateway only when no call is in progress: a deploy restarts the one machine and
# drops live calls' in-memory state (see src/voice/DEPLOY.md). Polls ElevenLabs for the agent's
# in-progress conversations, then runs fly deploy. Usage: bash src/voice/deploy-when-idle.sh
set -euo pipefail
cd "$(dirname "$0")/../.."
KEY=$(grep -E '^(ELEVENLABS_API_KEY|ELEVEN_API_KEY)=' .env .env.production 2>/dev/null | head -1 | cut -d= -f2-)
AGENT=$(grep '^ELEVENLABS_AGENT_ID=' .env.production | cut -d= -f2-)
for i in $(seq 1 120); do
  LIVE=$(curl -s "https://api.elevenlabs.io/v1/convai/conversations?agent_id=$AGENT&page_size=20" -H "xi-api-key: $KEY" \
    | python3 -c "import sys,json,time; cs=json.load(sys.stdin).get('conversations',[]); print(sum(c.get('status')=='in-progress' or (c.get('status')=='initiated' and time.time()-c.get('start_time_unix_secs',0)<300) for c in cs))")
  if [ "$LIVE" = "0" ]; then
    echo "[deploy] no live calls, deploying"
    exec fly deploy --app dwelly-voice --ha=false --remote-only --depot=false
  fi
  echo "[deploy] $LIVE call(s) in progress, waiting 20s"
  sleep 20
done
echo "[deploy] gave up after 40 minutes of continuous calls" >&2
exit 1
