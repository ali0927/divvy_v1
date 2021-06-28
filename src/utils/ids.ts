import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID_IMPORT } from "@solana/spl-token";
import { ENV } from "../constants/sol/env";

export const WRAPPED_SOL_MINT = new PublicKey("So11111111111111111111111111111111111111112");
export let TOKEN_PROGRAM_ID = TOKEN_PROGRAM_ID_IMPORT;
export let LENDING_PROGRAM_ID = new PublicKey("TokenLending1111111111111111111111111111111");
export let SWAP_PROGRAM_ID = new PublicKey("SwaPpA9LAaLfeLi3a68M4DjnLqgtticKg6CnyNwgAC8");

export const PROGRAM_IDS = [
  {
    name: "mainnet-beta",
  },
  {
    name: "testnet",
  },
  {
    name: "devnet",
  },
  {
    name: "localnet",
  },
];

export const DIVVY_PROGRAM_ID = new PublicKey("96qPDQTvLTQsNE9aQ73Xh3dRFj9UmX3Hpp48vpWuuTKj")
export const DIVVY_PDA_ACCOUNT = new PublicKey("7F2gxFmypW1wdwyQBioXPEoLteEczZB2is7YVUSj7KQb");
export const DIVVY_USDT_ACCOUNT = new PublicKey("2KaLTsgSTAyCoAN4Wai457qUc6sphGbnv8DWZ9ocre8S");
export const DIVVY_STATE_ACCOUNT = new PublicKey("FbTPknWrLLn9sp4aCKga2iCQ1kxptDh3JdZ4UBfDYoEb");
export const HP_MINT = new PublicKey("Fbd4Yw4UkyjEy1VhDHWNAtwhqUHimSZPb6RKQwZ2BAFF");
const USDT_MINT_MAINNET = new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB");
const USDT_MINT_DEVNET = new PublicKey("DC1mLtpCgcFWKuBFhEx6RS4awkzkCv3Ai3RmBDcdjMJh");

export const getUsdtMint = (env: ENV) => {
  if (env === ENV.Mainnet) {
    return USDT_MINT_MAINNET;
  }
  return USDT_MINT_DEVNET;
}

export const setProgramIds = (envName: string) => {
  let instance = PROGRAM_IDS.find((env) => env.name === envName);
  if (!instance) {
    return;
  }
};

export const programIds = () => {
  return {
    token: TOKEN_PROGRAM_ID,
  };
};
