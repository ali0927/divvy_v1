import { ReactComponent as Logo } from "../../img/Divvy_UI_Logo_Beta.svg"
import { Link } from "react-router-dom";

export const HomeViewLink = () => {
  return (
    <Link to="/">
      <div className="sidebar-section" style={{display:"flex", alignContent:"center"}}>
        <Logo/>
      </div>
    </Link>
  );
};
