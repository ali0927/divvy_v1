import { useEffect, useState } from 'react';
import { Col, Row } from "antd";
import { TransactionData } from "../Common/TransactionData";
import { Select } from 'antd';
import { DownOutlined } from "@ant-design/icons";
import { MS_IN_DAY, Pool, Transactions } from "../../constants";
const { Option } = Select;

export const LiquidityGlance = (props: { setInterval : any, data : any, transactions: Array<Transactions> | undefined | null }) => {
    const getTransPercent = (time : number) => {
        let prevCnt = 0, todayCnt = 0;
        if(props.transactions) {
            let d = Date.now();
            d = d-time;
            let today = d;
            let transDate;
            props.transactions.map(item => {
                transDate = (new Date(item.time ? item.time : "")).getTime();
                // console.log(transDate, today, transDate > today)
                if(transDate > today) {
                    todayCnt++;
                } else  {
                    prevCnt++;
                }
            })
        }
        return { "percent": Math.round(((todayCnt/prevCnt)*100)*100)/100, "trans": todayCnt};
    }
    const [transData, setTransData] = useState({ 'percent': 0, 'trans': 0 });
    const volumePercent = (props.data && props.data.length ? props?.data[props?.data?.length-1]?.volume - (props.data.length > 1 ? props?.data[props?.data?.length-2]?.volume : 0) : 0)/100;
    const liqPercent = (props.data && props.data.length ? props?.data[props?.data?.length-1]?.balance - (props.data.length > 1 ? props?.data[props?.data?.length-2]?.balance : 0) : 0)/100;
    useEffect(() => {
        let data = getTransPercent(MS_IN_DAY);
        setTransData({"percent": data["percent"], "trans": data["trans"]});
    }, [])
    const handleChange = (e : any) => {
        let interval = (e === "24 hours" ? MS_IN_DAY : e === "1 week" ? MS_IN_DAY*7 : MS_IN_DAY*30);         
        props.setInterval(interval);
        let data = getTransPercent(interval)
        setTransData({"percent": data["percent"], "trans": data["trans"]});
    }
    return (
        <>
            <Row>
                <Col span={36} md={24}>
                    <div className="heading-align-container">
                        <div className="header-align" style={{flexDirection: 'column'}}>
                            <span className="pool-header">At a glance</span>
                            <Select defaultValue="24 hours" onSelect={handleChange} className="glance-select" suffixIcon={<DownOutlined style={{marginTop: 0, color: "#fff"}} className="direction-icon" />}>
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
                    <TransactionData textContext={"Volume"} percentage={volumePercent} data={(props.data && props.data.length ? props?.data[props?.data?.length-1]?.volume : "0")+" USDC"} />
                </Col>
                <Col span={24} md={8}>
                    <TransactionData textContext={"Total Liquidity"} percentage={liqPercent} data={(props.data && props.data.length ? props?.data[props?.data?.length-1]?.balance : "0")+" USDC"} />
                </Col>
                <Col span={24} md={8}>
                    <TransactionData textContext={"Number of txns"} percentage={transData.percent} data={(transData.trans)+" Transactions"} />
                </Col>
            </Row>
        </>
    );
};