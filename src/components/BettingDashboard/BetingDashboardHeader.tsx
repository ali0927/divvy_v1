import { Col, Row } from "antd";
import { CommonHeader } from "../Common/CommonHeader";
import { Button } from 'antd';
export const BettingDashboardHeader = () => {
    return (
        <div>
            <Row>
                <Col span={36} md={24}>
                    <CommonHeader side={true} heading={"My Profile"} />
                    <div className="horizontal-outline" />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <div className="liquidity-content">
                        <span className="text-primary">Wallet Balance:</span>
                        <h3 className="text-heavy">340,860.37 USDT</h3>
                    </div>
                </Col>
                <Col md={14}>
                    <div className="liquidity-content">
                        <span className="text-primary">Wallet ID (Metamask):</span>
                        <h3 className="text-heavy">0x000aabbee60667e9ba7935b841131a6945572c7b</h3>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="liquidity-content">
                        <Button type="primary" style={{marginTop: 10}}>Disconnect Wallet</Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};