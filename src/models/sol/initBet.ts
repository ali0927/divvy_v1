import { Connection, Keypair, PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";
import * as BufferLayout from "buffer-layout";
import { Bet, MarketSide } from "../../constants";
import { ENV } from "../../constants/sol/env";
import { sendTransaction } from "../../contexts/sol/connection";
import { WalletAdapter } from "../../contexts/sol/wallet";
import * as IDS from "../../utils/ids"
import { notify } from "../../utils/notifications";
import { MONEY_LINE_BET_LAYOUT } from "./state/moneyLineBet";

const INIT_BET_LAYOUT: BufferLayout.Layout = BufferLayout.struct([
  BufferLayout.u8("action"),
  BufferLayout.nu64("amount"),
  BufferLayout.nu64("odds"),
  BufferLayout.nu64("marketSide"),
]);

interface INIT_BET_DATA {
  action: number;
  amount: number;
  odds: number;
  marketSide: number;
};

export const initBet = async (
  connection: Connection,
  env: ENV,
  wallet: WalletAdapter | undefined,
  userUsdtAccount: PublicKey | undefined,
  bet: Bet) => {

  if (wallet?.publicKey == null) {
    notify({
      message: "Transaction failed...",
      description: "Please connect a wallet.",
      type: "error",
    });
    return;
  }

  if (userUsdtAccount == null) {
    notify({
      message: "Transaction failed...",
      description: "User does not have a USDT token account.",
      type: "error",
    });
    return;
  }

  const [ix, betTokenAccount] = await initBetTransaction(
    wallet.publicKey,
    userUsdtAccount,
    bet.marketSide,
    bet.risk,
    new PublicKey(bet.oddsPubKey),
    connection);
  let [ok,] = await sendTransaction(connection, env, wallet, ix, [betTokenAccount]);

  return ok ? betTokenAccount.publicKey : undefined;
}

export const initBetTransaction = async (
  userAccount: PublicKey,
  userUsdtAccount: PublicKey,
  marketSide: MarketSide,
  riskedUsdt: number,
  oddsFeed: PublicKey,
  connection: Connection): Promise<[tx: TransactionInstruction[], betTokenAccount: Keypair]> => {

  const betAccount = Keypair.generate();
  const createTempTokenAccountIx = await createBetAccountInstruction(
    connection,
    userAccount,
    betAccount.publicKey);
  const initBetIx = initBetInstruction(
    userAccount,
    userUsdtAccount,
    oddsFeed,
    betAccount.publicKey,
    oddsFeed,
    riskedUsdt,
    marketSide);

  const ix = [createTempTokenAccountIx, initBetIx];

  return [ix, betAccount];
}

const createBetAccountInstruction = async (connection: Connection, fromPubkey: PublicKey, betAccountPubkey: PublicKey) => {
  const lamports = await connection.getMinimumBalanceForRentExemption(MONEY_LINE_BET_LAYOUT.span, 'singleGossip');
  const createTempTokenAccountIx = SystemProgram.createAccount({
    programId: IDS.DIVVY_PROGRAM_ID,
    space: MONEY_LINE_BET_LAYOUT.span,
    lamports: lamports,
    fromPubkey: fromPubkey,
    newAccountPubkey: betAccountPubkey
  });
  return createTempTokenAccountIx;
}

const initBetInstruction = (
  userAccount: PublicKey,
  userUsdtAccount: PublicKey,
  oddsFeed: PublicKey,
  betAccount: PublicKey,
  marketAccount: PublicKey,
  riskedUsdt: number,
  marketSide: MarketSide) => {
  const initBetData: INIT_BET_DATA = {
    action: 2,
    amount: riskedUsdt,
    odds: 0, // american odds can be negative, yet odds is a uint
    marketSide: MarketSide.toIndex(marketSide)
  };

  const initBetBuffer = Buffer.alloc(INIT_BET_LAYOUT.span);
  INIT_BET_LAYOUT.encode(initBetData, initBetBuffer)
  const initBetIx = new TransactionInstruction({
    keys: [
      { pubkey: userAccount, isSigner: true, isWritable: true },
      { pubkey: oddsFeed, isSigner: false, isWritable: false },
      { pubkey: betAccount, isSigner: false, isWritable: true },
      { pubkey: marketAccount, isSigner: false, isWritable: true },
      { pubkey: IDS.DIVVY_STATE_ACCOUNT, isSigner: false, isWritable: true },
      { pubkey: IDS.DIVVY_USDT_ACCOUNT, isSigner: false, isWritable: true },
      { pubkey: userUsdtAccount, isSigner: false, isWritable: true },
      { pubkey: IDS.TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    ],
    data: initBetBuffer,
    programId: IDS.DIVVY_PROGRAM_ID
  });

  return initBetIx;
}
