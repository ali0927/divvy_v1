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
import { DIVVY_PROGRAM_IDS } from "../../utils/ids";
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
                <h3>Stake your House Tokens</h3>
                <div className="balance-container">
                    <p>
                        <small>House Token Balance</small>
                    </p>
                    <p className="balance">12 HT</p>
                </div>
                <Form.Item
                    label="Amount to Stake"
                    name="usdtAmount"
                    rules={[{ required: true, message: "Please input the USDT amount." }]}
                >
                    <Input placeholder={"House Token"} type="number" min="0" />
                </Form.Item>

                {/* <Form.Item
            label="USDT Address:"
            name="usdtAddress"
            rules={[
              { required: true, message: "Please enter your USDT address." },
            ]}
          >
            <Input />
          </Form.Item>
  
          <Form.Item
            label="House Pool Address"
            name="hpAddress"
            rules={[
              {
                required: true,
                message: "Please enter your house pool address.",
              },
            ]}
          >
            <Input />
          </Form.Item> */}
                <Button type="primary" htmlType="submit">
                    Stake
                </Button>
            </Form>
        </div >
    );
};
