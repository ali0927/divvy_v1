import logo from "../divvy-logo-v1.png";
import { useUserBalance } from "../hooks/useUserBalance";
import { WRAPPED_SOL_MINT } from "../utils/ids";
import { LABELS } from "../constants";
import { RightSideBar } from "../components/RightSideBar";
import { LeftSideBar } from "../components/LeftSideBar";
import { NavBar } from "../components/Nav/NavBar";
import { HomeCarousel } from "../components/Home/HomeCarousel";
import { SingleMarketHeader } from "../components/SingleMarket/SingleMarketHeader";
import { SingleMarketMatches } from "../components/SingleMarket/SingleMarketMatches";
import { BetSlips } from "../components/Home/BetSlips";
export const HomeView = () => {
  const SOL = useUserBalance(WRAPPED_SOL_MINT);
  interface SelectOdd {
    betType: String,
    teamId: String,
    teamSelection: String
  }
  // const selectOdds: React.FC<String> = (data: String) => {
  //   // console.log(betType, teamId, teamSelection)
  //   <div>
  //   </div>
  //   // return "hello";
  // }
  return (
    <div className="App ">
      <LeftSideBar>
        <NavBar />
      </LeftSideBar>
      <header className="App-header">
        {/* <img src={logo} alt="logo" />
        <p>Divvy.. now you see me, now you don't!</p>
        <p>
          {LABELS.SOL_BALANCE}: {SOL.balance}
        </p> */}
        {/* <HomeCarousel /> */}
        <HomeCarousel />
        <SingleMarketHeader />
        <SingleMarketMatches />
      </header>
      <RightSideBar>
        <BetSlips />
      </RightSideBar>
    </div>
  );
};
