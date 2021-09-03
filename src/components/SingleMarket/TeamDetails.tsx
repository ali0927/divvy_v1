import { Row, Col } from 'antd'
export const TeamDetails = (props: { name: string, logo: string }) => {
  return (
    <div >
      <Row style={{display:'flex', alignItems:'center'}}>
        <Col span={0} md={8}>
          <div className="team-logo">
            <img src={props.logo} alt="Team logo" />
          </div>
        </Col>
        <Col span={24} md={16}>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <b style={{ fontSize: "1em", lineHeight: 'normal' }}>{props.name}</b>
          </div>
        </Col>
      </Row>
    </div>
  );
};
