import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID_IMPORT, ASSOCIATED_TOKEN_PROGRAM_ID as ASSOCIATED_TOKEN_PROGRAM_ID_IMPORT } from "@solana/spl-token";
import { ENV } from "../constants/sol/env";

export const WRAPPED_SOL_MINT = new PublicKey("So11111111111111111111111111111111111111112");
export const TOKEN_PROGRAM_ID = TOKEN_PROGRAM_ID_IMPORT;
export const ASSOCIATED_TOKEN_PROGRAM_ID = ASSOCIATED_TOKEN_PROGRAM_ID_IMPORT;
export const LENDING_PROGRAM_ID = new PublicKey("TokenLending1111111111111111111111111111111");
export const SWAP_PROGRAM_ID = new PublicKey("SwaPpA9LAaLfeLi3a68M4DjnLqgtticKg6CnyNwgAC8");

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
export const DIVVY_PDA_ACCOUNT = new PublicKey("9tjYfuyjzs2ehSZvXAKa5wPYe2SCYpy9Q3nE57jry98Q");
export const DIVVY_USDT_ACCOUNT = new PublicKey("F3hvLnCdPvmwjgEZ5LpYAZRaGB7GLU5DvM9wARkUNbjL");
export const DIVVY_STATE_ACCOUNT = new PublicKey("6dgAns6sxE7iLTpXPcYM9ovwaC7tmSc9oy5GtjN9BCLm");
export const HT_MINT = new PublicKey("FS3qbd4PQ4cvGWSMX9VSaQT7LwgEZwZcgiQpiRy3jkvV");
export const USDT_MINT_MAINNET = new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB");
export const USDT_MINT_DEVNET = new PublicKey("E16kadnTttuUgxjtvznAfGqSBQMcmwXQoVbkxNrPh9Gf");

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
