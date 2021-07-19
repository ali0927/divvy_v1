import { Col, Input, Layout, Row, Button } from "antd";
import { useContext, useEffect, useState } from "react";
import { LeftSideBar } from "../components/LeftSideBar";
import { MobileHeader } from "../components/Nav/Mobile/MobileHeader";
import { NavBar } from "../components/Nav/NavBar";
import { RightSideBar } from "../components/RightSideBar";
import { HeaderTypes } from "../constants/HeaderTypes";
import { useWallet } from "../contexts/sol/wallet";

export const FaucetView = () => {
    const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
    const [isBetSlipsVisible, setBetSlipsVisible] = useState(false);
    const wallet = useWallet();
    const { connected } = useWallet();

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
                            <Input disabled={true} value={connected ? wallet.publicKey?.toString(): "Please connect your wallet"} style={{ width: "40%" }} />
                            <br  />
                            <br  />
                            <Button>
                                Get 10 USDT
                            </Button>
                        </header>
                    </Col>
                }
                <Col span={24} xs={isBetSlipsVisible ? 24 : 0} sm={isBetSlipsVisible ? 24 : 0} md={24}>
                    <RightSideBar>
                        {/* <BetSlips /> */}
                    </RightSideBar>
                </Col>
            </Row>
        </Layout>
    )
}