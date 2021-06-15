import { PublicKey } from "@solana/web3.js";

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
import { depositLiquidityInstruction } from "../../models/depositLiquidityInstruction";
import { useState } from "react";
import { useAccountByMint, useUserBalance } from "../../hooks";
import * as IDS from "../../utils/ids";

export const WithdrawLiquidity = (props: {}) => {
  const wallet = useWallet();
  const connection = useConnection();
  const connectionConfig = useConnectionConfig();
  const hpTokenAccount = useAccountByMint(IDS.HP_MINT)
  const usdtTokenAccount = useAccountByMint(IDS.USDT_MINT)
  let [usdtAmount, setUsdtAmount] = useState("");

  const onFinish = async (values: any) => {
    if (wallet.wallet?.publicKey == null) {
      notify({
        message: "Transaction failed...",
        description: "Please connect a wallet.",
        type: "error",
      });
      return;
    }

    let usdtLamports = Number(usdtAmount) * LAMPORTS_PER_USDT;
    if(isNaN(usdtLamports)) {
      notify({
        message: "Transaction failed...",
        description: "Invalid USDT amount.",
        type: "error",
      });
      return;
    }

    if(hpTokenAccount?.info == null) {
      notify({
        message: "Transaction failed...",
        description: "User does not have a HP token account.",
        type: "error",
      });
      return;
    }

    if(usdtTokenAccount?.info == null) {
      notify({
        message: "Transaction failed...",
        description: "User does not have a USDT token account.",
        type: "error",
      });
      return;
    }

    const [, bumpSeed] = await PublicKey.findProgramAddress([Buffer.from("escrow")], IDS.DIVVY_PROGRAM_ID);
    
    const instruction = depositLiquidityInstruction(
      wallet.wallet.publicKey,
      hpTokenAccount.pubkey,
      usdtTokenAccount.pubkey,
      "withdraw",
      usdtLamports,
      bumpSeed
    );

    await sendTransaction(
      connection,
      connectionConfig.env,
      wallet.wallet,
      [instruction]
    );
  };

  return (
    <div className="sidebar-section form-grey">
        <h3>Divvy House Withdrawal</h3>

        <div className="balance-container">
          <p>
            <small className="text-secondary">Withdrawable balance</small>
          </p>
          <p className="balance">12 USDT</p>
        </div>
        <Form.Item
          // label="USDT amount to withdraw:"
          name="usdtAmount"
        >
          <Input.Group compact>
            <Input placeholder={"USDT"} value={usdtAmount} onChange={event => setUsdtAmount(event.currentTarget.value)} style={{width:"75%"}}/>
            <Button style={{border: "1px solid rgb(67, 67, 67)" }}>MAX</Button>
          </Input.Group>
        </Form.Item>

        <Button onClick={onFinish}>
          Withdraw
        </Button>
    </div>
  );
};
