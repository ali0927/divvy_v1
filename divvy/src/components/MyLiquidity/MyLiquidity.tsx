import { DepositLiquidity } from "./DepositLiquidity";
import { WithdrawLiquidity } from "./WithdrawLiquidity";
export const MyLiquidity = (props: {}) => {
  return (
    <div>
      <div className="sidebar-section">
        <h3>My Liquidity Stats</h3>
      </div>
      <DepositLiquidity />
      <WithdrawLiquidity />
    </div>
  );
};
