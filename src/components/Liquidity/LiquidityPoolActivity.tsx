import { Col, Row } from "antd";
import { LiquidityActivityTable } from "./LiquidityActivityTable";
export const LiquidityPoolActivity = () => {
    return (
        <div style={{marginTop: 40, padding: 5}}>
            <Row>
                <Col span={36} md={24}>
                    <div className="liquidity-glance">
                        <div className="liquidity-align">
                            <h2>Pool Activity Stream</h2>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={72} md={24}>
                    <LiquidityActivityTable />
                </Col>
            </Row>
        </div>      
    );
};