import { useEffect, useState } from "react";
import { BetType, Game } from "../constants";
import { RightSideBar } from "../components/RightSideBar";
import { LeftSideBar } from "../components/LeftSideBar";
import { NavBar } from "../components/Nav/NavBar";
import { HomeCarousel } from "../components/Home/HomeCarousel";
import { SingleMarketHeader } from "../components/SingleMarket/SingleMarketHeader";
import { SingleMarketMatches } from "../components/SingleMarket/SingleMarketMatches";
import { BetSlips } from "../components/Home/BetSlips";
import { BetSlip } from "../constants"
import { codes } from "../constants/processed"
import axios from "axios";
import { SelectChain } from "../components/SelectChain";
import { MobileHeader } from "../components/Nav/Mobile/MobileHeader"
import { Layout, Row, Col } from "antd";
import { HeaderTypes } from "../constants/HeaderTypes";
const { Header, Content, Footer, Sider } = Layout;
export const BetsView = () => {
  const [betSlips, setBetSlips] = useState(Array<BetSlip>());
  const [games, setGames] = useState(Array<Game>());
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isBetSlipsVisible, setBetSlipsVisible] = useState(false);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const getDate = (timestamp: number) => {
    var d = new Date(timestamp * 1000);
    return (d.getDate() + ' ' + (months[d.getMonth()]) + ', ' + d.getFullYear());
  }
  const getTime = (timestamp: number) => {
    var d = new Date(timestamp * 1000);
    return ((d.getHours() < 10 ? "0" : "") + d.getHours() + ':' + d.getMinutes());
  }

  const countryCodeToFlagCode = (countryCode: string) => {
    let code = codes[countryCode].code.toLowerCase();

    if (code === "wl") { // This is a hack for wales smh
      return "gb-wls";
    }
    return code;
  }

  useEffect(() => {
    var game: any = {};
    axios.get("https://api.the-odds-api.com/v3/odds/?apiKey=1c1cef445a730e7dd8d5f98395977688&sport=soccer_uefa_european_championship&region=us").then((data) => {
      data.data.data.forEach((item: any) => {
        if (item.sites.length) {
          console.log(item)
          const id: string = item.id
          game[id] = ({
            teamA: {
              name: item.teams[0],
              logo: "flag-icon-" + countryCodeToFlagCode(item.teams[0]),
              id: item.teams[0].toLowerCase(),
              favorite: item.teams[0] === item.home_team
            },
            teamB: {
              name: item.teams[1],
              logo: "flag-icon-" + countryCodeToFlagCode(item.teams[1]),
              id: item.teams[1].toLowerCase(),
              favorite: item.teams[1] === item.home_team
            },
            draw: true,
            teamAodds: {
              moneyline: parseFloat(item.sites[0].odds.h2h[0]),
              spread: parseFloat((Math.random() + 1).toFixed(2)),
              total: parseFloat((Math.random() + 1).toFixed(2)),
            },
            teamBodds: {
              moneyline: parseFloat(item.sites[0].odds.h2h[1]),
              spread: parseFloat((Math.random() + 1).toFixed(2)),
              total: parseFloat((Math.random() + 1).toFixed(2)),
            },
            drawodds: {
              moneyline: 1,
              spread: 2.8,
              total: 3,
            },
            spread: 1,
            total: 2,
            id: item.id,
            date: getDate(parseInt(item.commence_time)),
            time: getTime(parseInt(item.commence_time))
          })
        }
      })
      axios.get("https://api.the-odds-api.com/v3/odds/?apiKey=1c1cef445a730e7dd8d5f98395977688&sport=soccer_uefa_european_championship&region=us&market=spreads").then((data) => {
        data.data.data.map((item: any) => {
          if (item.sites.length) {
            game[item.id].teamAodds.spread = item.sites[0].odds.spreads.odds[0]
            game[item.id].teamBodds.spread = item.sites[0].odds.spreads.odds[1]
            game[item.id].spread = Math.abs(item.sites[0].odds.spreads.points[1])
          }
        })
        axios.get("https://api.the-odds-api.com/v3/odds/?apiKey=1c1cef445a730e7dd8d5f98395977688&sport=soccer_uefa_european_championship&region=us&market=totals").then((data) => {
          data.data.data.map((item: any) => {
            if (item.sites.length) {
              game[item.id].teamAodds.total = item.sites[0].odds.totals.odds[0]
              game[item.id].teamBodds.total = item.sites[0].odds.totals.odds[1]
              game[item.id].total = Math.abs(item.sites[0].odds.totals.points[1])
            }
          })
          setGames(Object.values(game))
        }).catch((error) => {
          console.log(error)
        })
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    })
  }, [])
  const setbetSlips = (betSlip: BetSlip) => {
    setBetSlips([...betSlips, betSlip])
  }
  const removebetSlip = (betId: string) => {
    var bets: Array<BetSlip> = [];
    betSlips.map((value: BetSlip) => {
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
    <Layout>
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
          <Col span={14} xs={24} sm={24} md={14}>
            <header className="root-content">
              <SelectChain />
              <HomeCarousel />
              <SingleMarketHeader />
              <SingleMarketMatches games={games} setbetSlips={setbetSlips} />
            </header>
          </Col>
        }
        <Col span={5} xs={isBetSlipsVisible ? 24 : 0} sm={isBetSlipsVisible ? 24 : 0} md={5}>
          <RightSideBar>
            <BetSlips editBetSlip={editBetSlip} betSlips={betSlips} setbetSlips={setbetSlips} removebetSlip={removebetSlip} placeBets={placeBets} />
          </RightSideBar>
        </Col>
      </Row>
    </Layout>
  );
};
