import { DepositLiquidity } from "./DepositLiquidity";
import { WithdrawLiquidity } from "./WithdrawLiquidity";
import { DivvyDao } from "./DivvyDao";
import { StakeHT } from "./StakeHT";
import { HousePoolLiquidityContext } from "../../contexts/hpliquidity";
import { useContext } from "react";

export const MyLiquidity = (props: {}) => {
  const { hpBalance } = useContext(HousePoolLiquidityContext);
  return (
    <div>
      <div className="sidebar-section">
        <h3>My House Pool Stats</h3>
        <div className="balance-container">
          <p>
            <small className="text-secondary">House balance</small>
          </p>
          <p className="balance">{hpBalance} USDT</p>
        </div>
      </div>
      <DepositLiquidity />
      <WithdrawLiquidity />
      <DivvyDao />
      <StakeHT />
    </div>
  );
};
