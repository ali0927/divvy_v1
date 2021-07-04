import { Row, Col } from "antd";
import { WalletBalance } from "./WalletBalance";
import { MobileBetSlip } from "./BetSlip";
import { MobileMenu } from "./Menu";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderTypes } from "../../../constants/HeaderTypes";
import { HousePoolHeader } from "./HousePoolHeader";
export const MobileHeader = (props: { isMobileMenuVisible: boolean, setMobileMenuVisible: any, isBetSlipsVisible: boolean, setBetSlipsVisible: any, headerType: string }) => {
  return (
        <Row>
            <Col className="mobile-header" span={4}>
                <HeaderLogo />
            </Col>
            <Col className="mobile-header" span={10}>
                <WalletBalance />
            </Col>
            <Col className="mobile-header" span={5}>
                {props.headerType === HeaderTypes.Bets ?
                    <MobileBetSlip isBetSlipsVisible={props.isBetSlipsVisible} setBetSlipsVisible={props.setBetSlipsVisible} setMobileMenuVisible={props.setMobileMenuVisible} /> :
                    <HousePoolHeader isBetSlipsVisible={props.isBetSlipsVisible} setBetSlipsVisible={props.setBetSlipsVisible} setMobileMenuVisible={props.setMobileMenuVisible} />
                }
            </Col>
            <Col className="mobile-header" span={5}>
                <MobileMenu isMobileMenuVisible={props.isMobileMenuVisible} setMobileMenuVisible={props.setMobileMenuVisible} setBetSlipsVisible={props.setBetSlipsVisible} />
            </Col>
        </Row>
    );
};
