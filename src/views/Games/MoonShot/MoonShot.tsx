import {Col, Row} from "antd";
import BetsTable from "../../../components/Games/MoonShot/BetsTable";
import PlaceBet from "../../../components/Games/MoonShot/PlaceBet";
import {MultiplierGraph} from "../../../components/Games/MoonShot/MultiplierGraph";
import { ChatRoom } from "./ChatRoom";
import { GameRoom } from "./GameRoom";
import { Tabs } from 'antd';

import { ConnectLink } from "../../../components/Nav/ConnectLink";
import { ReactComponent as Logo } from "../../../img/Divvy_UI_Logo_Beta.svg"
import { BETS_VIEW_PATH } from "../../../constants"
import { Link } from "react-router-dom";

const { TabPane } = Tabs;
export const MoonShot = () => {
  return (
    <Row style={{height: "100vh", backgroundColor:'var(--game-back-gray)', position:'relative'}}>
        <div style={{position:'absolute', top:0, left:0, zIndex:1}}>
          <Link to={BETS_VIEW_PATH}>
            <div className="sidebar-section" style={{display:"flex", alignContent:"center", padding:'0.5em 1em', outline:'none'}}>
              <Logo/>
            </div>
          </Link>
        </div>
        
        <div style={{position:'absolute', top:0, right:0, display:'flex', alignItems:'center', padding:'0.5em 1em', zIndex:1}}>
          <ConnectLink />
        </div>
        
        <Col md={24}>
          <Tabs defaultActiveKey="1" centered style={{height:"100vh"}}>
            <TabPane tab="Game" key="1" style={{height:"100%"}}>
              <Row style={{height:"100%"}}> 
                <Col md={7}>
                  <ChatRoom />
                </Col>
                <Col md={17}>
                  <Row style={{height:'100%', backgroundColor:'var(--off-black)', padding:'2em', borderRadius:'2em 0 0 0'}}>
                    <Col md={11}>
                      <GameRoom />
                    </Col>
                    <Col md={13}>

                    </Col>
                  </Row>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Leaderboard" disabled key="2">
            </TabPane>
            <TabPane tab="Help" disabled key="3">
            </TabPane>
          </Tabs>
        </Col>
    
        {/* <Col md={12} xs={24}>
            <div className={"flex-vertical-full"}>
                <div className={"center-child-flex"}>
                    <MultiplierGraph />
                </div>
                <div className={"center-child-flex"}>
                    <PlaceBet />
                </div>
            </div>
        </Col>
        <Col md={6} xs={24}>
            <BetsTable />
        </Col> */}
    </Row>
  )
}
