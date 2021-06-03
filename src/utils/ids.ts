import { PublicKey } from "@solana/web3.js";
import { ENV } from "../contexts/connection";

export const WRAPPED_SOL_MINT = new PublicKey("So11111111111111111111111111111111111111112");
//export const USDT_MINT = new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB");
export const USDT_MINT = new PublicKey("3AuJgMxExNnpS86QSLEMoWUbBUtHtMuBRU8qJMyVTVc3"); // test token

export let TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
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

// Use ENV union type in connection.tsx when accessing these
export const DIVVY_PROGRAM_IDS: { [env: string] : PublicKey; } = {
  "devnet" : new PublicKey("D7QWZHKyUwmGVp2oxF5GVLgKj2JJ8oYkTMXmc1zNHtEu") // THIS IS A PLACEHOLDER !!
};

export const ESCROW_PROGRAM_ID = new PublicKey("2theHfNiJdVSiz8BT39ASgnXNzEkVSDtfU1zyap1KWog"); // THIS IS A PLACEHOLDER !!

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
