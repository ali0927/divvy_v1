import { u64, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
    PublicKey,
    sendAndConfirmTransaction,
    Transaction,
    TransactionInstruction
} from "@solana/web3.js";
import { ENV } from "../../../constants/sol/env";
import { sendTransaction, useConnection } from "../../../contexts/sol/connection";
import { useWallet, WalletAdapter } from "../../../contexts/sol/wallet";
import { useAccountByMint } from "../../../hooks";
import { USDT_MINT_DEVNET } from "../../../utils/ids";
import { createTokenAccount } from "./createTokenAccount";
const FAUCET_PROGRAM_ID = new PublicKey(
    "4bXpkKSV8swHSnwqtzuboGPaPDeEgAn4Vt8GfarV5rZt"
);

const FAUCET_SIZE = 77;

const getPDA = () =>
    PublicKey.findProgramAddress([Buffer.from("faucet")], FAUCET_PROGRAM_ID)
const buildAirdropTokensIx = async (
    amount: u64,
    tokenMintPublicKey: PublicKey,
    destinationAccountPubkey: PublicKey,
    faucetPubkey: PublicKey
) => {
    const pubkeyNonce = await getPDA();

    const keys = [
        { pubkey: pubkeyNonce[0], isSigner: false, isWritable: false },
        {
            pubkey: tokenMintPublicKey,
            isSigner: false,
            isWritable: true
        },
        { pubkey: destinationAccountPubkey, isSigner: false, isWritable: true },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: faucetPubkey, isSigner: false, isWritable: false }
    ];


    return new TransactionInstruction({
        programId: FAUCET_PROGRAM_ID,
        data: Buffer.from([1, ...amount.toArray("le", 8)]),
        keys
    });
};

export const airdropTokens = async (
    usdtAddress: PublicKey | undefined,
    faucetAddress: string,
    amount: u64,
    connection: any,
    wallet: WalletAdapter | undefined,
) => {
    if (wallet?.publicKey) {
        const faucetPubkey = new PublicKey(faucetAddress);
        let tokenDestinationPublicKey = usdtAddress
        const tokenMintPubkey = USDT_MINT_DEVNET
        let ix: any = []
        let signers: any = []
        if (tokenDestinationPublicKey == null) {
            let [usdtSigner, usdtIx] = await createTokenAccount(
                connection,
                USDT_MINT_DEVNET,
                wallet.publicKey);
            ix = usdtIx;
            signers.push(usdtSigner);
            tokenDestinationPublicKey = usdtSigner.publicKey;
        }
        ix = [...ix, await buildAirdropTokensIx(
            amount,
            tokenMintPubkey,
            tokenDestinationPublicKey,
            faucetPubkey
        )];

        await sendTransaction(
            connection,
            ENV.Devnet,
            wallet!,
            ix,
            signers
        );
    }

};
