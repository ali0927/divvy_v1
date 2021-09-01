import { useContext } from "react";
import { Col, Row } from "antd";
import { SportContext } from "../../contexts/sport";
import { Odds, BetType, Market, Bet, MarketSide, BetStatus } from "../../constants";
import { BetsContext } from "../../contexts/bets";
export const OddsSelection = (props: { market: Market, selection: string, odds: Odds, otherTeam: string, selectionTeam: string, marketSide: MarketSide }) => {
    const bets = useContext(BetsContext);
    const { sport, changeSport } = useContext(SportContext)

    const setSlip = (betType: BetType, odds: number, oddsFeed: string, marketPubkey: string, points: number) => {
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
                placedOn: (new Date()).toString(),
                points: points
            }
            bets?.addBet(bet)
        }
    }

    const containsBet = (betType: BetType) => {
        return bets?.containsBet(props.market.marketId, props.marketSide, betType, BetStatus.Current) ?? false;
    }

    return (
      <Row style={{display:'flex', alignItems:'center'}}>
        <Col span={8} style={{padding: '0.5vw'}}        
            onClick={() => setSlip(BetType.moneyline, props.odds.moneyline, props.odds.moneylineFeedPubkey, props.market.moneylineMarketPubkey, 0)}>
          <div className={containsBet(BetType.moneyline) ? "odds odds-active" : "odds"}>
            { props.marketSide === MarketSide.draw && <label>(Draw)</label>}
            <b style={{fontSize: '1em'}}>{`${props.odds.moneyline >= 0 ? "+" : ""}${props.odds.moneyline}`}</b>
          </div>
        </Col>
        { props.marketSide != MarketSide.draw && 
        <>
          {/* TODO: add after we enable spreads: onClick={() => setSlip(BetType.spread, props.odds.spread, props.odds.spreadFeedPubkey, props.market.spreadMarketPubKey)} */}
          <Col onClick={() => setSlip(BetType.spread, props.odds.spread, props.odds.spreadFeedPubkey, props.market.moneylineMarketPubkey, props.odds.spreadPoints)}  span={8} style={{padding: '0.5vw'}} >
            <div className={containsBet(BetType.spread) ? "odds odds-active" : "odds"}>
              <b style={{fontSize: '1em'}}>{`(${props.odds.spreadPoints >= 0 ? "+" : ""}${String(props.odds.spreadPoints)}) ${props.odds.spread >= 0 ? "+" : ""}${String(props.odds.spread)}`}</b>
            </div>
          </Col>
          <Col onClick={() => setSlip(BetType.total, props.odds.total, props.odds.totalFeedPubkey, props.market.moneylineMarketPubkey, props.odds.totalPoints)}  span={8} style={{padding: '0.5vw'}} >
            <div className={containsBet(BetType.total) ? "odds odds-active" : "odds"}>
              <b style={{fontSize: '1em'}}>{`(${props.odds.total >= 0 ? "O" : "U"} ${Math.abs(props.odds.totalPoints)}) ${props.odds.total >= 0 ? "+" : ""}${props.odds.total}`}</b>
            </div>
          </Col>
          </>
        }
      </Row>
    )
};
