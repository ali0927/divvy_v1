import { AccountLayout, Token } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";
import * as BufferLayout from "buffer-layout";
import { ENV } from "../../constants/sol/env";
import { sendTransaction } from "../../contexts/sol/connection";
import { WalletAdapter } from "../../contexts/sol/wallet";
import * as IDS from "../../utils/ids"
import { notify } from "../../utils/notifications";

const INIT_BET_LAYOUT: BufferLayout.Layout = BufferLayout.struct([
  BufferLayout.u8("action"),
  BufferLayout.nu64("amount"),
  BufferLayout.nu64("odds"),
]);

interface INIT_BET_DATA {
  action: number;
  amount: number;
  odds: number;
};

const initBetInstruction = (
  userAccount: PublicKey,
  betTokenAccount: PublicKey,
  riskedUsdt: number,
  odds: number) => {
  const initBetData: INIT_BET_DATA = {
    action: 2, 
    amount: riskedUsdt, 
    odds: odds
  };

  const initBetBuffer = Buffer.alloc(INIT_BET_LAYOUT.span);
  INIT_BET_LAYOUT.encode(initBetData, initBetBuffer)
  const initBetIx = new TransactionInstruction({
    keys: [
      { pubkey: userAccount, isSigner: true, isWritable: true},
      { pubkey: IDS.TOKEN_PROGRAM_ID, isSigner: false, isWritable: true},
      { pubkey: betTokenAccount, isSigner: false, isWritable: true},
      { pubkey: IDS.DIVVY_PDA_ACCOUNT, isSigner: false, isWritable: true},
      { pubkey: IDS.DIVVY_USDT_ACCOUNT, isSigner: false, isWritable: true},
    ],
    data: initBetBuffer,
    programId: IDS.DIVVY_PROGRAM_ID});

  return initBetIx;
}

export const initBetTransaction = async (
  userAccount: PublicKey,
  userUsdtAccount: PublicKey,
  riskedUsdt: number,
  odds: number,
  connection: Connection,
  env: ENV): Promise<[tx: TransactionInstruction[], betTokenAccount: Keypair]> => {

  const betTokenAccount = Keypair.generate();
  const lamports = await connection.getMinimumBalanceForRentExemption(AccountLayout.span, 'singleGossip');
  const createTempTokenAccountIx = SystemProgram.createAccount({
      programId: IDS.TOKEN_PROGRAM_ID,
      space: AccountLayout.span,
      lamports: lamports,
      fromPubkey: userAccount,
      newAccountPubkey: betTokenAccount.publicKey
  });
  
  const initTempAccountIx = Token.createInitAccountInstruction(
    IDS.TOKEN_PROGRAM_ID,
    IDS.getUsdtMint(env),
    betTokenAccount.publicKey,
    userAccount);

  const transferXTokensToTempAccIx = Token.createTransferInstruction(
    IDS.TOKEN_PROGRAM_ID,
    userUsdtAccount,
    betTokenAccount.publicKey,
    userAccount,
    [],
    riskedUsdt);

  const initBetIx = initBetInstruction(
    userAccount,
    betTokenAccount.publicKey,
    riskedUsdt,
    odds);

  const ix =  [createTempTokenAccountIx, initTempAccountIx, transferXTokensToTempAccIx, initBetIx];
  
  return [ix, betTokenAccount];
}

export const initBet = async (
  connection: Connection,
  env: ENV,
  wallet: WalletAdapter | undefined,
  userUsdtTokenAccount: PublicKey | undefined,
  riskedUsdt: number,
  odds: number,
  ) => { 

  if (wallet?.publicKey == null) {
    notify({
      message: "Transaction failed...",
      description: "Please connect a wallet.",
      type: "error",
    });
    return;
  }

  if(userUsdtTokenAccount == null){
    notify({
      message: "Transaction failed...",
      description: "User does not have a USDT token account.",
      type: "error",
    });
    return;
  }
  
  const [ix, betTokenAccount] = await initBetTransaction(
    wallet.publicKey,
    userUsdtTokenAccount,
    riskedUsdt,
    odds,
    connection,
    env);
  let [ok,] = await sendTransaction(connection, env, wallet, ix, [betTokenAccount]);
  
  return ok ? betTokenAccount.publicKey : undefined;
}
