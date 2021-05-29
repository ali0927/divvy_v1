import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

import { Form, Input, Button } from "antd";
import {
  useConnection,
  useConnectionConfig,
  sendTransaction,
} from "../../contexts/connection";
import { useWallet } from "../../contexts/wallet";
import { DIVVY_PROGRAM_IDS } from "../../utils/ids";
import { notify } from "../../utils/notifications";
import { ExplorerLink } from "../ExplorerLink";

export const DepositLiquidity = (props: {}) => {
  const wallet = useWallet();
  const connection = useConnection();
  const connectionConfig = useConnectionConfig();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const { usdtAmount, usdtAddress, hpAddress } = form.getFieldsValue();

    if (wallet.wallet?.publicKey == null) {
      notify({
        message: "Transaction failed...",
        description: "Please connect a wallet.",
        type: "error",
      });
      return;
    }

    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: wallet.wallet.publicKey, isSigner: false, isWritable: true },
        {
          pubkey: new PublicKey(usdtAddress),
          isSigner: false,
          isWritable: true,
        },
        { pubkey: new PublicKey(hpAddress), isSigner: false, isWritable: true },
      ],
      programId: DIVVY_PROGRAM_IDS[connectionConfig.env],
      data: Buffer.from(usdtAmount + ",deposit", "utf-8"),
    });
    const transaction = new Transaction();
    transaction.add(instruction);
    const [ok, txid] = await sendTransaction(
      connection,
      wallet.wallet,
      [instruction],
      true
    );

    if (ok) {
      notify({
        message: "Transaction success...",
        description: (
          <>
            <ExplorerLink address={txid} type="transaction" />
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
    <Form
      form={form}
      name="depositLiquidity"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <h3>Provide liquidity to Divvy.</h3>

      <Form.Item
        label="USDT amount to deposit:"
        name="usdtAmount"
        rules={[{ required: true, message: "Please input the USDT amount." }]}
        className="text-muted"
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="USDT Address:"
        name="usdtAddress"
        rules={[{ required: true, message: "Please enter your USDT address." }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="House Pool Address"
        name="hpAddress"
        rules={[
          { required: true, message: "Please enter your house pool address." },
        ]}
      >
        <Input />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Deposit
      </Button>
    </Form>
  );
};
