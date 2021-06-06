import React, { useState } from "react";
import { SingleMatchComponent } from "./SingleMatchComponent"
import { Collapse, Divider } from "antd";
import { GameName } from "./GameName";
import { Odds, BetSlip, BetType, Game, OddsType, Team } from "../../constants";
const { Panel } = Collapse;
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
        <div style={{ display: "flex", alignItems: "center", borderRadius: 22.5, backgroundColor: "#242424", width: "60%", height: 36, marginLeft: 20, marginTop: 10 }}>
            <div onClick={() => setSlip("money", props.odds.moneyline, OddsType.moneyline)} className={selection === 'money' ? "odds odds-active" : "odds"}>
                <b>{props.odds.moneyline}</b>
            </div>
            <Divider style={{ height: 32 }} type="vertical" />
            <div onClick={() => setSlip("spread", props.odds.spread, OddsType.spread)} className={selection === 'spread' ? "odds odds-active" : "odds"}>
                <b>{(props.selection.favorite ? "(-" : "(+") + String(props.game.spread) + ") " + String(props.odds.spread)}</b>
            </div>
            <Divider style={{ height: 32 }} type="vertical" />
            <div onClick={() => setSlip("total", props.odds.total, OddsType.total)} className={selection === 'total' ? "odds odds-active" : "odds"}>
                <b>{(props.otherteam.favorite ? "(U " : "(O ") + String(props.game.total) + ") " + String(props.odds.total)}</b>
            </div>
        </div>
    )
};
