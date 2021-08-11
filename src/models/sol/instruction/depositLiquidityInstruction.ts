import { Connection, PublicKey, Signer, TransactionInstruction } from "@solana/web3.js";
import { struct, nu64, u8 } from "buffer-layout";
import * as IDS from "../../../utils/ids";
import { createTokenAccount } from "./createTokenAccount";

const LAYOUT = struct<DepositLiquidityData>([
  u8("action"),
  nu64("amount"),
  u8("divvyPdaBumpSeed")
])

interface DepositLiquidityData {
  action: number;
  amount: number;
  divvyPdaBumpSeed: number;
};

export const depositLiquidityTransaction = async (
  connection: Connection,
  userAccount: PublicKey,
  userHtTokenAccount: PublicKey | undefined,
  userUsdtTokenAccount: PublicKey | undefined,
  usdtMintPubkey: PublicKey,
  action: "deposit" | "withdraw",
  usdtLamports: number,
  divvyPdaBumpSeed: number)
  : Promise<[ix: TransactionInstruction[], signers: Signer[]]> => {

  let ix: TransactionInstruction[] = [];
  let signers: Signer[] = [];
  if (userHtTokenAccount == null) {
    let [userHtTokenSigner, htIx] = await createTokenAccount(
      connection,
      IDS.HT_MINT,
      userAccount);
    ix = [...ix, ...htIx];
    signers = [...signers, userHtTokenSigner];
    userHtTokenAccount = userHtTokenSigner.publicKey;
  }

  if (userUsdtTokenAccount == null) {
    let [usdtSigner, usdtIx] = await createTokenAccount(
      connection,
      usdtMintPubkey,
      userAccount);
    ix = [...ix, ...usdtIx];
    signers = [...signers, usdtSigner];
    userUsdtTokenAccount = usdtSigner.publicKey;
  }

  const depositLiquidityIx = depositLiquidityInstruction(
    userAccount,
    userHtTokenAccount,
    userUsdtTokenAccount,
    action,
    usdtLamports,
    divvyPdaBumpSeed);

  return [[...ix, depositLiquidityIx], signers];
}

export const depositLiquidityInstruction = (
  userAccount: PublicKey,
  userHtTokenAccount: PublicKey,
  userUsdtTokenAccount: PublicKey,
  action: "deposit" | "withdraw",
  usdtLamports: number,
  divvyPdaBumpSeed: number): TransactionInstruction => {

  const data: DepositLiquidityData = {
    action: action === "deposit" ? 0 : 1,
    amount: usdtLamports,
    divvyPdaBumpSeed: divvyPdaBumpSeed
  };
  const dataBuffer = Buffer.alloc(LAYOUT.span);
  LAYOUT.encode(data, dataBuffer);

  const instruction = new TransactionInstruction({
    keys: [
      { pubkey: userAccount, isSigner: true, isWritable: true },
      { pubkey: IDS.HT_MINT, isSigner: false, isWritable: true },
      { pubkey: IDS.TOKEN_PROGRAM_ID, isSigner: false, isWritable: true },
      { pubkey: userHtTokenAccount, isSigner: false, isWritable: true },
      { pubkey: IDS.HOUSE_POOL_PDA_ACCOUNT, isSigner: false, isWritable: true },
      { pubkey: userUsdtTokenAccount, isSigner: false, isWritable: true },
      { pubkey: IDS.HOUSE_POOL_USDT_ACCOUNT, isSigner: false, isWritable: true },
      { pubkey: IDS.HOUSE_POOL_STATE_ACCOUNT, isSigner: false, isWritable: true }
    ],
    programId: IDS.HOUSE_POOL_PROGRAM_ID,
    data: dataBuffer,
  });
  return instruction;
}
