import { Link } from "react-router-dom";
import { useContext } from "react";
import { HousePoolContext } from "../../contexts/sol/hpliquidity";
import LinkLabel from "../Nav/LinkLabel";
import { LIQUIDITY_VIEW_PATH, tokenAmountToString } from "../../constants";
import { BetStateContext } from "../../contexts/sol/betstate";

export const LiquidityViewLink = () => {
  const { htBalance } = useContext(HousePoolContext);
  const { liveLiquidity, lockedLiquidity } = useContext(BetStateContext)
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
              {tokenAmountToString(htBalance)} USDC
            </span>
          </div>
          <div className="balance-container">
            <span>Locked liquidity</span>
            <span className="balance">{tokenAmountToString(liveLiquidity + lockedLiquidity)} USDC</span>
          </div>
          <div className="balance-container">
            <span>Available liquidity</span>
            <span className="balance">{tokenAmountToString(htBalance)} USDC</span>
          </div>
        </small>
      </div>
    </Link>
  );
};
