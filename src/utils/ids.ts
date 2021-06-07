import { PublicKey } from "@solana/web3.js";
import { ENV } from "../contexts/connection";
import { TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID_IMPORT } from "@solana/spl-token";

export const WRAPPED_SOL_MINT = new PublicKey("So11111111111111111111111111111111111111112");
//export const USDT_MINT = new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB");

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

export const DIVVY_PROGRAM_ID = new PublicKey("CBhSxLuxnkciaUVxbZ38avf998VVSy4XZQpoZDSXHKG5")
export const DIVVY_PDA_ACCOUNT = new PublicKey("6cdK5Kgtj7aeqJs3qSefSn25SCXrPfZsqjHsUqwJf7nM");
export const DIVVY_USDT_ACCOUNT = new PublicKey("9kZBknDMoTGTpAy6GRFMrfwXz7HeNqtLoyqJdXA3uV1e");
export const USDT_MINT = new PublicKey("3AuJgMxExNnpS86QSLEMoWUbBUtHtMuBRU8qJMyVTVc3"); // test token
export const HP_MINT = new PublicKey("4s5FNFMBrdBLwZnrXVtUMgrN73yttwvxVW2gh7rjhe5J");
export const ESCROW_STATE_ID = new PublicKey("2theHfNiJdVSiz8BT39ASgnXNzEkVSDtfU1zyap1KWog");

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
