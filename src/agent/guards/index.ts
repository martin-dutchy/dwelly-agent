// Guards: rules checked in code before a tool runs, only when the guardsV2 flag is on. Each is a no-op when the facts it needs are absent.
import type { Guard } from '../harness/contracts.js';
import { loopDetector } from './loop.js';
import { MESSAGE_GUARDS } from './message.js';
import { prohibitedContent } from './prohibited.js';
import { tierThreeBasis } from './tiers.js';

export { TOOL_TIERS, tierOf } from './tiers.js';

// The loop detector goes first so every read is counted.
export const GUARDS: Guard[] = [loopDetector, prohibitedContent, tierThreeBasis, ...MESSAGE_GUARDS];
