import { useContext, useState } from "react"
import { Col, Row } from 'antd'
import { TeamDetails } from "./TeamDetails"
import { OddsType } from './OddsType';
import { OddsSelection } from './OddsSelection';
import { Market, MarketSide } from '../../constants';
import { getDate, getShortTimezone, getTime } from '../../utils/date';
import { codes } from "../../constants/processed"
import { SportContext } from "../../contexts/sport";

export const SingleMatchComponent = (props: { market: Market }) => {
    const { sport, changeSport } = useContext(SportContext)
    const countryCodeToFlagCode = (countryCode: string) => {
        let code = codes[countryCode]?.code?.toLowerCase();

        if (code === "wl") { // This is a hack for wales smh
            return "gb-wls";
        }
        return code;
    }
    console.log(props.market)
    return (
      <div className="single-match">
        <OddsType />
        <Row>
          <Col span={24} md={0}>
            <div className="bet-time-container text-secondary">
              {getDate(props.market.commenceTime)} {getTime(props.market.commenceTime)} {getShortTimezone()}
            </div>
          </Col>
          <Col span={24} md={20}>
          <Row style={{alignItems:'center'}}>
              <Col span={6}>
                <TeamDetails name={props.market.teamB} logo={"https://storage.googleapis.com/divvy-cdn/MLB/" + props.market.teamB.toLowerCase().replaceAll(" ", "-").replaceAll("-fc", "")  + ".svg"} />
              </Col>
              <Col span={18}>
                <OddsSelection marketSide={MarketSide.teamB} market={props.market} selectionTeam={props.market.teamB} otherTeam={props.market.teamA} selection={"teamB"} odds={{
                  moneyline: props.market.teamBOddsMoneyline,
                  spread: props.market.teamBOddsSpread,
                  spreadPoints: props.market.teamBSpreadPoints,
                  total: props.market.teamBOddsTotal,
                  totalPoints: props.market.teamBTotalPoints,
                  moneylineFeedPubkey: props.market.teamBOddsMoneylineFeedPubkey,
                  spreadPointsFeedPubkey: props.market.teamBSpreadPointsFeedPubkey,
                  spreadFeedPubkey: props.market.teamBOddsSpreadFeedPubkey,
                  totalFeedPubkey: props.market.teamBOddsTotalFeedPubkey,
                  totalPointsFeedPubkey: props.market.teamBTotalPointsFeedPubkey,
                }} />
              </Col>
            </Row>

            <Row>
              <Col span={0} md={2}></Col>
              <Col span={24} md={22}>
                <div style={{position: 'relative'}}>
                  <label className="text-secondary" style={{fontSize:"0.8em", position:'absolute', transform:'translate(0,-50%)'}}>@</label>
                </div>
              </Col>
            </Row>

            <Row style={{alignItems:'center'}}>
              <Col span={6}>
                <TeamDetails name={props.market.teamA} logo={"https://storage.googleapis.com/divvy-cdn/MLB/" + props.market.teamA.toLowerCase().replaceAll(" ", "-").replaceAll("-fc", "")  + ".svg"} />
              </Col>
              <Col span={18}>
                <OddsSelection marketSide={MarketSide.teamA} market={props.market} selectionTeam={props.market.teamA} otherTeam={props.market.teamB} selection={"teamA"} odds={{
                  moneyline: props.market.teamAOddsMoneyline,
                  spread: props.market.teamAOddsSpread,
                  spreadPoints: props.market.teamASpreadPoints,
                  total: props.market.teamAOddsTotal,
                  totalPoints: props.market.teamATotalPoints,
                  moneylineFeedPubkey: props.market.teamAOddsMoneylineFeedPubkey,
                  spreadPointsFeedPubkey: props.market.teamASpreadPointsFeedPubkey,
                  spreadFeedPubkey: props.market.teamAOddsSpreadFeedPubkey,
                  totalFeedPubkey: props.market.teamAOddsTotalFeedPubkey,
                  totalPointsFeedPubkey: props.market.teamATotalPointsFeedPubkey,
                }} />
              </Col>
            </Row>
            
            { sport?.sportId === 3 &&
              <Row>
                <Col span={6} md={6}>
                </Col>
                <Col span={18}>
                  <OddsSelection marketSide={MarketSide.draw} market={props.market} selectionTeam={props.market.draw} otherTeam={props.market.teamA} selection={"Draw"} odds={{
                    moneyline: props.market.drawOddsMoneyline,
                    spread: props.market.drawOddsSpread,
                    spreadPoints: props.market.drawSpreadPoints,
                    total: props.market.drawOddsTotal,
                    totalPoints: props.market.drawTotalPoints,
                    moneylineFeedPubkey: props.market.drawOddsMoneylineFeedPubkey,
                    spreadPointsFeedPubkey: props.market.drawSpreadPointsFeedPubkey,
                    spreadFeedPubkey: props.market.drawOddsSpreadFeedPubkey,
                    totalFeedPubkey: props.market.drawOddsTotalFeedPubkey,
                    totalPointsFeedPubkey: props.market.drawTotalPointsFeedPubkey,
                  }} />
                </Col>
              </Row>
            }
            
          </Col>         
          <Col span={0} md={4}>
            <div className="bet-time-container">
              {getDate(props.market.commenceTime)}<br />{getTime(props.market.commenceTime)}<br />{getShortTimezone()}
            </div>
          </Col>
        </Row>
      </div>
    );
};
