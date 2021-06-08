import { Link } from "react-router-dom";
import { useContext } from "react";
import { HousePoolLiquidityContext } from "../../contexts/hpliquidity";
export const LiquidityViewLink = () => {
  const { hpBalance } = useContext(HousePoolLiquidityContext);
  return (
    <Link to="/liquidity">
      <div className="sidebar-section text-secondary">
        <h2>House Pool</h2>
        <small>
          <div className="balance-container">
            <span>House Pool balance</span>
            <span className="balance">
              {hpBalance} USDT
            </span>
          </div>
          <div className="balance-container">
            <span>Locked liquidity</span>
            <span className="balance">0 USDT</span>
          </div>
          <div className="balance-container">
            <span>Available liquidity</span>
            <span className="balance">{hpBalance} USDT</span>
          </div>
        </small>
      </div>
    </Link>
  );
};
