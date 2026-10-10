---
id: co-alarm
title: Carbon monoxide alarm or symptoms
tags: [co]
when_to_use: A carbon monoxide alarm is sounding, chirping or faulty, or someone has symptoms near a gas, oil or solid-fuel appliance.
red_flags:
  - The first message does not ask whether the alarm sounds continuously and whether anyone has symptoms.
  - A continuous alarm or any symptom was treated as a routine alarm fault.
  - A chirping alarm with nobody unwell was treated as an evacuation, or left without an urgent replacement.
  - Anyone was told they could use the appliance again before a Gas Safe engineer checked it.
---

## Procedure
1. In the first message, ask whether the alarm sounds continuously or chirps now and then, and whether anyone has a headache, dizziness, nausea, breathlessness or drowsiness.
2. A continuous alarm, or any symptom, is an emergency: everyone leaves into fresh air, opens windows on the way out if it is safe, does not use the appliance, and calls 0800 111 999 (999 or 111 for symptoms). Nobody goes back in until it is safe. Then follow the gas emergency steps: emergency job, Gas Safe engineer the same day, P1 escalation, landlord told.
3. An intermittent chirp with nobody unwell is a faulty or expiring alarm: urgent replacement, not an evacuation. Tell the occupant to keep the alarm in place, and that if it changes to a continuous sound or anyone feels unwell, they leave and call 0800 111 999.
4. A missing or failed alarm in a room with a fixed combustion appliance is the landlord's legal duty to fix promptly. Open an urgent job and instruct the replacement.
5. If you cannot tell which it is from the case, treat it as the emergency and ask the question in the same message.

## Required actions
- `send_message`: the safety questions and advice to the occupant; the update to the landlord.
- `create_ticket` or `update_ticket`: emergency for an alarm with symptoms or a continuous alarm, urgent for a faulty alarm.
- `assign_contractor`: a Gas Safe registered engineer for a sounding alarm; an alarm replacement for a faulty one.
- `escalate_to_human`: P1, maintenance, for a continuous alarm or any symptom.
- `schedule_follow_up`: confirm the engineer's findings or the replacement.

## Red flags
- Symptoms in more than one person, or in a pet: strong sign of carbon monoxide.
- A child, an elderly or disabled person, or someone pregnant is in the property.
- The alarm "went off and stopped": still ask about symptoms and treat it as a possible leak until an engineer has checked.
- No alarm at all in a room with a boiler or fire.

## Escalate when
- A continuous alarm or any symptom: P1, maintenance.
- The occupant cannot be reached after reporting a sounding alarm: P1.
- The landlord refuses or delays an alarm replacement: P2, compliance.
