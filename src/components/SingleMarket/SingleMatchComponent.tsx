import { Col, Row } from 'antd'
import { TeamDetails } from "./TeamDetails"
import { OddsSelection } from './OddsSelection';
import { OddsType } from './OddsType';
import { Market, MarketSide } from '../../constants';
import { getDate, getTime } from '../../utils/date';
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
                <Col span={24}>
                    <OddsType />
                </Col>
                <Col span={24}>
                    <Row>
                        <Col span={4}>
                            {/* TO DO: logo */}
                            <TeamDetails name={props.market.teamA} logo={"flag-icon-" + countryCodeToFlagCode(props.market.teamA)} />
                        </Col>
                        <Col span={20} md={10}>
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
                        <Col span={0} md={3}>
                        </Col>
                    </Row>
                </Col>
                <Col span={0} md={2}>
                </Col>
                <Col span={24} md={22}>
                    <p className="text-secondary" style={{ marginTop: -4, marginBottom: -5, fontSize: "0.7em" }}>Versus</p>
                </Col>
                <Col span={24}>
                    <Row>
                        <Col span={4}>
                            {/* TO DO: logo */}
                            <TeamDetails name={props.market.teamB} logo={"flag-icon-" + countryCodeToFlagCode(props.market.teamB)} />
                        </Col>
                        <Col span={20} md={10}>
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
                        <Col span={0} md={3}>
                            <div style={{ marginLeft: "5%", marginTop: "-20%", textAlign: "center", fontSize: "1em" }}>
                                {getDate(props.market.commenceTime)}<br />{getTime(props.market.commenceTime)}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};
