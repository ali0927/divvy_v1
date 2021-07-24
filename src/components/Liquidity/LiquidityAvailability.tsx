
import { useContext } from "react";
import { tokenAmountToString } from "../../constants";
import { HousePoolContext } from "../../contexts/sol/hpliquidity";
export const LiquidityAvailability = () => {
  const { htBalance } = useContext(HousePoolContext);
  return (
    <div className="liquidity-left">
      <div className="header-align">
        <div className="horizontal-outline" />
        <div className="liquidity-content">
          <h3><span className="liquidity-heavy">340,860.37</span> USDT</h3>
          <p className="text-primary">78% free</p>
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
