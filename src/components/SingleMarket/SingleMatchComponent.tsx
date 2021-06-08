import React, { useState } from 'react';
import { Input, Button } from 'antd'
import { SearchOutlined } from "@ant-design/icons"
import { TeamDetails } from "./TeamDetails"
import { OddsSelection } from './OddsSelection';
import { OddsType } from './OddsType';
import { Game } from '../../constants';
export const SingleMatchComponent = (props: { game: Game, setbetSlips: any }) => {
    return (
        <div className="single-match">
            <div>
                <OddsType />
                <div style={{ display: "flex", alignItems: "center" }}>
                    <TeamDetails name={props.game.teamA.name} logo={props.game.teamA.logo} />
                    <OddsSelection odds={props.game.teamAodds} setbetSlips={props.setbetSlips} game={props.game} selection={props.game.teamA} otherteam={props.game.teamB} />
                </div>
                <p className="text-secondary" style={{ marginLeft: 47, marginTop: -4, marginBottom: -4 }}>Versus</p>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <TeamDetails name={props.game.teamB.name} logo={props.game.teamB.logo} />
                    <OddsSelection odds={props.game.teamBodds} setbetSlips={props.setbetSlips} game={props.game} selection={props.game.teamB} otherteam={props.game.teamA} />
                    <div style={{ marginTop: "-8.5%", marginLeft: "5%", textAlign: "center" }}>
                        June 11, 2021<br />15:00 EDT
                    </div>
                </div>
            </div>
        </div>
    );
};
