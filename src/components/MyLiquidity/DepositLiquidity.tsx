import { PublicKey } from "@solana/web3.js";
import { Form, Input, Button } from "antd";
import {
  useConnection,
  useConnectionConfig,
  sendTransaction,
} from "../../contexts/connection";
import { useWallet } from "../../contexts/wallet";
import { useUserBalance } from "../../hooks";
import { DIVVY_PROGRAM_IDS, USDT_MINT } from "../../utils/ids";
import { notify } from "../../utils/notifications";
import { ExplorerLink } from "../ExplorerLink";
import { LAMPORTS_PER_USDT } from "../../constants";
import { depositLiquidityInstruction } from "../../models/depositLiquidityInstruction";

export const DepositLiquidity = (props: {}) => {
  const wallet = useWallet();
  const connection = useConnection();
  const connectionConfig = useConnectionConfig();
  const usdtBalance = useUserBalance(USDT_MINT);
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

    let usdtLamports: bigint;
    try {
      usdtLamports = BigInt(usdtAmount) * BigInt(LAMPORTS_PER_USDT);
    } catch {
      notify({
        message: "Transaction failed...",
        description: "Invalid USDT amount.",
        type: "error",
      });
      return;
    }

    const instruction = depositLiquidityInstruction(
      DIVVY_PROGRAM_IDS[connectionConfig.env],
      wallet.wallet.publicKey,
      usdtPublicKey,
      hpPublicKey,
      "deposit",
      Number(usdtLamports)
    );
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
            <ExplorerLink
              address={txid}
              cluster={connectionConfig.env}
              type="transaction"
            />
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
          <Input type="number" min="0" max={usdtBalance.balance} />
        </Form.Item>

        <Form.Item
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
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Deposit
        </Button>
      </Form>
    </div>
  );
};
