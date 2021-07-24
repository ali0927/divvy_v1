
import { useContext } from "react";
import { tokenAmountToString } from "../../constants";
import { HousePoolContext } from "../../contexts/sol/hpliquidity";
import { HousePoolStateContext } from "../../contexts/sol/hpstate";

export const LiquidityAvailability = () => {
  const { htBalance } = useContext(HousePoolContext);
  const { bettorBalance, liveLiquidity, lockedLiquidity } = useContext(HousePoolStateContext)
  return (
    <div className="liquidity-left">
      <div className="header-align">
        <div className="horizontal-outline" />
        <div className="liquidity-content">
          <h3><span className="liquidity-heavy">{tokenAmountToString(htBalance - lockedLiquidity - liveLiquidity - bettorBalance, 6, 6)}</span> USDT</h3>
          <p className="text-primary">{tokenAmountToString((htBalance * 100) / (bettorBalance + liveLiquidity + lockedLiquidity + htBalance), 0, 2)}% free</p>
        </div>
        <div className="horizontal-outline" />
        <div className="liquidity-content">
          <h6 className="text-secondary">Distributed Amongst</h6>
          <h3>278 Liquidity <br />Providers</h3>
        </div>
        <div className="horizontal-outline" />
      </div>
    </div>
  );
};
