---
id: gas-emergency
title: Gas smell or suspected gas leak
tags: [gas]
when_to_use: Someone reports a smell of gas or a gas leak, or the gas emergency service has attended or capped the supply.
red_flags:
  - The first message to the occupant does not tell them to leave, avoid switches and flames, and call 0800 111 999.
  - Safety advice or the emergency response was held back because an identity check failed or a detail was unclear.
  - Anyone was told to wait inside, wait for an engineer tomorrow, or look at the appliance themselves.
  - A contractor without Gas Safe registration was sent, or the gas repair waits for landlord approval.
  - No P1 escalation, or the landlord is not told the same day.
---

## Procedure
1. Safety first, in the first message to the person on site, all in one message: leave the property with everyone in it; do not use switches, flames or the appliance; open doors and windows on the way out if it is safe; call the National Gas Emergency Service on 0800 111 999 (999 if anyone feels unwell); ask whether a carbon monoxide alarm is sounding and whether anyone has a headache, dizziness, nausea or drowsiness; ask them to reply to confirm everyone is out. Name any vulnerable person in the household and say they should get out first.
2. If the history shows this advice was already given (for example by the phone line), do not repeat it word for word: confirm they are out and safe, and give the 0800 111 999 number again.
3. Never hold back safety advice or the emergency response for an identity check, a record mismatch or a missing job. The person reporting gas is treated as at risk first; any identity question is handled separately afterwards.
4. Open or update the job as an emergency (`create_ticket` with severity emergency, or `update_ticket` on the existing job). Use `list_tickets` first so you do not duplicate an open job.
5. The National Gas Emergency Service makes the supply safe (it may cap the meter); it does not repair appliances. Instruct a Gas Safe registered engineer to find and repair the fault without waiting for the landlord: a gas contractor named in the records, otherwise the trade itself ("Gas Safe registered engineer, emergency call-out") with an urgent same-day window, saying plainly that no firm is named yet.
6. Escalate P1 to maintenance with a packet: who is affected, what was said, what you already did, and what the human must decide (for example temporary heating if the supply is capped).
7. Tell the landlord the same day: what happened, that an engineer is being sent, and that emergency make-safe does not wait for approval.
8. If the supply is capped and the household is vulnerable or it is cold, raise temporary heating and hot water with the landlord and in the escalation.
9. Set a follow-up for the engineer's report and for checking on the household.

## Required actions
- `send_message`: the safety message to the occupant, and the update to the landlord.
- `create_ticket` or `update_ticket`: an emergency gas job.
- `assign_contractor`: a Gas Safe registered engineer, same day.
- `escalate_to_human`: P1, maintenance.
- `schedule_follow_up`: the engineer's report and a welfare check.

## Red flags
- The caller mentions symptoms (headache, dizziness, nausea, drowsiness) or a sounding carbon monoxide alarm: tell them to call 999 or 111 as well, and to stay out.
- A child, an elderly or disabled person, or someone pregnant or unwell is in the property.
- The smell is reported inside a routine job (a boiler service, an oven repair): it is a new emergency job, not a note on the old one.
- The previous handler escalated the identity problem but not the gas, or treated them as one item.
- Only a general handyman is on file: they must not touch gas.

## Escalate when
- Always for a reported gas smell: P1, maintenance, after the safety message and the engineer instruction.
- The occupant cannot be reached after the report: P1, and record each attempt with `log_call`.
- The supply is capped and a vulnerable household has no heating or hot water: include the temporary heating decision in the P1 packet.
