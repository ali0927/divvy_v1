import logo from "../divvy-logo-v1.png";
import { useUserBalance } from "../hooks/useUserBalance";
import { WRAPPED_SOL_MINT } from "../utils/ids";
import { LABELS } from "../constants";
import { Wallet } from "../components/Wallet/Wallet";
import { LeftSideBar } from "../components/LeftSideBar";
import { RightSideBar } from "../components/RightSideBar";
import { NavBar } from "../components/Nav/NavBar";
import { MyLiquidity } from "../components/MyLiquidity/MyLiquidity";
export const LiquidityView = () => {
  const SOL = useUserBalance(WRAPPED_SOL_MINT);
  return (
    <div className="App ">
      <LeftSideBar>
        <div>
          <NavBar />
        </div>
      </LeftSideBar>
      <header className="App-header">
        <Wallet />
        <img src={logo} alt="logo" />
        <p>Divvy.. now you're thinking with liquidity!</p>
        <p>
          {LABELS.SOL_BALANCE}: {SOL.balance}
        </p>
      </header>
      <RightSideBar>
        <MyLiquidity />
      </RightSideBar>
    </div>
  );
};
