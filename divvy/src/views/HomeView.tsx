import logo from "../divvy-logo-v1.png";
import { useUserBalance } from "../hooks/useUserBalance";
import { WRAPPED_SOL_MINT } from "../utils/ids";
import { LABELS } from "../constants";
import { Wallet } from "../components/Wallet/Wallet";
import { RightSideBar } from "../components/RightSideBar";
import { LeftSideBar } from "../components/LeftSideBar";
import { NavBar } from "../components/Nav/NavBar";

export const HomeView = () => {
  const SOL = useUserBalance(WRAPPED_SOL_MINT);
  return (
    <div className="App ">
      <LeftSideBar>
        <NavBar />
      </LeftSideBar>
      <header className="App-header">
        <Wallet />
        <img src={logo} alt="logo" />
        <p>Divvy.. now you see me, now you don't!</p>
        <p>
          {LABELS.SOL_BALANCE}: {SOL.balance}
        </p>
      </header>
      <RightSideBar>
        <div className="sidebar-section">
          <h3>Bets. To be developed.</h3>
        </div>
      </RightSideBar>
    </div>
  );
};
