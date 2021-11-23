import React, { useState, Suspense } from 'react';
import { Col, Row } from "antd";
import { CommonHeader } from "../Common/CommonHeader";
import { Pool } from '../../constants';
import { useGetPoolQuery } from "../../store/getPool";
import { MS_IN_DAY, BETS_VIEW_PATH } from "../../constants";

const LiquidityPoolGraph = React.lazy(()=>import('../Liquidity/LiquidityPoolGraph'))
const currTime = (new Date()).getTime(); 

export const LiquidityProviderGraph = () => {
  const [poolPerformance, setPoolPerformance] = useState(1);
  const [interval, setInterval] = useState(MS_IN_DAY);
  const { data } = useGetPoolQuery((currTime-interval).toString());

  return(
    <div style={{marginTop: 40}}>
      <Row>
        <Col span={24} md={10}>
          <CommonHeader side={true} heading={"My house balance"} />
        </Col>
        <Col span={24} md={14}>
          <div className="heading-align-container">
            <div className="header-align">
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24} md={24}>
          <Suspense fallback={<div>loading ..</div>}>
            <LiquidityPoolGraph data={data} poolPerformance={poolPerformance} />
          </Suspense>                    
        </Col>
      </Row>
    </div>
  )
}