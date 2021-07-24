import { Col, Row } from "antd";
import { LiquidityData } from "./LiquidityData";
import { Select } from 'antd';

const { Option } = Select;

export const LiquidityGlance = () => {
    return (
        <>
            <Row>
                <Col span={36} md={24}>
                    <div className="liquidity-glance">
                        <div className="liquidity-align" style={{flexDirection: 'column'}}>
                            <span className="pool-header">At a glance</span>
                            <Select defaultValue="24 hours" onChange={() => console.log("")}>
                                <Option value="24 hours">24 hours</Option>
                                <Option value="1 week">1 week</Option>
                                <Option value="1 month">1 month</Option>
                            </Select>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24} md={8}>
                    <LiquidityData textContext={"Volume"} percentage={"+114.76%"} data={"9,739.73 USDT"} />
                </Col>
                <Col span={24} md={8}>
                    <LiquidityData textContext={"Volume"} percentage={"+114.76%"} data={"9,739.73 USDT"} />
                </Col>
                <Col span={24} md={8}>
                    <LiquidityData textContext={"Volume"} percentage={"-19.76%"} data={"49 Transactions"} />
                </Col>
            </Row>
        </>
    );
};