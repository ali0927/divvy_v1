import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { struct, nu64, u8 } from "buffer-layout";
import * as IDS from "../utils/ids";

const LAYOUT = struct<DepositLiquidityData>([
    nu64("action"),
    nu64("amount"),
    u8("divvyPdaBumpSeed")
])

interface DepositLiquidityData {
    action: number;
    amount: number;
    divvyPdaBumpSeed: number;
};

export const depositLiquidityInstruction = (
    hpTokenAccount: PublicKey,
    action: "deposit" | "withdraw",
    usdtLamports: number,
    divvyPdaBumpSeed: number): TransactionInstruction => {

    const data: DepositLiquidityData = {
        action: action === "deposit" ? 0 : 1,
        amount: usdtLamports,
        divvyPdaBumpSeed: divvyPdaBumpSeed
    };
    const dataBuffer = Buffer.alloc(LAYOUT.span);
    LAYOUT.encode(data, dataBuffer);

    const instruction = new TransactionInstruction({
        keys: [
            { pubkey: IDS.HP_MINT_ACCOUNT, isSigner: false, isWritable: true },
            { pubkey: IDS.TOKEN_PROGRAM_ID, isSigner: false, isWritable: true },
            { pubkey: hpTokenAccount, isSigner: false, isWritable: true },
            { pubkey: IDS.DIVVY_PDA_ACCOUNT, isSigner: false, isWritable: true },
        ],
        programId: IDS.DIVVY_PROGRAM_ID,
        data: dataBuffer,
    });
    return instruction;
}
