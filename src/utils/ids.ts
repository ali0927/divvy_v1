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

export const DIVVY_PROGRAM_ID = new PublicKey("B14sFsX8NXEV4ujSYsYTkXBeV8mLh89QmTqzbRFFLY1f")
export const DIVVY_PDA_ACCOUNT = new PublicKey("6cdK5Kgtj7aeqJs3qSefSn25SCXrPfZsqjHsUqwJf7nM");
export const DIVVY_USDT_ACCOUNT = new PublicKey("9kZBknDMoTGTpAy6GRFMrfwXz7HeNqtLoyqJdXA3uV1e");
export const DIVVY_STATE_ACCOUNT = new PublicKey("2theHfNiJdVSiz8BT39ASgnXNzEkVSDtfU1zyap1KWog");
export const HP_MINT = new PublicKey("8KXUbMzoKVropDw4sFo1Z4RQRjdWoDBcueiC6qXQLS1U");
const USDT_MINT_MAINNET = new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB");
const USDT_MINT_DEVNET = new PublicKey("5pNyrzGwHLP5cUPXxSuEXLsu6USZWEmtVhXSFFQSVGdp");
export const FEED_PLACEHOLDER = new PublicKey("Dc6YtAgaLJEin86SikGaaM3JHFjv2bSpsUzYVW2nrnhp");

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
