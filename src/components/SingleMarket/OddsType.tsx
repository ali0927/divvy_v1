import { Col, Row } from 'antd';
export const OddsType = () => {
    return (
        <Row>
            <Col span={5} md={4}>
            </Col>
            <Col className="odds-type" span={5} md={4}>
                <div style={{ textAlign: "center", marginLeft: "6%" }}>
                    Win
                </div>
            </Col>
            <Col className="odds-type" span={7} md={2}>
                <div style={{ textAlign: "center", marginLeft: "11%" }}>
                    Spread
                </div>
            </Col>
            <Col className="odds-type" span={6} md={4}>
                <div style={{ textAlign: "center", marginLeft: "8%" }}>
                    Total
                </div>
            </Col>
            <Col span={1} md={4}>
            </Col>
        </Row >
    );
};
