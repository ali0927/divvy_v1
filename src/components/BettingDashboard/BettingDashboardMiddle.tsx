import { useState } from "react";
import { Col, Row } from "antd";
import { CommonHeader } from "../Common/CommonHeader";
import { BettingSwitch } from "./BettingSwitch";
import { TransactionData } from "../Common/TransactionData";
export const BettingDashboardMiddle = () => {
    const [switchVal, setSwitchVal] = useState(1);
    return (
        <div>
            <Row style={{marginTop: 70}}>
                <Col span={36} md={14}>
                    <CommonHeader side={true} heading={"Dashboard"} />
                </Col>
                <Col span={36} md={10} className="balance-container">
                    <div className="horizontal-outline" style={{flex: 1}} />
                </Col>
            </Row>
            <Row>
                <Col span={36} md={10} className="balance-container">
                    <BettingSwitch siwtchVal={switchVal} setSwitchVal={setSwitchVal} />
                </Col>
                <Col span={36} md={10} offset={4} style={{textAlign: "right"}}>
                    <TransactionData textContext={"All time betting P&L"} percentage={114} data={"9,739.73 USDC"} />
                </Col>
            </Row>
        </div>
    )
}