import { Col, Row } from "antd";
import { useContext } from "react";
import { tokenAmountToString } from "../../constants";
import { HousePoolContext } from "../../contexts/sol/hpliquidity";
import { LiquidityAvailability } from "./LiquidityAvailability";
import { LiquidityAvailabilityBar } from "./LiquidityAvailabilityBar";
import { LiquidityDistribution } from "./LiquidityDistribution";
import { LiquidityPool } from "./LiquidityPool";
export const LiquidityGlobalStats = () => {
  const { htBalance } = useContext(HousePoolContext);
  return (
    <Row style={{ marginTop: 40, padding: 5 }}>
      <Col span={0} md={7}>
        <LiquidityAvailability />
      </Col>
      <Col style={{ textAlign: "center", overflow:'hidden' }} span={24} md={10}>
        <LiquidityAvailabilityBar />
        <LiquidityPool />
      </Col>
      <div className="horizontal-outline" />
      <Col span={12} md={0}>
        <LiquidityAvailability />
      </Col>
      <Col span={12} md={7}>
        <LiquidityDistribution />
      </Col>
    </Row>
  );
};
