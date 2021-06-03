import { LeftSideBar } from "../components/LeftSideBar";
import { RightSideBar } from "../components/RightSideBar";
import { NavBar } from "../components/Nav/NavBar";
import { MyLiquidity } from "../components/MyLiquidity/MyLiquidity";
import { LiquidityGlobalStats } from "../components/Liquidity/LiquidityGlobalStats";
export const LiquidityView = () => {
  return (
    <div className="App ">
      <LeftSideBar>
        <NavBar />
      </LeftSideBar>
      <div className="App-header">
        <LiquidityGlobalStats />
      </div>
      <RightSideBar>
        <MyLiquidity />
      </RightSideBar>
    </div>
  );
};
