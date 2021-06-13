import { useEffect, useState } from "react";
import * as IDS from "../utils/ids";
import { BetType, Game } from "../constants";
import { RightSideBar } from "../components/RightSideBar";
import { LeftSideBar } from "../components/LeftSideBar";
import { NavBar } from "../components/Nav/NavBar";
import { HomeCarousel } from "../components/Home/HomeCarousel";
import { SingleMarketHeader } from "../components/SingleMarket/SingleMarketHeader";
import { SingleMarketMatches } from "../components/SingleMarket/SingleMarketMatches";
import { BetSidebar } from "../components/Home/BetSidebar";
import { Bet } from "../constants"
import { useWallet } from "../contexts/wallet";
import { useConnection, useConnectionConfig } from "../contexts/connection";
import { useAccountByMint } from "../hooks";
import { LAMPORTS_PER_USDT } from "../constants/math";
import { getOdds } from "../api/odds";
import { initBet } from "../models/sol/initBet";
import { settleBet }  from "../models/sol/settleBet";

export const BetsView = () => {
  const [betSlips, setBetSlips] = useState(Array<Bet>());
  const [games, setGames] = useState(Array<Game>());

  useEffect(() => {
    getOdds(games => {
      setGames(games);
    });
  }, [])
  const setbetSlips = (betSlip: Bet) => {
    setBetSlips([...betSlips, betSlip])
  }
  const removebetSlip = (betId: string) => {
    var bets: Array<Bet> = [];
    betSlips.map((value: Bet) => {
      if (value.id === betId) {
        //do nothing
      }
      else {
        bets.push(value)
      }
    })
    setBetSlips(bets)
  }
  const editBetSlip = (betId: string, amount: number) => {
    var bet: Bet;
    var bets: Array<Bet> = [];
    betSlips.forEach((value: Bet) => {
      if (value.id === betId) {
        bet = value
        bet.risk = amount;
        bets.push(bet)
      }
      else {
        bets.push(value)
      }
    })
    setBetSlips(bets)
  }

  const wallet = useWallet();
  const connection = useConnection();
  const connectionConfig = useConnectionConfig();
  const usdtTokenAccount = useAccountByMint(IDS.USDT_MINT);

  const placeBets = async () => {
    var bets: Array<Bet> = [];
    betSlips.forEach(async bet => {
      if (bet.type === BetType.Current) {
        const betTokenAccount = await initBet(
          connection,
          connectionConfig.env,
          wallet.wallet,
          usdtTokenAccount?.pubkey,
          bet.risk * LAMPORTS_PER_USDT,
          bet.odds);
        if(betTokenAccount) { 
          bet.betTokenAccount = betTokenAccount;
          bet.type = BetType.Pending
        }
      }
      bets.push(bet)
      setBetSlips(bets)
    })
  }

  const settleBets = async (outcome: "win" | "lose") => {
    var bets: Array<Bet> = [...betSlips];
    //for (const bet of betSlips){
    betSlips.forEach(async bet => {
      if (bet.type === BetType.Pending) {
        const ok = await settleBet(
          connection,
          connectionConfig.env,
          wallet.wallet,
          bet.betTokenAccount,
          usdtTokenAccount?.pubkey,
          outcome);
        if(ok) {
          const index = bets.indexOf(bet);
          if (index > -1) {
            bets.splice(index, 1);
            setBetSlips(bets)
          }
        }
      }
    })
    //setBetSlips(bets)
  }


  return (
    <div className="root" >
      <LeftSideBar>
        <NavBar />
      </LeftSideBar>
      <header className="root-content">
        <HomeCarousel />
        <SingleMarketHeader />
        <SingleMarketMatches games={games} setbetSlips={setbetSlips} />
      </header>
      <div style={{ position: "fixed", right: 0, background: "black" }}>
        <RightSideBar>
          <BetSidebar editBetSlip={editBetSlip} bets={betSlips} setbetSlips={setbetSlips} removebetSlip={removebetSlip} placeBets={placeBets} settleBets={settleBets} />
        </RightSideBar>
      </div>
    </div>
  );
};
