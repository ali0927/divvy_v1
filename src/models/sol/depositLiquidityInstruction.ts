import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { struct, nu64, u8 } from "buffer-layout";
import * as IDS from "../../utils/ids";

const LAYOUT = struct<DepositLiquidityData>([
    u8("action"),
    nu64("amount"),
    u8("divvyPdaBumpSeed")
])

interface DepositLiquidityData {
    action: number;
    amount: number;
    divvyPdaBumpSeed: number;
};

export const depositLiquidityInstruction = (
    userAccount: PublicKey,
    userHpTokenAccount: PublicKey,
    userUsdtTokenAccount: PublicKey,
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
            { pubkey: userAccount, isSigner: true, isWritable: true },
            { pubkey: IDS.HP_MINT, isSigner: false, isWritable: true },
            { pubkey: IDS.TOKEN_PROGRAM_ID, isSigner: false, isWritable: true },
            { pubkey: userHpTokenAccount, isSigner: false, isWritable: true },
            { pubkey: IDS.DIVVY_PDA_ACCOUNT, isSigner: false, isWritable: true },
            { pubkey: userUsdtTokenAccount, isSigner: false, isWritable: true },
            { pubkey: IDS.DIVVY_USDT_ACCOUNT, isSigner: false, isWritable: true },
            { pubkey: IDS.DIVVY_STATE_ACCOUNT, isSigner: false, isWritable: true }
        ],
        programId: IDS.DIVVY_PROGRAM_ID,
        data: dataBuffer,
    });
    return instruction;
}
