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

export const DIVVY_PROGRAM_ID = new PublicKey("FatTSDYddftPGBVCoV6Uu2aCiMg8B8ZxV3QuoxE2PK6U");
export const BETTING_PROGRAM_ID = new PublicKey("2u9dGXkuj5iTm6B9MRn1Exx55uEYX1ZmM3xda5S3f1oY");
export const DIVVY_PDA_ACCOUNT = new PublicKey("CrCJYSbgSFa6ZE3KviaTSnmGhhBw2t3auYro2N36irH5");
export const BET_POOL_PDA_ACCOUNT = new PublicKey("PkimpSks8R9KLHsTAupcHyBgYDitaE2PXk697urr3xP");
export const DIVVY_USDT_ACCOUNT = new PublicKey("FkFbxeQ9doV1JcDdLV9zUmxGdhJezebEVuCqRr6DqWjj");
export const DIVVY_STATE_ACCOUNT = new PublicKey("5pU6Z9PeowTPZDEkGkyHTArY5XsU5xeWaWyzoJCPMf9C");
export const BET_POOL_STATE_ACCOUNT = new PublicKey("2NpaJiSE5j997Y4Nv5YwSinsh5LwMJQkTQWHhCNPBsyU");
export const BET_POOL_USDT_ACCOUNT = new PublicKey("7aohz3HthaAty4tNshTXXNATuGh85u7oSGWRP7WST3iR");
export const HT_MINT = new PublicKey("EeL2tEMppwVk8x1mzshbtD7uKLwffG2GWthjJiVrgqna");
export const USDT_MINT_MAINNET = new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB");
export const USDT_MINT_DEVNET = new PublicKey("7cnY6yuFXzTLEsnXn4FkgvmXq4FyuUakQDQqHJkbQvYG");

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
