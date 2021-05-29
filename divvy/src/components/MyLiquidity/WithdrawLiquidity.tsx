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

export const WithdrawLiquidity = (props: {}) => {
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
      data: data,
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
      name="withdrawLiquidity"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <h3>Withdraw your liquidity.</h3>

      <div
        className="flex-container flex-horizontal"
        style={{ alignItems: "center" }}
      >
        <p style={{ width: "50%" }}>
          <small>Available amount to withdraw</small>
        </p>
        <p className="flex-end" style={{ textAlign: "right", width: "50%" }}>
          XXX.XX USDT
        </p>
      </div>

      <Form.Item
        label="USDT amount to withdraw:"
        name="usdtAmount"
        rules={[{ required: true, message: "Please input the USDT amount." }]}
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
        Withdraw
      </Button>
    </Form>
  );
};
