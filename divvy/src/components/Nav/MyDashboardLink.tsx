import React from "react";
import { Link } from "react-router-dom";
export const MyDashboardLink = () => {
  const abort = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  return (
    <div className="sidebar-section">
      <Link to="/" onClick={abort}>
        {/* Link to the real MyDashboard when it is complete */}
        <h3>My Dashboard</h3>
        <small>
          <div className="balance-container">
            <span>Liquidity pool balance</span>
            <span className="balance">X.XX D</span>
          </div>
        </small>
      </Link>
    </div>
  );
};
