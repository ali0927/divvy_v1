import { useEffect, useState } from "react";
import * as IDS from "../utils/ids";
import { Bet, BetType, Game, LAMPORTS_PER_USDT } from "../constants";
import { RightSideBar } from "../components/RightSideBar";
import { LeftSideBar } from "../components/LeftSideBar";
import { NavBar } from "../components/Nav/NavBar";
import { HomeCarousel } from "../components/Home/HomeCarousel";
import { SingleMarketHeader } from "../components/SingleMarket/SingleMarketHeader";
import { SingleMarketMatches } from "../components/SingleMarket/SingleMarketMatches";
import { BetSlips } from "../components/Home/BetSlips";
import { SelectChain } from "../components/SelectChain";
import { MobileHeader } from "../components/Nav/Mobile/MobileHeader"
import { Layout, Row, Col } from "antd";
import { HeaderTypes } from "../constants/HeaderTypes";
import { getOdds } from "../api/odds";
import { useWallet } from "../contexts/sol/wallet";
import { useConnection, useConnectionConfig } from "../contexts/sol/connection";
import { useAccountByMint } from "../hooks/useAccountByMint";
import { settleBet } from "../models/sol/settleBet";
import { initBet } from "../models/sol/initBet";

export const BetsView = () => {
  const [betSlips, setBetSlips] = useState(Array<Bet>());
  const [games, setGames] = useState(Array<Game>());
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isBetSlipsVisible, setBetSlipsVisible] = useState(false);

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
    <Layout style={{ backgroundColor: "#0D0D0D" }}>
      <Row>
        <Col xs={24} sm={24} md={0}>
          <MobileHeader headerType={HeaderTypes.Bets} betSlips={betSlips} isBetSlipsVisible={isBetSlipsVisible} setBetSlipsVisible={setBetSlipsVisible} isMobileMenuVisible={isMobileMenuVisible} setMobileMenuVisible={setMobileMenuVisible} />
        </Col>
        <Col span={5} xs={isMobileMenuVisible ? 24 : 0} sm={isMobileMenuVisible ? 24 : 0} md={5}>
          <LeftSideBar>
            <NavBar />
          </LeftSideBar>
        </Col>
        {!isMobileMenuVisible && !isBetSlipsVisible &&
          <Col span={24} xs={24} sm={24} md={19}>
            <header className="root-content">
              <SelectChain />
              <HomeCarousel />
              <SingleMarketHeader />
              <SingleMarketMatches games={games} setbetSlips={setbetSlips} />
            </header>
          </Col>
        }
        <Col span={24} xs={isBetSlipsVisible ? 24 : 0} sm={isBetSlipsVisible ? 24 : 0} md={24}>
          <RightSideBar>
            <BetSlips editBetSlip={editBetSlip} betSlips={betSlips} setbetSlips={setbetSlips} removebetSlip={removebetSlip} placeBets={placeBets} />
          </RightSideBar>
        </Col>
      </Row>
    </Layout>
  );
};
