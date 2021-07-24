import { Col, Row } from "antd";
import { LiquidityActivityTable } from "./LiquidityActivityTable";
import { CommonHeader } from "../Common/CommonHeader";
export const LiquidityPoolActivity = () => {
    return (
        <div style={{marginTop: 40, padding: 5}}>
            <Row>
                <Col span={36} md={24}>
                    <CommonHeader side={false} heading={"Pool Activity Stream"} />
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