import React, { useContext } from "react";
import { useWallet } from "../../contexts/sol/wallet";
import { formatNumber, shortenAddress } from "../../utils/utils";
import { Identicon } from "../Identicon";
import { useNativeAccount } from "../../contexts/sol/accounts";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { usdtAmountReducedLength } from "../../constants";
import { UserUSDTContext } from "../../contexts/sol/userusdt";

export const CurrentUserBadge = (props: {}) => {
  const { wallet } = useWallet();
  const { account } = useNativeAccount();
  const { userUSDT } = useContext(UserUSDTContext)
  if (!wallet?.publicKey) {
    return null;
  }

  // should use SOL ◎ ? Nope :)

  return (
    <div className="wallet-wrapper">
      <span style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
        {(usdtAmountReducedLength(userUSDT))} USDT
      </span>
      <div className="wallet-key">
        {shortenAddress(`${wallet.publicKey}`)}
        <Identicon
          address={wallet.publicKey.toBase58()}
          style={{ marginLeft: "0.5rem", display: "flex", alignSelf: 'right' }}
        />
      </div>
    </div>
  );
};
