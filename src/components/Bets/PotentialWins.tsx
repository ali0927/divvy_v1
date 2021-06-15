import { Bet } from '../../constants';
export const PotentialWins = (props: { betSlip: Bet }) => {
    return (
        <div>
            <div className="wins-left">
                <p className="text-secondary-wins">
                    Original Stake
                </p>
                <h3>
                    {props.betSlip.risk}
                </h3>
            </div>
            <div className="wins-right">
                <p className="text-secondary-wins">
                    Potential Win
                </p>
                <h3>
                    {props.betSlip.risk * props.betSlip.odds}
                </h3>
            </div>
        </div>
    );
}