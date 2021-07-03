import { Col, Row } from "antd";
import { useContext } from "react";
import { tokenAmountToString } from "../../constants";
import { HousePoolContext } from "../../contexts/sol/hpliquidity";
import { LiquidityAvailability } from "./LiquidityAvailability";
import { LiquidityAvailabilityBar } from "./LiquidityAvailabilityBar";
import { LiquidityDistribution } from "./LiquidityDistribution";
export const LiquidityGlobalStats = () => {
  const { htBalance } = useContext(HousePoolContext);
  return (
    <Row style={{ marginTop: 5, padding: 5 }}>
      <Col style={{ textAlign: "center" }} span={23} md={9} offset={1}>
        <video autoPlay={true} loop={true} width={200} height={200} src={"https://siasky.net/AABLoM1oiF4w42__V4_9CO1M1AhNGydb5oaYL0vgiRpFjQ"} />
      </Col>
      <div className="horizontal-outline" />
      <Col span={24} md={14} style={{ marginTop: 4, }}>
        <h1 style={{ fontSize: "1.5em" }}>{tokenAmountToString(htBalance)} USDT</h1>
        <div style={{ fontSize: "1em", marginTop: 5 }} className="text-secondary liquidity-total">Total in the Liquidity Pool</div>
        <LiquidityAvailabilityBar />
        <LiquidityAvailability />
        <LiquidityDistribution />
      </Col>
    </Row>
  );
};
