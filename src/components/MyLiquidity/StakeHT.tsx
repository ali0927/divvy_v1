import {
    PublicKey,
    Transaction,
    TransactionInstruction,
} from "@solana/web3.js";

import { Form, Input, Button } from "antd";
import { LAMPORTS_PER_USDT } from "../../constants";
import {
    useConnection,
    useConnectionConfig,
    sendTransaction,
} from "../../contexts/connection";
import { useWallet } from "../../contexts/wallet";
import { DIVVY_PROGRAM_ID } from "../../utils/ids";
import { notify } from "../../utils/notifications";
import { ExplorerLink } from "../ExplorerLink";

export const StakeHT = (props: {}) => {
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
            programId: DIVVY_PROGRAM_ID,
            data: data,
        });
        const transaction = new Transaction();
        transaction.add(instruction);
        await sendTransaction(
            connection,
            connectionConfig.env,
            wallet.wallet,
            [instruction]
        );
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
                <h3>Stake your House Tokens</h3>
                <div className="balance-container">
                    <p>
                        <small className="text-secondary">House Token Balance</small>
                    </p>
                    <p className="balance">12 HT</p>
                </div>
                <Form.Item
                    name="usdtAmount"
                    rules={[{ required: true, message: "Please input the USDT amount." }]}>
                    <Input.Group compact>
                      <Input placeholder={"House Token"} min="0" style={{width:"75%"}} disabled={true}/>
                      <Button style={{border: "1px solid rgb(67, 67, 67)" }} disabled={true}>MAX</Button>
                    </Input.Group>
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Stake
                </Button>
            </Form>
        </div >
    );
};
