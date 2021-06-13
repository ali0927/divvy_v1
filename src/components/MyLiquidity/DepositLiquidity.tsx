import { PublicKey } from "@solana/web3.js";
import { Form, Input, Button } from "antd";
import {
  useConnection,
  useConnectionConfig,
  sendTransaction,
} from "../../contexts/sol/connection";
import { useWallet } from "../../contexts/sol/wallet";
import { useAccountByMint, useUserBalance } from "../../hooks";
import * as IDS from "../../utils/ids";
import { notify } from "../../utils/notifications";
import { ExplorerLink } from "../ExplorerLink";
import { LAMPORTS_PER_USDT } from "../../constants";
import { depositLiquidityInstruction } from "../../models/depositLiquidityInstruction";
import { useContext, useState } from "react";
import { UserUSDTContext } from "../../contexts/sol/userusdt";
import { HouseDeposit } from "../../models/eth/HPtransactions";

export const DepositLiquidity = (props: {}) => {
  const wallet = useWallet();
  const connection = useConnection();
  const connectionConfig = useConnectionConfig();
  const usdtBalance = useUserBalance(IDS.USDT_MINT);
  const hpTokenAccount = useAccountByMint(IDS.HP_MINT)
  const usdtTokenAccount = useAccountByMint(IDS.USDT_MINT)
  const { userUSDT } = useContext(UserUSDTContext)
  // const [form] = Form.useForm();
  // const [valuesForm, setValuesForm] = useState({});
  let [usdtAmount, setUsdtAmount] = useState("");

  // let formValues: any;

  const onFinish = async () => {
    // if (wallet?.wallet?.publicKey == null) {
    //   notify({
    //     message: "Transaction failed...",
    //     description: "Please connect a wallet.",
    //     type: "error",
    //   });
    //   return;
    // }

    // const usdtLamports = Number(usdtAmount) * LAMPORTS_PER_USDT;
    // if (isNaN(usdtLamports)) {
    //   notify({
    //     message: "Transaction failed...",
    //     description: "Invalid USDT amount.",
    //     type: "error",
    //   });
    //   return;
    // }

    // if (hpTokenAccount == null) {
    //   notify({
    //     message: "Transaction failed...",
    //     description: "User does not have a HP token account.",
    //     type: "error",
    //   });
    //   return;
    // }

    // if (usdtTokenAccount == null) {
    //   notify({
    //     message: "Transaction failed...",
    //     description: "User does not have a USDT token account.",
    //     type: "error",
    //   });
    //   return;
    // }

    // const [, bumpSeed] = await PublicKey.findProgramAddress([Buffer.from("escrow")], IDS.DIVVY_PROGRAM_ID);

    // console.log(usdtLamports + " bump seed " + bumpSeed);

    // console.log(usdtTokenAccount.pubkey.toBase58());
    // const instruction = depositLiquidityInstruction(
    //   wallet.wallet.publicKey,
    //   hpTokenAccount.pubkey,
    //   usdtTokenAccount.pubkey,
    //   "deposit",
    //   usdtLamports,
    //   bumpSeed
    // );
    // const [ok, txid] = await sendTransaction(
    //   connection,
    //   connectionConfig.env,
    //   wallet.wallet!,
    //   [instruction],
    //   true
    // );

    // if (ok) {
    //   notify({
    //     message: "Transaction success...",
    //     description: (
    //       <ExplorerLink
    //         address={txid}
    //         cluster={connectionConfig.env}
    //         type="transaction"
    //       />
    //     ),
    //   });
    // }
    HouseDeposit(parseInt(usdtAmount))
  };

  return (
    <div className="sidebar-section form-grey">
      <div>
        <h3>Divvy House Deposit</h3>
        <div className="balance-container">
          <p>
            <small className="text-secondary">Wallet balance</small>
          </p>
          <p className="balance">{userUSDT} USDT</p>
        </div>

        <Form.Item name="usdtAmount">
          <Input.Group compact>
            <Input placeholder={"USDT"} name="usdtAmount" value={usdtAmount} onChange={event => { setUsdtAmount(event.currentTarget.value) }} style={{ width: "75%" }} />
            <Button style={{ border: "1px solid rgb(67, 67, 67)" }}>MAX</Button>
          </Input.Group>
        </Form.Item>

        <Button onClick={onFinish}>
          Deposit
        </Button>
      </div>
    </div>
  );
};
