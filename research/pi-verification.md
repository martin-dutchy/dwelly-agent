# Verified actions with pi

**The goal:** never report an action that didn't happen, and never repeat one that did. Dwelly describes each case as running "from first contact to a **verified** outcome", and the brief makes failed actions part of the Reality Test.

Implemented in `src/agent/` (`caseAgent.ts`, `ledger.ts`, `verify.ts`) and tested with pi's faux model in `src/agent/caseAgent.test.ts`.

## The four ways a write goes wrong

| Mode | What the API says | What actually happened | A naive agent… | Our handling |
|---|---|---|---|---|
| `error` (500) | error | nothing | retries forever, or tells the tenant "booked" | ledger `failed` → retry once or escalate; the decision must list it |
| `silent_drop` | **success** + a ref | nothing | **reports a booking that doesn't exist** (critical failure) | read-back finds no ticket → model is told `NOT APPLIED` |
| `timeout` | error | **it happened** | retries → **duplicate job, two contractors sent** | read-back finds it → "IS in place, do not retry"; a retry is blocked |
| wrong data | success | applied with different fields | reports what it asked for | read-back compares the key fields → `not_applied` with the diff |

`src/core/failures.ts` scripts all of these per tool and per call number, matching `tool_failures.json` in the practice cases.

## How pi's hooks map onto it

```
model ──tool call──► beforeToolCall ──► execute ──► afterToolCall ──► model sees result
                      │                                 │
                      │ write already verified?         │ read back the effect (verify.ts)
                      │   → block "already done A1"     │ record in ActionLedger (A1, A2…)
                      │ submit_decision?                │ rewrite the result the model sees:
                      │   claims ⊆ verified ledger      │   "Verified: …" / "NOT APPLIED: …" /
                      │   unresolved ⊆ failed_actions   │   "error but IS in place, don't retry"
                      │   else block with the reasons   │ isError = !verified
```

- **`afterToolCall`** is the verification point. It runs after every state-changing tool, **whatever the API returned**, does an independent read-back and replaces the result content. The model can't miss or misread the outcome, because the truth is in the tool result.
- **`beforeToolCall`** enforces two invariants in code:
  1. **Idempotency:** a write whose canonical args match an already-verified ledger entry is blocked with "already done as A1 (R-4902)".
  2. **Honest reporting:** `submit_decision` is rejected unless every `actions_claimed` id is verified, and every unverified ledger entry appears in `failed_actions` with how it was handled. The model gets the reasons and fixes its decision.
- **`executionMode: 'sequential'`** for writes, so each write is verified before the next starts. Reads stay parallel for speed.
- **`terminate: true`** on `submit_decision` ends the run cleanly. If the model stops without deciding, it gets one nudge.
- **Events (`agent.subscribe`)** give the full trace for `REASONING.md`. The ledger gives the **action table** for `ANSWER.md`. That table is rendered from code, not from model prose.

## What the tests prove (faux model, no API key)

1. **Silent drop:** the model creates a ticket, which is silently dropped, and it sees `NOT APPLIED`. Its attempt to claim success is **rejected**. It retries, the ticket verifies, and the claim is accepted. The ledger shows A1 `verified` after 2 attempts.
2. **Timeout that succeeded:** the model is told it IS in place. Its blind retry is **blocked**, so exactly one ticket exists.
3. **Hard failure hidden by the model:** a `resolved` decision that omits the failed A1 is **rejected**. The model resubmits as `escalated` with the failure handled.

## Using it tomorrow with the organisers' tools

1. Wrap each of their tools as an `AgentTool`. Mark the writes (anything that creates, assigns, sends, pays, updates or approves).
2. Write one verifier per write, using their read endpoints, e.g. `assign_contractor` → `GET job` → the stage is `mp_time` or `visit` and the contractor matches. About 5–10 lines each.
3. Writes with no read-back get `unverifiable`. The decision must not claim them as confirmed, and ANSWER.md labels them "sent, not confirmed".
4. Messages: verify the delivery status if they expose one. A bounce counts as `not_applied`, so use another channel or escalate.
5. Escalations are writes too. Verify they reached the human queue.

## Still to decide

- **Retry policy:** right now the model decides whether to retry after `NOT APPLIED`. We could make it deterministic: retry once automatically when the read-back confirms absence, then hand over to the model.
- **Verification cost:** read-backs are cheap API calls, so no LLM tokens are spent on verification.
- **Final-state checks:** after the run, check the case invariants in code (e.g. severity is emergency → a verified P1 escalation exists). This overlaps with the eval harness; see `evaluation.md` when it lands.
