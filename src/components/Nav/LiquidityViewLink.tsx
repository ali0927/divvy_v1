import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserHPTContext } from "../../contexts/sol/userhpt";
import LinkLabel from "../Nav/LinkLabel";
export const LiquidityViewLink = () => {
  const { hpBalance } = useContext(UserHPTContext);
  return (
    <Link to="/liquidity">
      <div className="sidebar-section text-secondary">
        <LinkLabel style={{marginBottom: "0.83em"}}>
          <h2 style={{marginBottom: 0}}>House Pool</h2>
        </LinkLabel>
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
