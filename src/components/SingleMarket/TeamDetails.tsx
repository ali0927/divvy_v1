import { Row, Col } from 'antd'
export const TeamDetails = (props: { name: string, logo: string }) => {
  return (
    <div>
      <Row>
        <Col span={0} md={4}>
          <div className="team-logo">
            <img src={props.logo} alt="Team logo" />
          </div>
        </Col>
        <Col span={24} md={20}>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', marginLeft: '0.5vw' }}>
            <b style={{ fontSize: "1em" }}>{props.name}</b>
          </div>
        </Col>
      </Row>
    </div>
  );
};
