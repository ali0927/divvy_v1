import React, { useEffect, useState } from "react";
import logo from "../divvy-logo-v1.png";
import { useUserBalance } from "../hooks/useUserBalance";
import { WRAPPED_SOL_MINT } from "../utils/ids";
import { BetType, Game, LABELS } from "../constants";
import { RightSideBar } from "../components/RightSideBar";
import { LeftSideBar } from "../components/LeftSideBar";
import { NavBar } from "../components/Nav/NavBar";
import { HomeCarousel } from "../components/Home/HomeCarousel";
import { SingleMarketHeader } from "../components/SingleMarket/SingleMarketHeader";
import { SingleMarketMatches } from "../components/SingleMarket/SingleMarketMatches";
import { BetSlips } from "../components/Home/BetSlips";
import { BetSlip } from "../constants"
export const HomeView = () => {
  const SOL = useUserBalance(WRAPPED_SOL_MINT);
  const GAMES = [
    {
      teamA: {
        "name": "Turkey",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg",
        "id": "turkey",
        favorite: false
      },
      teamB: {
        "name": "Italy",
        "logo": "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg",
        "id": "italy",
        favorite: true
      },
      draw: true,
      teamAodds: {
        moneyline: 1.13,
        spread: 1.75,
        total: 1.56,
      },
      teamBodds: {
        moneyline: 1.78,
        spread: 1.75,
        total: 1.56,
        favorite: true
      },
      drawodds: {
        moneyline: 1,
        spread: 2.8,
        total: 3,
        favorite: false
      },
      spread: 1,
      total: 2
    }]
  const [betSlips, setBetSlips] = useState(Array<BetSlip>());
  const [games, setGames] = useState(Array<Game>());
  useEffect(() => {
    setGames(GAMES);
  }, [])
  const setbetSlips = (betSlip: BetSlip) => {
    setBetSlips([...betSlips, betSlip])
  }
  const removebetSlip = (index: number) => {
    var bets = betSlips;
    bets.splice(index, 1);
    setBetSlips(bets)
  }
  const editBetSlip = (betId: string, amount: number) => {
    var bet: BetSlip;
    var bets: Array<BetSlip> = [];
    betSlips.map((value: BetSlip) => {
      if (value.id == betId) {
        bet = value
        bet.betAmount = amount;
        bets.push(bet)
      }
      else {
        bets.push(value)
      }
    })
    setBetSlips(bets)
  }
  const placeBets = () => {
    var bet: BetSlip;
    var bets: Array<BetSlip> = [];
    betSlips.map((value: BetSlip) => {
      if (value.type == BetType.Current) {
        bet = value
        bet.type = BetType.Pending
        bets.push(bet)
      }
      else {
        bets.push(value)
      }
    })
    setBetSlips(bets)
  }

  return (
    <div className="App " >
      <LeftSideBar>
        <NavBar />
      </LeftSideBar>
      <header className="App-header">
        <HomeCarousel />
        <SingleMarketHeader />
        <SingleMarketMatches games={games} setbetSlips={setbetSlips} />
      </header>
      <RightSideBar>
        <BetSlips editBetSlip={editBetSlip} betSlips={betSlips} setbetSlips={setbetSlips} removebetSlip={removebetSlip} placeBets={placeBets} />
      </RightSideBar>
    </div >
  );
};
