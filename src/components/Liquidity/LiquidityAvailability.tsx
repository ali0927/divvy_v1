
import { useContext } from "react";
import { tokenAmountToString } from "../../constants";
import { HousePoolContext } from "../../contexts/sol/hpliquidity";
import { BetStateContext } from "../../contexts/sol/betstate";

export const LiquidityAvailability = () => {
  const { htBalance } = useContext(HousePoolContext);
  const { liveLiquidity, lockedLiquidity, pendingBets } = useContext(BetStateContext)
  return (
    <div className="liquidity-left">
      <div className="header-align">
        <div className="horizontal-outline" />
        <div className="liquidity-content">
          <h6 className="text-secondary">Available Liquidity</h6>
          <h3><span className="liquidity-heavy">{tokenAmountToString(htBalance - lockedLiquidity)}</span> USDC</h3>
          <p className="text-primary">{tokenAmountToString(((htBalance - lockedLiquidity) * 100) / (htBalance), 0, 2)}% available</p>
        </div>
        <div className="horizontal-outline" />
        <div className="liquidity-content">
          <h6 className="text-secondary">Reserved For</h6>
          <h3><span className="liquidity-heavy">{pendingBets}</span> Pending <br />Bets</h3>
        </div>
        <div className="horizontal-outline" />
      </div>
    </div>
  );
};
