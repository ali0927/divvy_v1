import { Col, Row } from 'antd';
export const OddsType = () => {
    return (
        <Row>
          <Col span={6} md={6}>
          </Col>
          <Col span={18} md={14}>
            <Row>
              <Col className="odds-type" span={8} md={8}>
                <div style={{ textAlign: "center" }}>
                    Win
                </div>
              </Col>
              <Col className="odds-type" span={8} md={8}>
                  <div style={{ textAlign: "center" }}>
                      Spread
                  </div>
              </Col>
              <Col className="odds-type" span={8} md={8}>
                  <div style={{ textAlign: "center" }}>
                      Total
                  </div>
              </Col>
            </Row>
          </Col>
          <Col span={0} md={4}>
          </Col>
        </Row>
    );
};
