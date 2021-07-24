import { Col, Row } from "antd";
import { TransactionData } from "../Common/TransactionData";
import { Select } from 'antd';
import { DownOutlined } from "@ant-design/icons";
const { Option } = Select;

export const LiquidityGlance = () => {
    return (
        <>
            <Row>
                <Col span={36} md={24}>
                    <div className="heading-align-container">
                        <div className="header-align" style={{flexDirection: 'column'}}>
                            <span className="pool-header">At a glance</span>
                            <Select defaultValue="24 hours" onChange={() => console.log("")} suffixIcon={<DownOutlined style={{marginTop: 0, color: "#fff"}} className="direction-icon" />}>
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
                    <TransactionData textContext={"Volume"} percentage={"+114.76%"} data={"9,739.73 USDT"} />
                </Col>
                <Col span={24} md={8}>
                    <TransactionData textContext={"Total Liquidity"} percentage={"+114.76%"} data={"9,739.73 USDT"} />
                </Col>
                <Col span={24} md={8}>
                    <TransactionData textContext={"Number of transactions"} percentage={"+19.76%"} data={"49 Transactions"} />
                </Col>
            </Row>
        </>
    );
};