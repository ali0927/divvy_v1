import { Col, Row } from "antd";
import { TransactionData } from "../Common/TransactionData";
import { Select } from 'antd';
import { DownOutlined } from "@ant-design/icons";
import { MS_IN_DAY, Pool, Transactions } from "../../constants";
const { Option } = Select;

export const LiquidityGlance = (props: { setInterval : any, data : any, transactions: Array<Transactions> | undefined | null }) => {
    const handleChange = (e : any) => {
        let interval = (e === "24 hours" ? MS_IN_DAY : e === "1 week" ? MS_IN_DAY*7 : MS_IN_DAY*30);         
        props.setInterval(interval);
    }
    const getTransPercent = () => {
        let prevCnt = 0, todayCnt = 0;
        if(props.transactions) {
            let today = (new Date()).toString();
            let todArr = today.split(" ");
            props.transactions.map(item => {
                let tranArr = item.time?.split(" ");
                if(tranArr && tranArr[1] === todArr[2] && tranArr[2] == todArr[1] && tranArr[3] == todArr[3]) {
                    todayCnt++;
                } else  {
                    prevCnt++;
                }
            })
        }
        return Math.round(((todayCnt/prevCnt)*100)*100)/100;
    }
    const volumePercent = (props.data ? props?.data[props?.data?.length-1]?.volume - props?.data[props?.data?.length-2]?.volume : 0)/100;
    const liqPercent = (props.data ? props?.data[props?.data?.length-1]?.balance - props?.data[props?.data?.length-2]?.balance : 0)/100;
    const transPercent = getTransPercent();
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
                    <TransactionData textContext={"Number of transactions"} percentage={transPercent} data={(props.transactions ? props.transactions.length.toString() : "0")+" Transactions"} />
                </Col>
            </Row>
        </>
    );
};