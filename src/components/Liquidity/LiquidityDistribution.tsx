import { useContext } from "react";
import { tokenAmountToString } from "../../constants";
import { HousePoolContext } from "../../contexts/sol/hpliquidity";
import { BetStateContext } from "../../contexts/sol/betstate";
import { BetPoolContext } from "../../contexts/sol/betusdt";

export const LiquidityDistribution = () => {
  const { htBalance } = useContext(HousePoolContext);
  const { liveLiquidity, lockedLiquidity, pendingBets } = useContext(BetStateContext)
  const { bettorBalance } = useContext(BetPoolContext);
  return (
    <div className="liquidity-right">
      <div className="header-align">
        <div className="horizontal-outline" />
        <div className="liquidity-content">
          {/* <h6 className="text-secondary">Locked Liquidity</h6> */}
          <h3><span className="liquidity-heavy">{tokenAmountToString((liveLiquidity + lockedLiquidity)*100 / (htBalance + liveLiquidity + lockedLiquidity), 0, 2)}%</span> locked</h3>
          <p className="text-primary">{tokenAmountToString(liveLiquidity + lockedLiquidity)} USDC</p>
        </div>
        <div className="horizontal-outline" />
        <div className="liquidity-content">
          <h6 className="text-secondary">Reserved For</h6>
          {/* Change this */}
          <h3><span className="liquidity-heavy">{pendingBets}</span> Pending <br />Bets</h3>
        </div>
        <div className="horizontal-outline" />
      </div>
    </div>
  );
};
