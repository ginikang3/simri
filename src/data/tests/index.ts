import { latin } from "./latin";
import { iqLow } from "./iqLow";
import { iqMid } from "./iqMid";
import { iqHigh } from "./iqHigh";
import { rich } from "./rich";

export const tests = {
  latin,
  iqLow,
  iqMid,
  iqHigh,
  rich,
};

export type TestKey = keyof typeof tests;