import { useUserBalance } from "../../hooks";
import { Link } from "react-router-dom";
import { ESCROW_STATE_ID, USDT_MINT } from "../../utils/ids";

export const LiquidityViewLink = () => {
  const escrowUsdtBalance = useUserBalance(ESCROW_STATE_ID, USDT_MINT);
  return (
    <div className="sidebar-section">
      <Link to="/liquidity">
        <h3>House Pool</h3>
        <small>
          <div className="balance-container">
            <span>House Pool balance</span>
            <span className="balance">
              {/* {escrowUsdtBalance.balance.toFixed(2)} USDT */}
              {"1,000,000"} USDT
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
      </Link>
    </div>
  );
};
