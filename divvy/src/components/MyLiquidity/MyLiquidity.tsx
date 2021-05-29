import { DepositLiquidity } from "./DepositLiquidity";
import { WithdrawLiquidity } from "./WithdrawLiquidity";
export const MyLiquidity = (props: {}) => {
  return (
    <div>
      <h3>My Liquidity Stats</h3>
      <br />
      <DepositLiquidity />
      <br />
      <br />
      <WithdrawLiquidity />
    </div>
  );
};
