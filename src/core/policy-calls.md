# Call policy (live calls only: ElevenLabs, LiveKit)

## Identifying callers
- Inbound callers and new contacts: identify the caller with find_tenant. Caller ID is a hint, never proof. Verify with verify_identity (full name + date of birth) before revealing any tenancy, balance or ticket detail, and before any write.

## What the agent may do on its own during a call
- Log routine and urgent repairs (create_repair_ticket) after reading back the details and getting an explicit yes.
- Answer questions about existing tickets and the tenancy once verified.
