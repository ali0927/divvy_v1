import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import {struct, nu64} from "buffer-layout";

const LAYOUT = struct<DepositLiquidityData>([
    nu64("action"),
    nu64("amount")
])

interface DepositLiquidityData {
    action: number;
    amount: number;
};

export const depositLiquidityInstruction = (
    divvyProgramId:PublicKey,
    userPubKey: PublicKey,
    userUsdtPubKey:PublicKey,
    userHpPubKey:PublicKey,
    action: "deposit" | "withdraw",
    usdtLamports: number): TransactionInstruction => {

    const data: DepositLiquidityData = {
        action: action === "deposit" ? 0 : 1,
        amount: Number(usdtLamports),
    };
    const dataBuffer = Buffer.alloc(16);
    LAYOUT.encode(data, dataBuffer);

    const instruction = new TransactionInstruction({
        keys: [
            { pubkey: userPubKey, isSigner: true, isWritable: true },
            { pubkey: userUsdtPubKey, isSigner: false, isWritable: true },
            { pubkey: userHpPubKey, isSigner: false, isWritable: true },
        ],
        programId: divvyProgramId,
        data: dataBuffer,
    });
    return instruction;
}
