import { Bet, OddsType } from '../../constants';
export const ConfirmedOdds = (props: { oddsType: String, bet: Bet }) => {
    return (
        <div style={{ width: "17em" }}>
            <div className="wins-left">
                <h4>
                    {props.oddsType}
                    {props.oddsType === OddsType.spread ? (props.bet.selectionTeam.favorite ? " (-" : " (+") + String(props.bet.spread) + ")" : null}
                    {props.oddsType === OddsType.total ? (props.bet.selectionTeam.favorite ? " (O " : " (U ") + String(props.bet.total) + ")" : null}
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