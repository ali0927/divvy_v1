import { Bet, OddsType } from '../../constants';
export const ConfirmedOdds = (props: { oddsType: String, bet: Bet }) => {
    return (
        <div style={{ width: "17em" }}>
            <div className="wins-left">
                <h4>
                    {props.oddsType}
                    {props.oddsType === OddsType.spread ? props.bet.selection === "teamA" ? " (" + props.bet.market.teamASpreadPoints + ")" : " (" + props.bet.market.teamBSpreadPoints + ")" : null}
                    {props.oddsType === OddsType.total ? props.bet.selection === "teamA" ? " (" + props.bet.market.teamATotalPoints + ")" : " (" + props.bet.market.teamBTotalPoints + ")" : null}
                </h4>
            </div>
            <div className="wins-right">
                <h3 style={{ marginTop: 0 }}>
                    {props.bet.odds}
                </h3>
            </div>
        </div>
    );
}