import { AccountInfo, PublicKey } from "@solana/web3.js";
import * as Layout from "../../../utils/layout";
import * as BufferLayout from "buffer-layout";
import { ParsedAccount } from "../../../contexts/sol/accounts";

const LAYOUT = BufferLayout.struct([
  BufferLayout.u8('isInitialized'),
  BufferLayout.nu64('lockedLiquidity'),
  BufferLayout.nu64('liveLiquidity'),
  BufferLayout.nu64('bettorBalance'),
  BufferLayout.nu64('pendingBets'),
]);

export interface HPState {
  isInitialized: boolean;
  lockedLiquidity: number;
  liveLiquidity: number;
  bettorBalance: number;
  pendingBets: number;
}

export const HPStateParser = (id: PublicKey, acc: AccountInfo<Buffer>): ParsedAccount<HPState> => {
  const decoded = LAYOUT.decode(acc.data) as any;
  const hpstate: ParsedAccount<HPState> = {
    pubkey: id,
    account: { ...acc },
    info: {
      isInitialized: decoded.isInitialized,
      lockedLiquidity: decoded.lockedLiquidity,
      liveLiquidity: decoded.liveLiquidity,
      bettorBalance: decoded.bettorBalance,
      pendingBets: decoded.pendingBets,
      ...decoded
    }
  };
  return hpstate;
}