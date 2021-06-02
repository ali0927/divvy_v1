import { useUserBalance } from "../hooks/useUserBalance";
import { WRAPPED_SOL_MINT } from "../utils/ids";
import { LeftSideBar } from "../components/LeftSideBar";
import { RightSideBar } from "../components/RightSideBar";
import { NavBar } from "../components/Nav/NavBar";
import { MyLiquidity } from "../components/MyLiquidity/MyLiquidity";
import { LiquidityGlobalStats } from "../components/Liquidity/LiquidityGlobalStats";
export const LiquidityView = () => {
  const SOL = useUserBalance(WRAPPED_SOL_MINT);
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
