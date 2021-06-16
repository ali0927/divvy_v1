import { LeftSideBar } from "../components/LeftSideBar";
import { RightSideBar } from "../components/RightSideBar";
import { NavBar } from "../components/Nav/NavBar";
// import Logo from '../img/divvy.mp4';
import { MyLiquidity } from "../components/MyLiquidity/MyLiquidity";
import { LiquidityGlobalStats } from "../components/Liquidity/LiquidityGlobalStats";
import { Button, Col, Layout, Row } from "antd";
import { Link } from "react-router-dom";
import { MobileHeader } from "../components/Nav/Mobile/MobileHeader";
import { Bet } from "../constants";
import { useState } from "react";
import { HeaderTypes } from "../constants/HeaderTypes"
export const LiquidityView = () => {
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isBetSlipsVisible, setBetSlipsVisible] = useState(false);
  return (
    <Layout style={{ backgroundColor: "#0D0D0D" }}>
      <Row>
        <Col xs={24} sm={24} md={0}>
          <MobileHeader headerType={HeaderTypes.Liquidity} betSlips={Array<Bet>()} isBetSlipsVisible={isBetSlipsVisible} setBetSlipsVisible={setBetSlipsVisible} isMobileMenuVisible={isMobileMenuVisible} setMobileMenuVisible={setMobileMenuVisible} />
        </Col>
        <Col span={5} xs={isMobileMenuVisible ? 24 : 0} sm={isMobileMenuVisible ? 24 : 0} md={5}>
          <LeftSideBar>
            <NavBar />
          </LeftSideBar>
        </Col>
        {!isMobileMenuVisible && !isBetSlipsVisible &&
          <Col span={14} xs={24} sm={24} md={14}>
            <header className="root-content" style={{ maxHeight: "100vh" }}>
              <LiquidityGlobalStats />
            </header>
          </Col>
        }
        <Col span={5} xs={isBetSlipsVisible ? 24 : 0} sm={isBetSlipsVisible ? 24 : 0} md={5}>
          <RightSideBar>
            <MyLiquidity />

          </RightSideBar>
        </Col>
      </Row>
    </Layout>
  );
};
