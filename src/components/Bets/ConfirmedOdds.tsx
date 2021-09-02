import { Bet, BetType } from '../../constants';
export const ConfirmedOdds = (props: { betType: BetType, bet: Bet }) => {
    return (
        <div style={{display:'flex', alignItems:'center'}}>
            <div className="wins-left">
                <h4>
                    {props.betType}
                    {props.betType === BetType.spread ? props.bet.selection === "teamA" ? " (" + props.bet.market.teamASpreadPoints + ")" : " (" + props.bet.market.teamBSpreadPoints + ")" : null}
                    {props.betType === BetType.total ? props.bet.selection === "teamA" ? " (" + props.bet.market.teamATotalPoints + ")" : " (" + props.bet.market.teamBTotalPoints + ")" : null}
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