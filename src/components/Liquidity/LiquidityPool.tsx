import { useContext } from "react";
import { tokenAmountToString } from "../../constants";
import { HousePoolContext } from "../../contexts/sol/hpliquidity";
import { HousePoolStateContext } from "../../contexts/sol/hpstate";

export const LiquidityPool = () => {
  const { htBalance } = useContext(HousePoolContext);
  const { bettorBalance, liveLiquidity, lockedLiquidity } = useContext(HousePoolStateContext)
    return (
      <div className="liquidity-pool">
        <p className="text-primary">Total in Liquidity Pool</p>
        <h2><span style={{ fontSize: "2rem", fontWeight: 800 }}>{tokenAmountToString(htBalance - bettorBalance, 6, 6)}</span> USDT</h2>
      </div>
    );
};