import { Col, Row } from "antd";
import { TransactionData } from "../Common/TransactionData";
import { Select } from 'antd';
import { DownOutlined } from "@ant-design/icons";
import { MS_IN_DAY, Pool } from "../../constants";
const { Option } = Select;

export const LiquidityGlance = (props: { setInterval : any, data : any }) => {
    const handleChange = (e : any) => {
        let interval = (e === "24 hours" ? MS_IN_DAY : e === "1 week" ? MS_IN_DAY*7 : MS_IN_DAY*30);         
        props.setInterval(interval);
    }
    const volumePercent = (props.data ? props?.data[props?.data?.length-1]?.volume - props?.data[props?.data?.length-2]?.volume : 0)/100;
    const liqPercent = (props.data ? props?.data[props?.data?.length-1]?.balance - props?.data[props?.data?.length-2]?.balance : 0)/100;
    return (
        <>
            <Row>
                <Col span={36} md={24}>
                    <div className="heading-align-container">
                        <div className="header-align" style={{flexDirection: 'column'}}>
                            <span className="pool-header">At a glance</span>
                            <Select defaultValue="24 hours" onSelect={handleChange} suffixIcon={<DownOutlined style={{marginTop: 0, color: "#fff"}} className="direction-icon" />}>
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
                    <TransactionData textContext={"Volume"} percentage={volumePercent} data={(props.data ? props?.data[props?.data?.length-1]?.volume : "")+" USDT"} />
                </Col>
                <Col span={24} md={8}>
                    <TransactionData textContext={"Total Liquidity"} percentage={liqPercent} data={(props.data ? props?.data[props?.data?.length-1]?.balance : "")+" USDT"} />
                </Col>
                <Col span={24} md={8}>
                    <TransactionData textContext={"Number of transactions"} percentage={19} data={"49 Transactions"} />
                </Col>
            </Row>
        </>
    );
};