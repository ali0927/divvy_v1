import {
    PublicKey,
    Transaction,
    TransactionInstruction,
} from "@solana/web3.js";

import { Form, Input, Button } from "antd";
import { env } from "yargs";
import { LAMPORTS_PER_USDT } from "../../constants";
import {
    useConnection,
    useConnectionConfig,
    sendTransaction,
} from "../../contexts/connection";
import { useWallet } from "../../contexts/wallet";
import { DIVVY_PROGRAM_IDS } from "../../utils/ids";
import { notify } from "../../utils/notifications";
import { ExplorerLink } from "../ExplorerLink";

export const DivvyDao = (props: {}) => {
    const wallet = useWallet();
    const connection = useConnection();
    const connectionConfig = useConnectionConfig();
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        const { usdtAmount, usdtAddress, hpAddress } = form.getFieldsValue();

        const usdtLamports = Number(usdtAmount) * LAMPORTS_PER_USDT;
        if (isNaN(Number(usdtLamports))) {
        }
        const data = Buffer.from(usdtLamports + ",withdraw", "utf-8");

        if (wallet.wallet?.publicKey == null) {
            notify({
                message: "Transaction failed...",
                description: "Please connect a wallet.",
                type: "error",
            });
            return;
        }

        let usdtPublicKey: PublicKey, hpPublicKey: PublicKey;
        try {
            usdtPublicKey = new PublicKey(usdtAddress);
            hpPublicKey = new PublicKey(hpAddress);
        } catch {
            notify({
                message: "Transaction failed...",
                description: "A token address is invalid.",
                type: "error",
            });
            return;
        }

        const instruction = new TransactionInstruction({
            keys: [
                { pubkey: wallet.wallet.publicKey, isSigner: false, isWritable: true },
                {
                    pubkey: usdtPublicKey,
                    isSigner: false,
                    isWritable: true,
                },
                { pubkey: hpPublicKey, isSigner: false, isWritable: true },
            ],
            programId: DIVVY_PROGRAM_IDS[connectionConfig.env],
            data: data,
        });
        const transaction = new Transaction();
        transaction.add(instruction);
        const [ok, txid] = await sendTransaction(
            connection,
            connectionConfig.env,
            wallet.wallet,
            [instruction],
            true
        );

        if (ok) {
            notify({
                message: "Transaction success...",
                description: (
                    <>
                        <ExplorerLink address={txid} type="transaction" cluster={connectionConfig.env} />
                    </>
                ),
                type: "error",
            });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="sidebar-section">
            <Form
                form={form}
                name="withdrawLiquidity"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="form-grey"
            >
                <h3>Divvy DAO</h3>

                <div className="balance-container">
                    <p>
                        <small>Staked Balance</small>
                    </p>
                    <p className="balance">12 HT</p>
                </div>
    
                <div className="balance-container">
                    <p>
                        <small>DVY Reward</small>
                    </p>
                    <p className="balance">12 DVY</p>
                </div>
                
                <div style={{ display: "flex" }}>
                    <Button type="primary" htmlType="submit">
                        Withdraw
                    </Button>
                    <Button style={{ marginLeft: 10}} type="primary" htmlType="submit">
                        Withdraw & Claim
                    </Button>
                </div>
            </Form>
        </div >
    );
};
