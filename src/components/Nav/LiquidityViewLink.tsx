import { Link } from "react-router-dom";
import { useContext } from "react";
import { HousePoolContext } from "../../contexts/sol/hpliquidity";
import LinkLabel from "../Nav/LinkLabel";
import { LIQUIDITY_VIEW_PATH, tokenAmountToString } from "../../constants";
export const LiquidityViewLink = () => {
  const { htBalance } = useContext(HousePoolContext);
  return (
    <Link to={LIQUIDITY_VIEW_PATH}>
      <div className="sidebar-section text-secondary">
        <LinkLabel style={{marginBottom: "0.83em"}}>
          <h2 style={{marginBottom: 0}}>House Pool</h2>
        </LinkLabel>
        <small>
          <div className="balance-container">
            <span>House Pool balance</span>
            <span className="balance">
              {tokenAmountToString(htBalance, 6, 0)} USDT
            </span>
          </div>
          <div className="balance-container">
            <span>Locked liquidity</span>
            <span className="balance">0 USDT</span>
          </div>
          <div className="balance-container">
            <span>Available liquidity</span>
            <span className="balance">{tokenAmountToString(htBalance, 6, 0)} USDT</span>
          </div>
        </small>
      </div>
    </Link>
  );
};
