import { useContext } from "react";
import { Button, Col, Row } from "antd";
import { SportContext } from "../../contexts/sport";
import { Odds, BetType, Market, Bet, MarketSide, BetStatus } from "../../constants";
import { BetsContext } from "../../contexts/bets";
export const OddsSelection = (props: { market: Market, selection: string, odds: Odds, otherTeam: string, selectionTeam: string, marketSide: MarketSide }) => {
    const bets = useContext(BetsContext);
    const { sport, changeSport } = useContext(SportContext)

    const setSlip = (betType: BetType, odds: number, oddsFeed: string, marketPubkey: string) => {
        if (containsBet(betType)) {
            const existing = bets?.findBets(props.market.marketId, props.marketSide, betType, BetStatus.Current);
            if(existing && existing.length !== 0) {
                bets?.removeBet(existing[0].betId);
            }
        }
        else {
            let bet: Bet;
            bet = {
                betId: Math.random() * 10,
                marketId: props.market.marketId,
                seasonId: props.market.seasonId,
                sportId: props.market.sportId,
                marketPubkey: marketPubkey,
                risk: 0,
                payout: 0,
                userPubkey: "uerguerbgub",
                selection: props.selection,
                odds: odds,
                status: BetStatus.Current,
                market: props.market,
                oddsPubKey: oddsFeed,
                selectionTeam: props.selectionTeam,
                otherTeam: props.otherTeam,
                marketSide: props.marketSide,
                betType: betType,
                sportName: sport?.sportName,
                seasonName: props.market.seasonName,
                marketName: props.market.teamA + " vs " + props.market.teamB,
                placedOn: (new Date()).toString()
            }
            bets?.addBet(bet)
        }
    }

    const containsBet = (betType: BetType) => {
        return bets?.containsBet(props.market.marketId, props.marketSide, betType, BetStatus.Current) ?? false;
    }

    return (
      <Row style={{ display: "flex", alignItems: "center", height: 36, marginTop: 10 }}>
        <Col span={8} md={10} 
            style={{ paddingLeft: 4, paddingRight: 4 }}
            onClick={() => setSlip(BetType.moneyline, props.odds.moneyline, props.odds.moneylineFeedPubkey, props.market.moneylineMarketPubkey)}>
          <div  className={containsBet(BetType.moneyline) ? "odds odds-active" : "odds"}>
            <b>{`${props.odds.moneyline >= 0 ? "+" : ""}${props.odds.moneyline}`}</b>
          </div>
        </Col>
        {/* TODO: add after we enable spreads: onClick={() => setSlip(BetType.spread, props.odds.spread, props.odds.spreadFeedPubkey, props.market.spreadMarketPubKey)} */}
        <Col span={8} md={7} style={{ paddingLeft: 4, paddingRight: 4 }}>
          <div className={containsBet(BetType.spread) ? "odds odds-active" : "odds disabled"}>
            <b>{`(${props.odds.spreadPoints >= 0 ? "+" : ""}${String(props.odds.spreadPoints)}) ${props.odds.spread >= 0 ? "+" : ""}${String(props.odds.spread)}`}</b>
          </div>
        </Col>
        {/* TODO: add after we enable totals: onClick={() => setSlip(BetType.total, props.odds.total, props.odds.totalFeedPubkey, props.market.totalMarketPubkey)} */}
        <Col span={8} md={7} style={{ paddingLeft: 4, paddingRight: 4 }}>
          <div className={containsBet(BetType.total) ? "odds odds-active" : "odds disabled"}>
            <b>{`(${props.odds.totalPoints >= 0 ? "O" : "U"} ${Math.abs(props.odds.totalPoints)}) ${props.odds.total >= 0 ? "+" : ""}${props.odds.total}`}</b>
          </div>
        </Col>
      </Row>
    )
};
