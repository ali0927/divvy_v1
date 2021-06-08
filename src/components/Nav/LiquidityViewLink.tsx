import { useUserBalance } from "../../hooks";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { HousePoolLiquidityContext } from "../../contexts/hpliquidity";
export const LiquidityViewLink = () => {
  const { accountData, hpBalance } = useContext(HousePoolLiquidityContext);
  return (
    <Link to="/liquidity">
      <div className="sidebar-section text-secondary">
        <h2>House Pool</h2>
        <small>
          <div className="balance-container">
            <span>House Pool balance</span>
            <span className="balance">
              {/* {escrowUsdtBalance.balance.toFixed(2)} USDT */}
              {hpBalance} USDT
            </span>
          </div>
          <div className="balance-container">
            <span>Locked liquidity</span>
            <span className="balance">88,888 USDT</span>
          </div>
          <div className="balance-container">
            <span>Available liquidity</span>
            <span className="balance">911,112 USDT</span>
          </div>
        </small>
      </div>
    </Link>
  );
};
