import { latin } from "./latin";
import { iqLow } from "./iqLow";
import { iqMid } from "./iqMid";
import { iqHigh } from "./iqHigh";

export const tests = {
  latin,
  iqLow,
  iqMid,
  iqHigh,
};

export type TestKey = keyof typeof tests;