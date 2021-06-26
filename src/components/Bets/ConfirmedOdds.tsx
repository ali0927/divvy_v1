import { Bet, OddsType } from '../../constants';
export const ConfirmedOdds = (props: { oddsType: String, bet: Bet }) => {
    return (
        <div style={{ width: "17em" }}>
            <div className="wins-left">
                <h4>
                    {props.oddsType}
                    {props.oddsType === OddsType.spread ? (props.bet.totalPoints >= 0 ? " (-" : " (+") + String(Math.abs(props.bet.spreadPoints)) + ")" : null}
                    {props.oddsType === OddsType.total ? (props.bet.totalPoints >= 0 ? " (O " : " (U ") + String(Math.abs(props.bet.totalPoints)) + ")" : null}
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