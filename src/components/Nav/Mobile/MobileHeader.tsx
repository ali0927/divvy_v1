import { useEffect, useState } from "react";
import { Layout, Row, Col } from "antd";
import { WalletBalance } from "./WalletBalance";
import { MobileBetSlip } from "./BetSlip";
import { MobileMenu } from "./Menu";
import { HeaderLogo } from "./HeaderLogo";
import { Bet } from "../../../constants";
import { HeaderTypes } from "../../../constants/HeaderTypes";
import { HousePoolHeader } from "./HousePoolHeader";
const { Header, Content, Footer, Sider } = Layout;
export const MobileHeader = (props: { isMobileMenuVisible: boolean, setMobileMenuVisible: any, isBetSlipsVisible: boolean, setBetSlipsVisible: any, betSlips: Array<Bet>, headerType: string }) => {
    return (
        <Row>
            <Col className="mobile-header" span={4}>
                <HeaderLogo />
            </Col>
            <Col className="mobile-header" span={10}>
                <WalletBalance />
            </Col>
            <Col className="mobile-header" span={5}>
                {props.headerType == HeaderTypes.Bets ?
                    <MobileBetSlip betSlips={props.betSlips} isBetSlipsVisible={props.isBetSlipsVisible} setBetSlipsVisible={props.setBetSlipsVisible} /> :
                    <HousePoolHeader isBetSlipsVisible={props.isBetSlipsVisible} setBetSlipsVisible={props.setBetSlipsVisible} />
                }
            </Col>
            <Col className="mobile-header" span={5}>
                <MobileMenu isMobileMenuVisible={props.isMobileMenuVisible} setMobileMenuVisible={props.setMobileMenuVisible} />
            </Col>
        </Row>
    );
};
