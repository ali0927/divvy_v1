import { useUserBalance } from "../../hooks";
import { Link } from "react-router-dom";
import { ESCROW_PROGRAM_ID, USDT_MINT } from "../../utils/ids";

export const LiquidityViewLink = () => {
  const escrowUsdtBalance = useUserBalance(ESCROW_PROGRAM_ID, USDT_MINT);
  return (
    <div className="sidebar-section">
      <Link to="/liquidity">
        <h3>Liquidity Pool</h3>
        <small>
          <div className="balance-container">
            <span>Liquidity pool balance</span>
            <span className="balance">
              {escrowUsdtBalance.balance.toFixed(2)} USDT
            </span>
          </div>
          <div className="balance-container">
            <span>Locked liquidity</span>
            <span className="balance">X.XX USDT</span>
          </div>
          <div className="balance-container">
            <span>Available liquidity</span>
            <span className="balance">X.XX USDT</span>
          </div>
        </small>
      </Link>
    </div>
  );
};
