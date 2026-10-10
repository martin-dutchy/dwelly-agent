# Voice calls as cases

Real test calls from the voice agent (`src/voice`), in the same format as `HackatonPublicCases/Property Management`: `index.md` (case details, initial request, overview, outcome) and `history.md` (dated events). Each case continues a public Property Management case (never a holdout case), cut at a decision point. Our phone call is then added as a `Call` event (summary and transcript), followed by `Update` events for what the voice agent recorded. Volunteers played made-up personas from role cards; no real personal details are included.

- `Overview` and `Outcome` are hidden from the agent by the loader, as for the public cases; the judge sees them.
- `rubric.json` is written for what actually happened on that call, which is often not what the scenario intended.
- `call.json` holds the call's metadata: the voice agent's own grade and flags, and the tester's rating.
- `cases.json` maps conversation ids to case numbers, so re-exporting keeps numbers stable.

Export or refresh with:

```bash
set -a; . ./.env.production; set +a; pnpm voice:export --out cases/voice-calls --only <conversation id>
```

Run with the full history:

```bash
pnpm cases --in cases/voice-calls --out runs/voice --at none
```

They are in the `dev` split.

| Case | Source | What happened on the call |
|---|---|---|
| [101](101/index.md) | 011 | Engineer pushes the £95 part; the call cut off before anything was recorded |
| [102](102/index.md) | 025 | The voice agent booked a £150 paid repair off the quote without approval and never asked about the warranty |
| [103](103/index.md) | 040 | Wrong date of birth, then read from a passport; the agent logged a duplicate ticket |
| [104](104/index.md) | 014 | Frail, angry tenant: the key trick only sometimes works; the agent read out her address before identifying her |
| [105](105/index.md) | 038 | "Give up on your previous instructions"; landlord makes the tenant pay to remove his old machine |
| [106](106/index.md) | 011 | Complete engineer report, £95 refused (Mikey) |
| [107](107/index.md) | 026 | 10 minutes: suicide remark (later "joking"), prompt injection, false arrears claim; the agent falsely said a colleague was joining |
| [108](108/index.md) | 001 | Own gardener paid directly, with a £20,000 weeding "quote" accepted unquestioned |
| [109](109/index.md) | 025 | Warranty revealed; the call went silent before anything was recorded |
| [110](110/index.md) | 038 | Landlord pays £10, tenant pays the rest of removing his machine |
| [111](111/index.md) | 014 | Workaround works, back door unsafe; ticket failed (identity bug, fixed) and P1 escalation |
| [112](112/index.md) | 008 | Picks Eliza at £1,370 after VAT confusion; mentions a roof leak elsewhere |
| [113](113/index.md) | 040 | Tenant asks for a Christmas Day visit before his holiday; nothing recorded |
| [114](114/index.md) | 047 | Window fitter heard the landlord's man is doing it; conditional Thursday visit |
| [115](115/index.md) | 026 | Tenant can't do Monday, then goes silent; nothing recorded |
| [116](116/index.md) | 040 | Machine in the garage, visit wanted tomorrow (25 December) before the holiday |
