import { americanToDecimal, Bet, LAMPORTS_PER_USDT } from '../../constants';
export const PotentialWins = (props: { betSlip: Bet }) => {
    return (
        <div>
            <div className="wins-left">
                <p className="text-secondary-wins">
                    Original Stake
                </p>
                <h3>
                    {props.betSlip.risk / LAMPORTS_PER_USDT} USDT
                </h3>
            </div>
            <div className="wins-right">
                <p className="text-secondary-wins">
                    Potential Win
                </p>
                <h3>
                    {(props.betSlip.risk / LAMPORTS_PER_USDT) * americanToDecimal(props.betSlip.odds)} USDT
                </h3>
            </div>
        </div>
    );
}