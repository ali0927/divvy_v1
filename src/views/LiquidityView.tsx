import { useUserBalance } from "../hooks/useUserBalance";
import { WRAPPED_SOL_MINT } from "../utils/ids";
import { LeftSideBar } from "../components/LeftSideBar";
import { RightSideBar } from "../components/RightSideBar";
import { NavBar } from "../components/Nav/NavBar";
import Logo from '../divvy-logo-v1.png';
import { MyLiquidity } from "../components/MyLiquidity/MyLiquidity";
import { LiquidityGlobalStats } from "../components/Liquidity/LiquidityGlobalStats";
import { LiquidityDistribution } from "../components/Liquidity/LiquidityDistribution";
import { LiquidityAvailabilityBar } from "../components/Liquidity/LiquidityAvailabilityBar";
import { LiquidityAvailability } from "../components/Liquidity/LiquidityAvailability";
export const LiquidityView = () => {
  const SOL = useUserBalance(WRAPPED_SOL_MINT);
  return (
    <div className="App ">
      <LeftSideBar>
        <NavBar />
      </LeftSideBar>
      <div className="liquidity-header">
        <div className="left">
          <img src={Logo} />
        </div>
        <div className="right">
          <LiquidityGlobalStats />
          <LiquidityAvailabilityBar />
          <LiquidityAvailability />
          <LiquidityDistribution />
        </div>
      </div>
      <RightSideBar>
        <MyLiquidity />
      </RightSideBar>
    </div>
  );
};
