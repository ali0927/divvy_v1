import { Row, Col } from 'antd'
export const TeamDetails = (props: { name: string, logo: string }) => {
    return (
      <div style={{ alignItems: "center", paddingTop: 18 }}>
        <Row>
          <Col span={0} md={12}>
              <img className={"team-logo"} src={props.logo} alt="Team logo" />
          </Col>
          <Col span={24} md={12}>
              <div style={{ fontSize: "1em", hyphens: "auto" }}>{props.name}</div>
          </Col>
        </Row>
      </div>
    );
};
