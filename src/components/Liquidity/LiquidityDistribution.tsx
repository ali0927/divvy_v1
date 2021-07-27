import { useContext } from "react";
import { tokenAmountToString } from "../../constants";
import { HousePoolContext } from "../../contexts/sol/hpliquidity";
import { HousePoolStateContext } from "../../contexts/sol/hpstate";

export const LiquidityDistribution = () => {
  const { htBalance } = useContext(HousePoolContext);
  const { bettorBalance, liveLiquidity, lockedLiquidity, pendingBets } = useContext(HousePoolStateContext)
  return (
    <div className="liquidity-right">
      <div className="header-align">
        <div className="horizontal-outline" />
        <div className="liquidity-content">
          <h6 className="text-secondary">Locked Liquidity</h6>
          <h3><span className="liquidity-heavy">{tokenAmountToString(liveLiquidity + lockedLiquidity, 6, 6)}</span> USDT</h3>
          <p className="text-primary">{tokenAmountToString((liveLiquidity + lockedLiquidity)*100 / (htBalance - bettorBalance), 0, 2)}% locked</p>
        </div>
        <div className="horizontal-outline" />
        <div className="liquidity-content">
          <h6 className="text-secondary">Reserved For</h6>
          <h3>{pendingBets} Pending <br />Bets</h3>
        </div>
        <div className="horizontal-outline" />
      </div>
    </div>
  );
};
