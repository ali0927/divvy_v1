import React, { useContext } from "react";
import { useWallet } from "../../contexts/sol/wallet";
import { formatNumber, shortenAddress } from "../../utils/utils";
import { Identicon } from "../Identicon";
import { useNativeAccount } from "../../contexts/sol/accounts";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { usdcAmountReducedLength } from "../../constants";
import { UserUSDCContext } from "../../contexts/sol/userusdc";

export const CurrentUserBadge = (props: {}) => {
  const { wallet } = useWallet();
  const { account } = useNativeAccount();
  const { userUSDC } = useContext(UserUSDCContext)
  if (!wallet?.publicKey) {
    return null;
  }

  // should use SOL ◎ ? Nope :)

  return (
    <div className="wallet-wrapper">
      <span style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
        {(usdcAmountReducedLength(userUSDC))} USDC
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
