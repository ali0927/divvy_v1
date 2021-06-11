import { useContext } from "react";
import { HousePoolLiquidityContext } from "../../contexts/solana/hpliquidity";
export const LiquidityGlobalStats = () => {
  const { hpBalance } = useContext(HousePoolLiquidityContext);
  return (
    <div>
      <div className="horizontal-outline" />
      <h1>{hpBalance} USDT</h1>
      <div className="text-secondary liquidity-total">Total in the Liquidity Pool</div>
    </div>
  );
};
