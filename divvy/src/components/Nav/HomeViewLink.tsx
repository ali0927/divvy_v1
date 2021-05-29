import logo from "../../divvy-logo-v1.png";
import { Link } from "react-router-dom";

export const HomeViewLink = () => {
  return (
    <div className="sidebar-section">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
    </div>
  );
};
