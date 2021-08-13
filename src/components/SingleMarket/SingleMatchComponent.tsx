import { Col, Row } from 'antd'
import { TeamDetails } from "./TeamDetails"
import { OddsSelection } from './OddsSelection';
import { OddsType } from './OddsType';
import { Market, MarketSide } from '../../constants';
import { getDate, getShortTimezone, getTime } from '../../utils/date';
import { codes } from "../../constants/processed"
export const SingleMatchComponent = (props: { market: Market }) => {
    const countryCodeToFlagCode = (countryCode: string) => {
        let code = codes[countryCode]?.code?.toLowerCase();

        if (code === "wl") { // This is a hack for wales smh
            return "gb-wls";
        }
        return code;
    }
    return (
      <div className="single-match">
        <Row>
          <Col span={24} md={0}>
            <div className="bet-time-container text-secondary">
              {getDate(props.market.commenceTime)} {getTime(props.market.commenceTime)} {getShortTimezone()}
            </div>
          </Col>
          <Col span={8} md={10} style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
            <TeamDetails name={props.market.teamA} logo={"https://storage.googleapis.com/divvy-cdn/" + "MLB/" + props.market.teamA + ".svg"} />
            <Row>
              <Col span={0} md={4}></Col>
              <Col span={24} md={20}>
                <div style={{position: 'relative', marginLeft: '0.5vw'}}>
                  <label className="text-secondary" style={{fontSize:"0.8em", position:'absolute', transform:'translate(0,-50%)'}}>Versus</label>
                </div>
              </Col>
            </Row>
            <TeamDetails name={props.market.teamB} logo={"https://storage.googleapis.com/divvy-cdn/" + "MLB/" + props.market.teamB + ".svg"} />
          </Col>
          <Col span={16} md={10}>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around', height:'100%'}}>
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
            </div>
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
