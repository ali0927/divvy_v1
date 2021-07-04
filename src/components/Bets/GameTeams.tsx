import { Bet, BetType } from '../../constants';
export const GameTeams = (props: { selectionTeam: String, otherTeam: String, betSlip: Bet }) => {
    return (
        <div style={{ width: "15em" }}>
            <p className="secondary-team">
                {props.betSlip.market.teamA + " vs " + props.betSlip.market.teamB}
            </p>
            <p className="primary-team">
                {props.betSlip.betType === BetType.total ? props.otherTeam + " vs " : null}
                {props.selectionTeam}
            </p>
        </div>
    );
}