import React from "react";
import { Link } from "react-router-dom";
import LinkLabel from "./LinkLabel";
export const MyDashboardLink = () => {
  const abort = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  return (
    <Link to="/" onClick={abort}>
      <div className="sidebar-section text-secondary">
        {/* Link to the real MyDashboard when it is complete */}
        <LinkLabel style={{marginBottom: "0.83em"}}>
          <h2 style={{marginBottom: 0}}>My Dashboard</h2>
        </LinkLabel>
        <small>
          <div className="balance-container">
          </div>
        </small>
      </div>
    </Link>
  );
};
