import React from 'react';
import { BetSlip, BetType, OddsType } from '../../constants';
export const GameTeams = (props: { selectionTeam: String, otherTeam: String, betSlip: BetSlip }) => {
    return (
        <div style={{ width: "15em" }}>
            <p className="secondary-team">
                {props.otherTeam + " vs " + props.selectionTeam}
            </p>
            <p className="primary-team">
                {props.betSlip.oddsType == OddsType.total ? props.otherTeam + " vs " : null}
                {props.selectionTeam}
            </p>
        </div>
    );
}