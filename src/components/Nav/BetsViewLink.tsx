import { ReactComponent as Logo } from "../../img/Divvy_UI_Logo_Beta.svg"
import { Link } from "react-router-dom";

export const BetsViewLink = () => {
  return (
    <Link to="/app">
      <div className="sidebar-section" style={{display:"flex", alignContent:"center"}}>
        <Logo/>
      </div>
    </Link>
  );
};
