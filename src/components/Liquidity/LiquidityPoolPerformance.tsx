import { useState } from 'react';
import { Col, Row } from "antd";
import { LiquidityPoolTabs } from './LiquidityPoolTabs';
import { LiquidityPoolGraph } from './LiquidityPoolGraph';
import { CommonHeader } from "../Common/CommonHeader";
export const LiquidityPoolPerformance = () => {
    const [poolPerformance, setPoolPerformance] = useState(1);
    return(
        <div style={{marginTop: 40, padding: 5}}>
            <Row>
                <Col span={36} md={10}>
                    <CommonHeader side={false} heading={"Pool Performance"} />
                </Col>
                <Col span={36} md={14}>
                    <div className="heading-align-container">
                        <div className="header-align">
                            <LiquidityPoolTabs poolPerformance={poolPerformance} setPoolPerformance={setPoolPerformance} />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={72} md={24}>
                    <LiquidityPoolGraph />
                </Col>
            </Row>
        </div>
    )
}