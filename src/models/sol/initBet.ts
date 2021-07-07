import { Connection, Keypair, PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";
import * as BufferLayout from "buffer-layout";
import { Bet, BetStatus, MarketSide } from "../../constants";
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
  bets: Bet[]): Promise<[ok: boolean, txid: string | undefined]> => {

  const walletPubkey = wallet?.publicKey;

  if (wallet == null || walletPubkey == null) {
    notify({
      message: "Transaction failed...",
      description: "Please connect a wallet.",
      type: "error",
    });
    return [false, undefined];
  }

  if (userUsdtAccount == null) {
    notify({
      message: "Transaction failed...",
      description: "User does not have a USDT token account.",
      type: "error",
    });
    return [false, undefined];
  }

  const ixs: TransactionInstruction[] = [];
  const betAccounts: Keypair[] = [];

  const betAccountRent = await connection.getMinimumBalanceForRentExemption(MONEY_LINE_BET_LAYOUT.span, 'singleGossip');

  for (const bet of bets) {
    const [ix, betAccount] = await initBetTransaction(
      walletPubkey,
      userUsdtAccount,
      bet.marketSide,
      bet.risk,
      bet.odds,
      new PublicKey(bet.marketPubkey),
      new PublicKey(bet.oddsPubKey),
      betAccountRent);
    ixs.push(...ix);
    betAccounts.push(betAccount);
  }
  console.log(ixs);
  let txn = await sendTransaction(connection, env, wallet, ixs, betAccounts);
  let [ok,] = txn;

  if (ok) {
    bets.forEach((bet, index) => {
      const betAccount = betAccounts[index];
      bet.betPubkey = betAccount.publicKey.toBase58();
      bet.status = BetStatus.Pending
      bet.userPubkey = walletPubkey.toBase58()
    })
  }
  return txn;
}

export const initBetTransaction = async (
  userAccount: PublicKey,
  userUsdtAccount: PublicKey,
  marketSide: MarketSide,
  riskedUsdt: number,
  odds: number,
  marketPubkey: PublicKey,
  oddsFeed: PublicKey,
  betAccountRent: number): Promise<[tx: TransactionInstruction[], betAccount: Keypair]> => {

  const betAccount = Keypair.generate();
  const createTempTokenAccountIx = await createBetAccountInstruction(
    userAccount,
    betAccount.publicKey,
    betAccountRent);
  const initBetIx = initBetInstruction(
    userAccount,
    userUsdtAccount,
    oddsFeed,
    betAccount.publicKey,
    marketPubkey,
    riskedUsdt,
    odds,
    marketSide);
  const ix = [createTempTokenAccountIx, initBetIx];

  return [ix, betAccount];
}

const createBetAccountInstruction = async (fromPubkey: PublicKey, betAccountPubkey: PublicKey, rent: number) => {
  const createTempTokenAccountIx = SystemProgram.createAccount({
    programId: IDS.DIVVY_PROGRAM_ID,
    space: MONEY_LINE_BET_LAYOUT.span,
    lamports: rent,
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
  odds: number,
  marketSide: MarketSide) => {
  console.log(marketAccount.toString())
  const initBetData: INIT_BET_DATA = {
    action: 2,
    amount: riskedUsdt,
    // sending mod of odds since we are just using switchboard odds. Should check later.
    odds: odds > 0 ? odds : -odds,
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
