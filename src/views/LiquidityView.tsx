import { LeftSideBar } from "../components/LeftSideBar";
import { RightSideBar } from "../components/RightSideBar";
import { NavBar } from "../components/Nav/NavBar";
// import Logo from '../img/divvy.mp4';
import { MyLiquidity } from "../components/MyLiquidity/MyLiquidity";
import { LiquidityGlobalStats } from "../components/Liquidity/LiquidityGlobalStats";
import { LiquidityDistribution } from "../components/Liquidity/LiquidityDistribution";
import { LiquidityAvailabilityBar } from "../components/Liquidity/LiquidityAvailabilityBar";
import { LiquidityAvailability } from "../components/Liquidity/LiquidityAvailability";
export const LiquidityView = () => {
  return (
    <div className="App ">
      <LeftSideBar>
        <NavBar />
      </LeftSideBar>
      <div className="liquidity-header">
        <div className="left">
          <video autoPlay={true} loop={true} width={200} height={200} src={"https://siasky.net/AABLoM1oiF4w42__V4_9CO1M1AhNGydb5oaYL0vgiRpFjQ"} />
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
