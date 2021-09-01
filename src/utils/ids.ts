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

// Bet Pool PubKeys
export const BET_POOL_PROGRAM_ID = new PublicKey("2u9dGXkuj5iTm6B9MRn1Exx55uEYX1ZmM3xda5S3f1oY");
export const BET_POOL_STATE_ACCOUNT = new PublicKey("GrenBeaZrBvsB3bS4qiwdUVBNuEGQRRRTSdBqj1aVnED");
export const BET_POOL_PDA_ACCOUNT = new PublicKey("PkimpSks8R9KLHsTAupcHyBgYDitaE2PXk697urr3xP");
export const BET_POOL_USDC_ACCOUNT = new PublicKey("FWnEgrRnMaF4RDsff7LcdyfCAJRM7RbEUKmA6CFGh5oX");

// House Pool PubKeys
export const HOUSE_POOL_PROGRAM_ID = new PublicKey("FatTSDYddftPGBVCoV6Uu2aCiMg8B8ZxV3QuoxE2PK6U");
export const HOUSE_POOL_STATE_ACCOUNT = new PublicKey("B7Bu3DUjYmRAGhGqKE4r9G5NxzaPb1FrG8yVQC2JYZkA");
export const HOUSE_POOL_PDA_ACCOUNT = new PublicKey("CrCJYSbgSFa6ZE3KviaTSnmGhhBw2t3auYro2N36irH5");
export const HOUSE_POOL_USDC_ACCOUNT = new PublicKey("2nxcCfV6PQsCeY5KW26A4GHcLAUU62AFQzu7VFqyQW6r");

//Other Pubkeys
export const HT_MINT = new PublicKey("86HTS5dToEokqCpGPx8pdigmhVREkCHN6KGM4WUE8d8V");
export const USDC_MINT_MAINNET = new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB");
export const USDC_MINT_DEVNET = new PublicKey("7cnY6yuFXzTLEsnXn4FkgvmXq4FyuUakQDQqHJkbQvYG");
export const FAUCET_PROGRAM_ID = new PublicKey("4Y4PC5NEPE7Go6tUeEuk64PnVS9t2NXccgFS2nafy3U8");

export const getUsdtMint = (env: ENV) => {
  if (env === ENV.Mainnet) {
    return USDC_MINT_MAINNET;
  }
  return USDC_MINT_DEVNET;
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
