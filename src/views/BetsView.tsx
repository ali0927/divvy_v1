import { RightSideBar } from "../components/RightSideBar";
import { LeftSideBar } from "../components/LeftSideBar";
import { NavBar } from "../components/Nav/NavBar";
import { HomeCarousel } from "../components/Home/HomeCarousel";
import { SingleMarketHeader } from "../components/SingleMarket/SingleMarketHeader";
import { SingleMarketMatches } from "../components/SingleMarket/SingleMarketMatches";
import { BetSlips } from "../components/Home/BetSlips";
export const BetsView = () => {
  interface SelectOdd {
    betType: String,
    teamId: String,
    teamSelection: String
  }

  return (
    <div className="App ">
      <LeftSideBar>
        <NavBar />
      </LeftSideBar>
      <header className="App-header">
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
