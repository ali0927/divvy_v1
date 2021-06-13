import { useContext } from "react";
import { HousePoolContext } from "../../contexts/hpliquidity";
export const LiquidityGlobalStats = () => {
  const { hpBalance } = useContext(HousePoolContext);
  return (
    <div>
      <div className="horizontal-outline" />
      <h1>{hpBalance} USDT</h1>
      <div className="text-secondary liquidity-total">Total in the Liquidity Pool</div>
    </div>
  );
};
