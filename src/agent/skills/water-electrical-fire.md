---
id: water-electrical-fire
title: Leaks, flooding, dangerous electrics and fire
tags: [water, electrical, fire]
when_to_use: Water is escaping or coming through a ceiling, electrics are sparking, burning or wet, there is no power, or there is or was a fire.
red_flags:
  - The emergency waited for landlord approval instead of an emergency contractor being sent now.
  - No safety advice first (stopcock, keep away from wet electrics, 999 for fire).
  - Liability was admitted, or compensation promised, to a neighbour or anyone else.
  - The tenant's contact details were given to a neighbour or another third party.
  - Entry without notice was arranged for something that is not actively causing damage or risk.
---

## Procedure
1. Safety advice first, in the first message: for escaping water, turn off the stopcock (its location may be in the property record) and keep away from electrics the water reaches; for sparking, burning or wet electrics, switch off at the consumer unit only if it is safe and keep away; for fire or smoke, get out and call 999. For a power cut affecting the street, the network number is 105.
2. Open or raise the job as an emergency. A hazard found inside a routine job gets its own job (`create_ticket` severity emergency with `related_ticket_ref`), and the right trade is assigned to it at once without waiting for the landlord: a contractor of that trade named in the case, otherwise the trade itself with an urgent same-day window, saying plainly that no firm is named yet.
3. Water near electrics is an emergency for both trades: the plumber stops the water, an electrician checks the circuit before it is used again.
4. Leak into another flat: tell the affected occupier what is being done, without giving them our tenant's personal details and without admitting fault. Try the tenant on every channel on file. Tell the landlord now and remind them to notify their insurer; if the building has a freeholder or block managing agent, they may need to know too.
5. Entry: a genuine emergency (water actively escaping, risk to life or property) justifies entry without 24 hours' notice if the tenant cannot be reached. Record the attempts to reach the tenant first, use the agency or key-holder keys, and tell the tenant in writing straight away what was done and why. Once the emergency is contained, normal notice applies again.
6. Ask the contractor to document the cause, the damage and the make-safe work (photos, the cause report, any parts kept): the insurer will need it.
7. Escalate P1 for flooding, sparking electrics or fire, with what you have already done.
8. Set follow-ups for the drying-out, the cause repair and any insurance step.

## Required actions
- `send_message`: safety advice to the person on site; updates to the tenant, the landlord and any affected neighbour.
- `create_ticket` or `update_ticket`: an emergency job of the right trade.
- `assign_contractor`: emergency plumber or electrician the same day.
- `log_call`: every attempt to reach the tenant, including voicemail.
- `escalate_to_human`: P1, maintenance.
- `schedule_follow_up`: cause repair, drying-out and the insurer step.

## Red flags
- Water dripping onto a light fitting, socket or consumer unit.
- Smoke from a smoke alarm or an appliance, a burning smell, scorch marks, a hot socket.
- The tenant is away or not answering while water is still escaping.
- The caller is a neighbour or another third party demanding the tenant's number or a written promise to pay.
- Sewage, a ceiling bulging or coming down, or structural damage.

## Escalate when
- Flooding, sparking electrics, fire or structural danger: P1, maintenance.
- A neighbour demands compensation or threatens action: P3, management (insurance and liability decisions are the landlord's and the insurer's).
- Emergency entry was needed: include it in the P1 packet so a human can confirm the follow-up with the tenant.
