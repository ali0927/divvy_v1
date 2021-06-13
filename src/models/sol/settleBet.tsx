import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import * as BufferLayout from "buffer-layout";
import { ENV, sendTransaction } from "../../contexts/connection";
import { WalletAdapter } from "../../contexts/wallet";
import * as IDS from "../../utils/ids";
import { notify } from "../../utils/notifications";

const SETTLE_BET_LAYOUT: BufferLayout.Layout = BufferLayout.struct([
  BufferLayout.u8("action"),
  BufferLayout.u8("win")
]);

interface INIT_BET_DATA {
  action: number,
  win: number
}

const settleBetInstruction = (
  userAccount: PublicKey,
  userUsdtAccount: PublicKey,
  betTokenAccount: PublicKey,
  outcome: "win" | "lose") => {
  const settleBetData: INIT_BET_DATA = {
    action: 3,
    win: outcome === "win" ? 1 : 0
  };
  const settleBetBuffer = Buffer.alloc(SETTLE_BET_LAYOUT.span);
  SETTLE_BET_LAYOUT.encode(settleBetData, settleBetBuffer)
  const settleBetIx = new TransactionInstruction({
    keys: [
      { pubkey: userAccount, isSigner: true, isWritable: true},
      { pubkey: IDS.TOKEN_PROGRAM_ID, isSigner: false, isWritable: true},
      { pubkey: betTokenAccount, isSigner: false, isWritable: true},
      { pubkey: IDS.DIVVY_PDA_ACCOUNT, isSigner: false, isWritable: true},
      { pubkey: IDS.DIVVY_USDT_ACCOUNT, isSigner: false, isWritable: true},
      { pubkey: userUsdtAccount, isSigner: false, isWritable: true},
    ],
    data: settleBetBuffer,
    programId: IDS.DIVVY_PROGRAM_ID});

    return settleBetIx;
}

export const settleBet = async(
  connection: Connection,
  env: ENV,
  wallet: WalletAdapter | undefined,
  betTokenAccount: PublicKey | undefined,
  userUsdtTokenAccount: PublicKey | undefined,
  outcome: "win" | "lose"): Promise<boolean> => {
  if (wallet?.publicKey == null) {
    notify({
      message: "Transaction failed...",
      description: "Please connect a wallet.",
      type: "error",
    });
    return false;
  }

  if(userUsdtTokenAccount == null){
    notify({
      message: "Transaction failed...",
      description: "User does not have a USDT token account.",
      type: "error",
    });
    return false;
  }

  if(betTokenAccount == null){
    notify({
      message: "Transaction failed...",
      description: "Pending bet does not exist.",
      type: "error",
    });
    return false;
  }
  
  const settleBetIx = settleBetInstruction(
    wallet.publicKey,
    userUsdtTokenAccount, 
    betTokenAccount,
    outcome)

  const ix =  [settleBetIx];
  let [ok,] = await sendTransaction(connection, env, wallet, ix);
  
  return ok;
}