import { DepositLiquidity } from "./DepositLiquidity";
import { WithdrawLiquidity } from "./WithdrawLiquidity";
import { DivvyDao } from "./DivvyDao";
import { StakeHT } from "./StakeHT";
export const MyLiquidity = (props: {}) => {
  return (
    <div>
      <div className="sidebar-section">
        <h3>My House Pool Stats</h3>
        <div className="balance-container">
          <p>
            <small>House balance</small>
          </p>
          <p className="balance">12 USDT</p>
        </div>
      </div>
      <DepositLiquidity />
      <WithdrawLiquidity />
      <DivvyDao />
      <StakeHT />
    </div>
  );
};
