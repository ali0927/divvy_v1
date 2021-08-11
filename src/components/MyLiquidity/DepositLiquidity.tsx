import { PublicKey } from "@solana/web3.js";
import { Form, Input, Button } from "antd";
import {
  useConnection,
  useConnectionConfig,
  sendTransaction,
} from "../../contexts/sol/connection";
import { useWallet } from "../../contexts/sol/wallet";
import { useAccountByMint } from "../../hooks";
import { notify } from "../../utils/notifications";
import { ExplorerLink } from "../ExplorerLink";
import { WalletSlider } from "./WalletSlider"
import { depositLiquidityTransaction } from "../../models/sol/instruction/depositLiquidityInstruction";
import { useContext, useState } from "react";
import { UserUSDTContext } from "../../contexts/sol/userusdt";
import { LAMPORTS_PER_USDT, tokenAmountToString, Transactions } from "../../constants";
import * as IDS from "../../utils/ids"

export const DepositLiquidity = () => {
  const wallet = useWallet();
  const connection = useConnection();
  const connectionConfig = useConnectionConfig();
  const htTokenAccount = useAccountByMint(IDS.HT_MINT)
  const usdtTokenAccount = useAccountByMint(IDS.getUsdtMint(connectionConfig.env))
  const { userUSDT } = useContext(UserUSDTContext)
  let [usdtAmount, setUsdtAmount] = useState("");

  const onFinish = async () => {
    if (wallet?.wallet?.publicKey == null) {
      notify({
        message: "Transaction failed...",
        description: "Please connect a wallet.",
        type: "error",
      });
      return;
    }

    const usdtLamports = Number(usdtAmount) * LAMPORTS_PER_USDT;
    if (isNaN(usdtLamports)) {
      notify({
        message: "Transaction failed...",
        description: "Invalid USDT amount.",
        type: "error",
      });
      return;
    }

    if (usdtTokenAccount == null) {
      notify({
        message: "Transaction failed...",
        description: "User does not have a USDT token account.",
        type: "error",
      });
      return;
    }


    const [, bumpSeed] = await PublicKey.findProgramAddress([Buffer.from("divvyhouse")], IDS.HOUSE_POOL_PROGRAM_ID);

    const [ix, signers] = await depositLiquidityTransaction(
      connection,
      wallet.wallet.publicKey,
      htTokenAccount?.pubkey,
      usdtTokenAccount.pubkey,
      IDS.getUsdtMint(connectionConfig.env),
      "deposit",
      usdtLamports,
      bumpSeed);

    let metaData: Array<Transactions> = [{
      type: "Deposit",
      match: "-",
      odds: "-",
      odds_type: "-",
      amount: Number(usdtAmount)
    }];
    await sendTransaction(
      connection,
      connectionConfig.env,
      wallet.wallet!,
      ix,
      metaData,
      signers,
    );
  };
  const onSliderChange = (val: any) => {

  }
  return (
    <div className="sidebar-section form-grey">
      <div>
        <h3>Divvy House Deposit</h3>
        <div className="balance-container">
          <p>
            <small className="text-secondary">Wallet balance</small>
          </p>
          <p className="balance">{tokenAmountToString(userUSDT)} USDT</p>
        </div>

        <Form.Item name="usdtAmount">
          <Input.Group compact>
            <Input placeholder={"USDT"} name="usdtAmount" value={usdtAmount} onChange={event => { setUsdtAmount(event.currentTarget.value) }} style={{ width: "75%" }} />
            <Button style={{ border: "1px solid rgb(67, 67, 67)" }} onClick={e => setUsdtAmount(tokenAmountToString(userUSDT))}>MAX</Button>
          </Input.Group>
        </Form.Item>

        <WalletSlider 
          onChange={(val: any) => setUsdtAmount(tokenAmountToString(userUSDT * val / 100)) }
          label="Percentage to deposit"
        />

        <Button onClick={onFinish}>
          Deposit
        </Button>
      </div>
    </div>
  );
};
