import React from "react";
import { Link } from "react-router-dom";

export const LiquidityViewLink = () => {
  return (
    <div className="sidebar-section">
      <Link to="/liquidity">
        <h3>Liquidity Pool</h3>
        <small>
          <div className="balance-container">
            <span>Liquidity pool balance</span>
            <span className="balance">X.XX D</span>
          </div>
          <div className="balance-container">
            <span>Locked liquidity</span>
            <span className="balance">X.XX D</span>
          </div>
          <div className="balance-container">
            <span>Available liquidity</span>
            <span className="balance">X.XX D</span>
          </div>
        </small>
      </Link>
    </div>
  );
};
