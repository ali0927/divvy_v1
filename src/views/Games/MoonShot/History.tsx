import React from "react";
import {Col, Row} from "antd";
import { Tabs, Input, Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;

const TestPlayers = new Array(50).fill({
  name: 'creators_main',
  value: '2.64',
  bet: '2,000',
  profit: '450.00'
})
const TestHistory = new Array(30).fill({
  bust: (Math.random() * 10).toFixed(2),
  value: 2.64,
  bet: '2,000',
  profit: '-',
  hash: 'f84dce90b539befrg...'
})

export const History = () => {
  return (
    <div style={{display:'flex', flexDirection:'column'}}>
      <Row gutter={20} style={{height:'100%'}}>
        <Col span={8}>
          <div className="game-moonshot__history__option">
            <label style={{margin:'1em', fontSize:'1.2em'}}>Bankroll</label>
            <img src="../moonshot_bankroll_back.svg" style={{height:'100%'}} alt="bankroll" />
          </div>
        </Col>
        <Col span={8}>
          <div className="game-moonshot__history__option">
            <label style={{margin:'1em', fontSize:'1.2em'}}>Cashier</label>
            <img src="../moonshot_bankroll_back.svg" style={{height:'100%'}} alt="bankroll" />
          </div>
        </Col>
        <Col span={8}>
          <div className="game-moonshot__history__option">
            <label style={{margin:'1em', fontSize:'1.2em'}}>Stats</label>
            <img src="../moonshot_bankroll_back.svg" style={{height:'100%'}} alt="bankroll" />
          </div>
        </Col>
      </Row>
      <div style={{borderRadius:'1em', marginTop:'1em', height:'770px', overflow:'scroll', backgroundColor:'var(--game-back-gray)'}}>
        <Tabs defaultActiveKey="1" className="game-moonshot__room__tabs" style={{maxHeight:'100%'}}>
          <TabPane tab="Player" key="1" style={{overflow:'scroll'}}>
            <Row style={{padding:'0.5em 1.5em', borderBottom:'1px solid #303030'}}>
              <Col span={8}>User</Col>
              <Col span={5}>@</Col>
              <Col span={5}>Bet</Col>
              <Col span={6}>Profit</Col>
            </Row>
            {
              TestPlayers.map(player => 
                <Row style={{padding:'0.5em 1.5em'}}>
                  <Col span={8} style={{color:'var(--game-blue)'}}>{player.name}</Col>
                  <Col span={5}>{player.value}&times;</Col>
                  <Col span={5}>{player.bet}</Col>
                  <Col span={6} style={{color:'green'}}>{player.profit}<ArrowUpOutlined /></Col>
                </Row>                  
              )
            }
            
          </TabPane>
          <TabPane tab="History" key="2" style={{overflow:'scroll'}}>
            <Row style={{padding:'0.5em 1.5em', borderBottom:'1px solid #303030'}}>
              <Col span={5}>Bust</Col>
              <Col span={4}>@</Col>
              <Col span={4}>Bet</Col>
              <Col span={4}>Profit</Col>
              <Col span={7}>Hash</Col>
            </Row>
            {
              TestHistory.map(history => 
                <Row style={{padding:'0.5em 1.5em'}}>
                  { Math.random() > 0.5 ?
                    <Col span={5} style={{color:'red'}}>{(Math.random() * 10).toFixed(2)}&times;</Col>:
                    <Col span={5} style={{color:'green'}}>{(Math.random() * 10).toFixed(2)}&times;</Col>
                  }
                  <Col span={4}>{history.value}</Col>
                  <Col span={4}>{history.bet}</Col>
                  <Col span={4}>{history.profit}</Col>
                  <Col span={7}>{history.hash}</Col>
                </Row>                  
              )
            }

          </TabPane>       
        </Tabs>
      </div>

    </div>
  )
}