import { PublicKey } from "@solana/web3.js";

import { Form, Input, Button } from "antd";
import { LAMPORTS_PER_HP as LAMPORTS_PER_HT, LAMPORTS_PER_USDC, tokenAmountToString, Transactions } from "../../constants";
import {
  useConnection,
  useConnectionConfig,
  sendTransaction,
} from "../../contexts/sol/connection";
import { useWallet } from "../../contexts/sol/wallet";
import { notify } from "../../utils/notifications";
import { WalletSlider } from "./WalletSlider"
import { depositLiquidityTransaction } from "../../models/sol/instruction/depositLiquidityInstruction";
import { useContext, useState, useEffect } from "react";
import { useAccountByMint } from "../../hooks";
import * as IDS from "../../utils/ids";
import { UserHTContext } from "../../contexts/sol/userht";
import { HPTokenContext } from "../../contexts/sol/hptoken";
import { HousePoolContext } from "../../contexts/sol/hpliquidity";
import { BetStateContext } from "../../contexts/sol/betstate";

export const WithdrawLiquidity = (props: {}) => {
  const wallet = useWallet();
  const connection = useConnection();
  const connectionConfig = useConnectionConfig();
  const htTokenAccount = useAccountByMint(IDS.HT_MINT)
  const usdcTokenAccount = useAccountByMint(IDS.getUsdtMint(connectionConfig.env))
  let [htAmount, setHtAmount] = useState("");
  const { userHT } = useContext(UserHTContext);
  const { htBalance } = useContext(HousePoolContext);
  const { htSupply } = useContext(HPTokenContext);
  const { lockedLiquidity } = useContext(BetStateContext)
  useEffect(() => {
   if(userHT === 0) setHtAmount("")
  }, [userHT])
  
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

    const [, bumpSeed] = await PublicKey.findProgramAddress([Buffer.from("divvyhouse")], IDS.HOUSE_POOL_PROGRAM_ID);

    const res = await depositLiquidityTransaction(
      connection,
      wallet.wallet.publicKey,
      htTokenAccount.pubkey,
      usdcTokenAccount?.pubkey,
      IDS.getUsdtMint(connectionConfig.env),
      "withdraw",
      htLamports * htSupply / (htBalance + lockedLiquidity),
      bumpSeed);
    const [ix, signers] = res
    let metaData: Array<Transactions> = [{
      type: "Withdraw",
      match: "-",
      odds: "-",
      odds_type: "-",
      amount: Number(htAmount)
    }];
    const [res_status, ] = await sendTransaction(
      connection,
      connectionConfig.env,
      wallet.wallet,
      ix,
      metaData,
      signers
    );
    if (res_status) setHtAmount('0')
  };

  return (
    <div className="sidebar-section form-grey">
      <h3>Divvy House Withdrawal</h3>

      <div className="balance-container">
        <p>
          <small className="text-secondary">Withdrawable balance</small>
        </p>
        <p className="balance">{tokenAmountToString((htBalance + lockedLiquidity) / htSupply * userHT)} USDC({tokenAmountToString(userHT)} HT)</p>
      </div>
      <Form.Item name="htAmount" style={{marginBottom: '1em'}}>
        <Input.Group compact>
          <Input placeholder={"USDC"} value={htAmount} onChange={event => setHtAmount(event.currentTarget.value)} style={{width: "70%"}} />
          <Button style={{border: "1px solid rgb(67, 67, 67)", width: "30%", padding:0}} onClick={e => setHtAmount(((htBalance + lockedLiquidity) / htSupply * userHT / LAMPORTS_PER_HT).toFixed(2).toString())} disabled={userHT === 0}>MAX</Button>
        </Input.Group>
      </Form.Item>

      <WalletSlider 
        onChange={(val: number) => setHtAmount(((htBalance + lockedLiquidity) / htSupply * userHT / LAMPORTS_PER_HT * val / 100).toFixed(2).toString()) }
        value={htAmount === "" ? 0: Number(htAmount) * LAMPORTS_PER_HT / ( (htBalance + lockedLiquidity) / htSupply * userHT ) * 100}
        disabled={userHT === 0}
      />

      <Button onClick={onFinish} disabled={Number(htAmount) === 0}>
        Withdraw
      </Button>
    </div>
  );
};
