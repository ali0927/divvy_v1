import React, { useState } from "react";
import { Col, Divider, Row } from "antd";
import { Odds, BetSlip, BetType, Game, OddsType, Team } from "../../constants";
export const OddsSelection = (props: { odds: Odds, setbetSlips: any, game: Game, selection: Team, otherteam: Team }) => {
    const [selection, setSelection] = useState("")
    function makeid(length: number) {
        var result = [];
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() *
                charactersLength)));
        }
        return result.join('');
    }
    const setSlip = (betType: string, odds: number, Oddtype: OddsType) => {
        setSelection(betType)
        let bet: BetSlip;
        bet = {
            publicAddress: "weukrfguiwf",
            gameId: "12",
            hash: "12312313rwrgnuierb",
            teams: props.game,
            selectionTeam: props.selection,
            otherTeam: props.otherteam,
            odds: odds,
            oddsType: Oddtype,
            type: BetType.Current,
            betAmount: 0,
            id: makeid(10),
            total: props.game.total,
            spread: props.game.spread,
        }
        props.setbetSlips(bet)
    }
    return (
        <Row style={{ display: "flex", alignItems: "center", height: 36, marginLeft: 20, marginTop: 10 }}>
            <Col span={8} onClick={() => setSlip("win", props.odds.moneyline, OddsType.moneyline)} className={selection === 'win' ? "odds odds-active" : "odds"}>
                <b>{props.odds.moneyline}</b>
            </Col>
            <Col span={8} onClick={() => setSlip("spread", props.odds.spread, OddsType.spread)} className={selection === 'spread' ? "odds odds-active" : "odds"}>
                <b>{(props.selection.favorite ? "(-" : "(+") + String(props.game.spread) + ") " + String(props.odds.spread)}</b>
            </Col>
            <Col span={8} onClick={() => setSlip("total", props.odds.total, OddsType.total)} className={selection === 'total' ? "odds odds-active" : "odds"}>
                <b>{(props.otherteam.favorite ? "(U " : "(O ") + String(props.game.total) + ") " + String(props.odds.total)}</b>
            </Col>
        </Row>
    )
};
