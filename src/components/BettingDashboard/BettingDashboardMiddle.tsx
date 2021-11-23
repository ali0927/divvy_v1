import { useState } from "react";
import { Col, Row } from "antd";
import { CommonHeader } from "../Common/CommonHeader";
import { BettingSwitch } from "./BettingSwitch";
import { TransactionData } from "../Common/TransactionData";
export const BettingDashboardMiddle = (props: { switchVal: number, setSwitchVal: any }) => {
    return (
        <div style={{marginTop: 50}}>
            <Row>
                <Col span={36} md={10} className="balance-container">
                    <BettingSwitch switchVal={props.switchVal} setSwitchVal={props.setSwitchVal} />
                </Col>
                <Col span={36} md={16} className="balance-container">
                </Col>                
            </Row>
        </div>
    )
}