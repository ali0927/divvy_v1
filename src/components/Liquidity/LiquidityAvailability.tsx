
import { useContext } from "react";
import { tokenAmountToString } from "../../constants";
import { HousePoolContext } from "../../contexts/sol/hpliquidity";
import { BetStateContext } from "../../contexts/sol/betstate";

export const LiquidityAvailability = () => {
  const { htBalance, accountData } = useContext(HousePoolContext);
  const { liveLiquidity, lockedLiquidity, pendingBets } = useContext(BetStateContext)
  return (
    <div className="liquidity-left">
      <div className="header-align">
        <div className="horizontal-outline" />
        <div className="liquidity-content">
          {/* <h6 className="text-secondary">Available Liquidity</h6> */}
          <h3><span className="liquidity-heavy">{tokenAmountToString(((htBalance) * 100) / (htBalance + lockedLiquidity + liveLiquidity), 0, 2)}%</span> free</h3>
          <p className="text-primary">{tokenAmountToString(htBalance)} USDC</p>
        </div>
        <div className="horizontal-outline" />
        <div className="liquidity-content">
          <h6 className="text-secondary">Distributed amongst</h6>
          <h3><span className="liquidity-heavy">{pendingBets}</span> Liquidity <br />Providers</h3>
        </div>
        <div className="horizontal-outline" />
      </div>
    </div>
  );
};
