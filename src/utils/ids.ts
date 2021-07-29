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

export const DIVVY_PROGRAM_ID = new PublicKey("6mevH4HoqvLVNUsnbn9dWg4iBt3EZMY6REcjasnQH1YE")
export const DIVVY_PDA_ACCOUNT = new PublicKey("4qBaNELYUcfNyxuYzC8jQ48rtDAebwFrPA261ADnSSff");
export const DIVVY_USDT_ACCOUNT = new PublicKey("8CpR6h8pZuxP7upsiRpdqkja2FTLwGq4oooLD3FFvNHq");
export const DIVVY_STATE_ACCOUNT = new PublicKey("57L7uKWn31Qp71v8rQJ8LbQzvipNVT1mbWcQokZ6DgW6");
export const HT_MINT = new PublicKey("H5dfyMFdk6MqXU76BgwwuL5bdj2jbxFXafzTp8WmqZnk");
export const USDT_MINT_MAINNET = new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB");
export const USDT_MINT_DEVNET = new PublicKey("DHbmkxDTm2yS6G3uK86RKGxKkfHtchh7whnmhuxey5i");

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
