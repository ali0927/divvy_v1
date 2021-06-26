import { useState, useContext } from "react";
import { Col, Row } from "antd";
import { Odds, BetType, Market, OddsType, Team, Bet, MarketSide } from "../../constants";
import { BetsContext } from "../../contexts/bets";
import * as IDS from "../../utils/ids"
import { PublicKey } from "@solana/web3.js";
export const OddsSelection = (props: { market: Market, selection: string, odds: Odds, otherTeam: string, selectionTeam: string, marketSide: MarketSide }) => {
    const [selection, setSelection] = useState("")
    const bets = useContext(BetsContext);

    function makeId(length: number) {
        var result = [];
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() *
                charactersLength)));
        }
        return result.join('');
    }

    const setSlip = (betType: string, odds: number, Oddtype: OddsType, oddsFeed: string) => {
        setSelection(betType)
        let bet: Bet;
        bet = {
            betId: Math.random() * 10,
            marketId: props.market.marketId,
            seasonId: props.market.seasonId,
            sportId: props.market.sportId,
            marketPubkey: props.market.marketPubkey,
            risk: 0,
            payout: 0,
            userPubkey: "uerguerbgub",
            selection: props.selection,
            betType: Oddtype,
            odds: odds,
            status: 0,
            market: props.market,
            oddsPubKey: oddsFeed,
            type: BetType.Current,
            selectionTeam: props.selectionTeam,
            otherTeam: props.otherTeam,
            marketSide: props.marketSide
        }
        bets?.addBet(bet)
    }
    return (
        <Row style={{ display: "flex", alignItems: "center", height: 36, marginLeft: 20, marginTop: 10 }}>
            <Col span={8} onClick={() => setSlip("moneyline", props.odds.moneyline, OddsType.moneyline, props.odds.moneylineFeedPubkey)} className={selection === 'moneyline' ? "odds odds-active" : "odds"}>
                <b>{props.odds.moneyline}</b>
            </Col>
            <Col span={8} onClick={() => setSlip("spread", props.odds.spread, OddsType.spread, props.odds.spreadFeedPubkey)} className={selection === 'spread' ? "odds odds-active" : "odds"}>
                <b>{`(${props.odds.spreadPoints >= 0 ? "+" : ""}${String(props.odds.spreadPoints)}) ${String(props.odds.spread)}`}</b>
            </Col>
            <Col span={8} onClick={() => setSlip("total", props.odds.total, OddsType.total, props.odds.totalFeedPubkey)} className={selection === 'total' ? "odds odds-active" : "odds"}>
                <b>{`(${props.odds.totalPoints >= 0 ? "O" : "U"} ${Math.abs(props.odds.totalPoints)}) ${props.odds.total}`}</b>
            </Col>
        </Row>
    )
};
