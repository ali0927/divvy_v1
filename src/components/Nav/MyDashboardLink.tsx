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
        <h2>My Dashboard</h2>
        <small>
          <div className="balance-container">
          </div>
        </small>
      </div>
    </Link>
  );
};
