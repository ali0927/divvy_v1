import { useState } from 'react';
import { Col, Row } from "antd";
import { LiquidityPoolTabs } from './LiquidityPoolTabs';
import { LiquidityPoolGraph } from './LiquidityPoolGraph';
export const LiquidityPoolPerformance = () => {
    const [poolPerformance, setPoolPerformance] = useState(1);
    return(
        <div style={{marginTop: 40, padding: 5}}>
            <Row>
                <Col span={36} md={10}>
                    <div className="liquidity-glance">
                        <div className="liquidity-align">
                            <h2>Pool Performance</h2>
                        </div>
                    </div>
                </Col>
                <Col span={36} md={14}>
                    <div className="liquidity-glance">
                        <div className="liquidity-align">
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