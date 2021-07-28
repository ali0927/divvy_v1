import { PublicKey } from "@solana/web3.js";

import { Form, Input, Button } from "antd";
import { LAMPORTS_PER_HP as LAMPORTS_PER_HT, LAMPORTS_PER_USDT, tokenAmountToString, Transactions } from "../../constants";
import {
  useConnection,
  useConnectionConfig,
  sendTransaction,
} from "../../contexts/sol/connection";
import { useWallet } from "../../contexts/sol/wallet";
import { notify } from "../../utils/notifications";
import { depositLiquidityTransaction } from "../../models/sol/instruction/depositLiquidityInstruction";
import { useContext, useState } from "react";
import { useAccountByMint } from "../../hooks";
import * as IDS from "../../utils/ids";
import { UserHTContext } from "../../contexts/sol/userht";

export const WithdrawLiquidity = (props: {}) => {
  const wallet = useWallet();
  const connection = useConnection();
  const connectionConfig = useConnectionConfig();
  const htTokenAccount = useAccountByMint(IDS.HT_MINT)
  const usdtTokenAccount = useAccountByMint(IDS.getUsdtMint(connectionConfig.env))
  let [htAmount, setHtAmount] = useState("");
  const { userHT } = useContext(UserHTContext);
  const onFinish = async (values: any) => {
    if (wallet.wallet?.publicKey == null) {
      notify({
        message: "Transaction failed...",
        description: "Please connect a wallet.",
        type: "error",
      });
      return;
    }

    let htLamports = Number(htAmount) * LAMPORTS_PER_HT;
    if (isNaN(htLamports)) {
      notify({
        message: "Transaction failed...",
        description: "Invalid HT amount.",
        type: "error",
      });
      return;
    }

    if (htTokenAccount == null) {
      notify({
        message: "Transaction failed...",
        description: "User does not have a HP token account.",
        type: "error",
      });
      return;
    }

    const [, bumpSeed] = await PublicKey.findProgramAddress([Buffer.from("divvyexchange")], IDS.DIVVY_PROGRAM_ID);

    const [ix, signers] = await depositLiquidityTransaction(
      connection,
      wallet.wallet.publicKey,
      htTokenAccount.pubkey,
      usdtTokenAccount?.pubkey,
      IDS.getUsdtMint(connectionConfig.env),
      "withdraw",
      htLamports,
      bumpSeed);
    let metaData: Array<Transactions> = [{
      type: "Withdraw",
      match: "-",
      odds: "-",
      odds_type: "-",
      amount: Number(htAmount)
    }];
    await sendTransaction(
      connection,
      connectionConfig.env,
      wallet.wallet,
      ix,
      metaData,
      signers
    );
  };

  return (
    <div className="sidebar-section form-grey">
      <h3>Divvy House Withdrawal</h3>

      <div className="balance-container">
        <p>
          <small className="text-secondary">Withdrawable balance</small>
        </p>
        <p className="balance">{tokenAmountToString(userHT)} HT</p>
      </div>
      <Form.Item name="htAmount">
        <Input.Group compact>
          <Input placeholder={"HT"} value={htAmount} onChange={event => setHtAmount(event.currentTarget.value)} style={{ width: "75%" }} />
          <Button style={{ border: "1px solid rgb(67, 67, 67)" }}>MAX</Button>
        </Input.Group>
      </Form.Item>

      <Button onClick={onFinish}>
        Withdraw
      </Button>
    </div>
  );
};
