import { useEffect, useState } from "react";
import { Game } from "../constants";
import { RightSideBar } from "../components/RightSideBar";
import { LeftSideBar } from "../components/LeftSideBar";
import { NavBar } from "../components/Nav/NavBar";
import { HomeCarousel } from "../components/Home/HomeCarousel";
import { SingleMarketHeader } from "../components/SingleMarket/SingleMarketHeader";
import { SingleMarketMatches } from "../components/SingleMarket/SingleMarketMatches";
import { BetSlips } from "../components/Home/BetSlips";
import { MobileHeader } from "../components/Nav/Mobile/MobileHeader"
import { Layout, Row, Col } from "antd";
import { HeaderTypes } from "../constants/HeaderTypes";
import { getOdds } from "../api/odds";

const BetsView = () => {
  const [games, setGames] = useState(Array<Game>());
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isBetSlipsVisible, setBetSlipsVisible] = useState(false);

  useEffect(() => {
    getOdds(games => {
      setGames(games);
    });
  }, [])

  return (
    <Layout style={{ backgroundColor: "#0D0D0D" }}>
      <Row>
        <Col xs={24} sm={24} md={0}>
          <MobileHeader headerType={HeaderTypes.Bets} isBetSlipsVisible={isBetSlipsVisible} setBetSlipsVisible={setBetSlipsVisible} isMobileMenuVisible={isMobileMenuVisible} setMobileMenuVisible={setMobileMenuVisible} />
        </Col>
        <Col span={5} xs={isMobileMenuVisible ? 24 : 0} sm={isMobileMenuVisible ? 24 : 0} md={5}>
          <LeftSideBar>
            <NavBar />
          </LeftSideBar>
        </Col>
        {!isMobileMenuVisible && !isBetSlipsVisible &&
          <Col span={24} xs={24} sm={24} md={19}>
            <header className="root-content">
              <HomeCarousel />
              <SingleMarketHeader />
              <SingleMarketMatches games={games} />
            </header>
          </Col>
        }
        <Col span={24} xs={isBetSlipsVisible ? 24 : 0} sm={isBetSlipsVisible ? 24 : 0} md={24}>
          <RightSideBar>
            <BetSlips/>
          </RightSideBar>
        </Col>
      </Row>
    </Layout>
  );
};
export default BetsView