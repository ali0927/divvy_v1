import { useState, useContext } from "react";
import { Col, Row } from "antd";
import { Odds, BetType, Game, OddsType, Team, Bet, MarketSide } from "../../constants";
import { BetsContext } from "../../contexts/bets";
import * as IDS from "../../utils/ids"
import { PublicKey } from "@solana/web3.js";
export const OddsSelection = (props: { odds: Odds, game: Game, selection: Team, otherteam: Team }) => {
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

    const setSlip = (betType: string, odds: number, Oddtype: OddsType, oddsFeed: PublicKey) => {
        setSelection(betType)
        let bet: Bet;
        bet = {
            publicAddress: "weukrfguiwf",
            gameId: "12",
            hash: "12312313rwrgnuierb",
            game: props.game,
            selectionTeam: props.selection,
            otherTeam: props.otherteam,
            odds: odds,
            oddsType: Oddtype,
            marketSide:
                props.selection === props.game.teamA ? MarketSide.teamA :
                props.selection === props.game.teamB ? MarketSide.teamB :
                MarketSide.draw,
            type: BetType.Current,
            risk: 0,
            id: makeId(10),
            totalPoints: props.odds.totalPoints,
            spreadPoints: props.odds.spreadPoints,
            sol: {
                oddsFeed: oddsFeed
            }
        }
        bets?.addBet(bet)
    }
    return (
        <Row style={{ display: "flex", alignItems: "center", height: 36, marginLeft: 20, marginTop: 10 }}>
            <Col span={8} onClick={() => setSlip("win", props.odds.moneyline, OddsType.moneyline, props.odds.sol.moneylineFeedPubkey)} className={selection === 'win' ? "odds odds-active" : "odds"}>
                <b>{props.odds.moneyline}</b>
            </Col>
            <Col span={8} onClick={() => setSlip("spread", props.odds.spread, OddsType.spread, props.odds.sol.spreadFeedPubkey)} className={selection === 'spread' ? "odds odds-active" : "odds"}>
                <b>{`(${props.odds.spreadPoints>=0 ? "+" : ""}${String(props.odds.spreadPoints)}) ${String(props.odds.spread)}`}</b>
            </Col>
            <Col span={8} onClick={() => setSlip("total", props.odds.total, OddsType.total, props.odds.sol.totalFeedPubkey)} className={selection === 'total' ? "odds odds-active" : "odds"}>
                <b>{`(${props.odds.totalPoints >= 0 ? "O" : "U"} ${Math.abs(props.odds.totalPoints)}) ${props.odds.total}`}</b>
            </Col>
        </Row>
    )
};
