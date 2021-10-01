import {
  ENV as ChainID,
} from "@solana/spl-token-registry";
import { clusterApiUrl } from "@solana/web3.js";

export enum ENV {
  Mainnet = "mainnet-beta",
  Testnet = "testnet",
  Devnet = "devnet",
  Localnet = "localnet"
}

export const ENDPOINTS = [
    {
        name: ENV.Mainnet,
        endpoint: "https://solana-api.projectserum.com/",
        chainID: ChainID.MainnetBeta,
    },
    {
        name: ENV.Testnet,
        endpoint: clusterApiUrl(ENV.Testnet),
        chainID: ChainID.Testnet,
    },
    {
        name: ENV.Devnet,
        endpoint: "https://fragrant-little-sun.solana-devnet.quiknode.pro/20008be8fe54bd8340c51d68d01b837daffa66d6/",
        chainID: ChainID.Devnet,
    },
    {
        name: ENV.Localnet,
        endpoint: "http://127.0.0.1:8899",
        chainID: ChainID.Devnet,
    },
];