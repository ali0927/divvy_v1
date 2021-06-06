import React from "react";
import { Link } from "react-router-dom";
export const MyDashboardLink = () => {
  const abort = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  return (
    <Link to="/" onClick={abort}>
      <div className="sidebar-section">
        {/* Link to the real MyDashboard when it is complete */}
        <h3>My Dashboard</h3>
        <small>
          <div className="balance-container">
            <span>House Pool balance</span>
            <span className="balance">1,000,000 USDT</span>
          </div>
        </small>
      </div>
    </Link>
  );
};
