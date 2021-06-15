import { Bet, OddsType } from '../../constants';
export const ConfirmedOdds = (props: { oddsType: String, odds: Bet }) => {
    return (
        <div style={{ width: "17em" }}>
            <div className="wins-left">
                <h4>
                    {props.oddsType}
                    {props.oddsType == OddsType.spread ? (props.odds.selectionTeam.favorite ? " (-" : " (+") + String(props.odds.spread) + ")" : null}
                    {props.oddsType == OddsType.total ? (props.odds.selectionTeam.favorite ? " (O " : " (U ") + String(props.odds.total) + ")" : null}
                </h4>
            </div>
            <div className="wins-right">
                <h3 style={{ marginTop: 0 }}>
                    {props.odds.odds}
                </h3>
            </div>
        </div>
    );
}