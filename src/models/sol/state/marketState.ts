import { blob, nu64, seq, struct, u8 } from "buffer-layout";

export const MARKET_SIDE_LAYOUT = struct([
  u8("oddsFeedAccountExists"),
  blob(32, "oddsFeedAccount"),
  u8("pointsFeedAccountExists"),
  blob(32, "pointsFeedAccount"),
  nu64("payout"),
  nu64("risk"),
]);

export const MARKET_STATE_ACCOUNT_DATA_LAYOUT = struct([
  u8("isInitialized"),
  seq(MARKET_SIDE_LAYOUT, 3, "marketSides"),
  nu64("lockedLiquidity"),
  blob(32, "resultFeed"),
  u8("result"), 
  nu64("bettorBalance"),
  nu64("pendingBets"),
  u8("betType"),
]);