import { DepositLiquidity } from "./DepositLiquidity";
import { WithdrawLiquidity } from "./WithdrawLiquidity";
import { DivvyDao } from "./DivvyDao";
import { StakeHT } from "./StakeHT";
import { useContext } from "react";
import { UserHPTContext } from "../../contexts/solana/userhpt";

export const MyLiquidity = (props: {}) => {
  const { userHPT } = useContext(UserHPTContext);
  return (
    <div>
      <div className="sidebar-section">
        <h3>My House Pool Stats</h3>
        <div className="balance-container">
          <p>
            <small className="text-secondary">House balance</small>
          </p>
          <p className="balance">{userHPT} HPT</p>
        </div>
        <div className="balance-container">
          <p>
            <small className="text-secondary">Exchange Rate</small>
          </p>
          <p className="balance">{1}</p>
        </div>
        <div className="balance-container">
          <p>
            <small className="text-secondary">Total balance</small>
          </p>
          <p className="balance">{userHPT} USDT</p>
        </div>
      </div>
      <DepositLiquidity />
      <WithdrawLiquidity />
      <DivvyDao />
      <StakeHT />
    </div>
  );
};
