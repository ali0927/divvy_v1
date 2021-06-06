import React from 'react';
import { BetSlip } from '../../constants';
export const PotentialWins = (props: { betSlip: BetSlip }) => {
    return (
        <div>
            <div className="wins-left">
                <p className="text-secondary-wins">
                    Original Stake
                </p>
                <h3>
                    {props.betSlip.betAmount}
                </h3>
            </div>
            <div className="wins-right">
                <p className="text-secondary-wins">
                    Potential Win
                </p>
                <h3>
                    {props.betSlip.betAmount * props.betSlip.odds}
                </h3>
            </div>
        </div>
    );
}