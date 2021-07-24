import { useContext } from "react";
import { tokenAmountToString } from "../../constants";
import { HousePoolContext } from "../../contexts/sol/hpliquidity";

export const LiquidityPool = () => {
  const { htBalance } = useContext(HousePoolContext);
  return (
    <div className="liquidity-pool">
      <p className="text-primary">Total in Liquidity Pool</p>
      <h1>{tokenAmountToString(htBalance, 6, 6)} USDT</h1>
    </div>
  );
};