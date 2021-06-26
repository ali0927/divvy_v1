import { AccountLayout, Token } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";
import * as BufferLayout from "buffer-layout";
import { Game, MarketSide } from "../../constants";
import { ENV } from "../../constants/sol/env";
import { sendTransaction } from "../../contexts/sol/connection";
import { WalletAdapter } from "../../contexts/sol/wallet";
import * as IDS from "../../utils/ids"
import { notify } from "../../utils/notifications";

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

const createBetAccountInstruction = () => {

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
  const initBetData: INIT_BET_DATA = {
    action: 2,
    amount: riskedUsdt,
    odds: odds,
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

export const initBetTransaction = async (
  userAccount: PublicKey,
  userUsdtAccount: PublicKey,
  game: Game,
  oddsFeed: PublicKey,
  riskedUsdt: number,
  odds: number,
  connection: Connection,
  env: ENV): Promise<[tx: TransactionInstruction[], betTokenAccount: Keypair]> => {

  const betAccount = Keypair.generate();
  const lamports = await connection.getMinimumBalanceForRentExemption(AccountLayout.span, 'singleGossip');
  const createTempTokenAccountIx = SystemProgram.createAccount({
    programId: IDS.TOKEN_PROGRAM_ID,
    space: AccountLayout.span,
    lamports: lamports,
    fromPubkey: userAccount,
    newAccountPubkey: betAccount.publicKey
  });

  const initTempAccountIx = Token.createInitAccountInstruction(
    IDS.TOKEN_PROGRAM_ID,
    IDS.getUsdtMint(env),
    betAccount.publicKey,
    userAccount);

  const transferXTokensToTempAccIx = Token.createTransferInstruction(
    IDS.TOKEN_PROGRAM_ID,
    userUsdtAccount,
    betAccount.publicKey,
    userAccount,
    [],
    riskedUsdt);

  const initBetIx = initBetInstruction(
    userAccount,
    userUsdtAccount,
    oddsFeed,
    betAccount.publicKey,
    IDS.FEED_PLACEHOLDER,
    riskedUsdt,
    odds,
    IDS.FEED_PLACEHOLDER as unknown as MarketSide);

  const ix = [createTempTokenAccountIx, initTempAccountIx, transferXTokensToTempAccIx, initBetIx];

  return [ix, betAccount];
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

  if (userUsdtTokenAccount == null) {
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
    IDS.FEED_PLACEHOLDER as unknown as Game,
    IDS.FEED_PLACEHOLDER,
    riskedUsdt,
    odds,
    connection,
    env);
  let [ok,] = await sendTransaction(connection, env, wallet, ix, [betTokenAccount]);

  return ok ? betTokenAccount.publicKey : undefined;
}
