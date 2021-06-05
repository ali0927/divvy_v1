import React from 'react';
export const PotentialWins = (props: {}) => {
    return (
        <div>
            <div className="wins-left">
                <p className="text-secondary-wins">
                    Original Stake
                </p>
                <h3>
                    0,000D
                </h3>
            </div>
            <div className="wins-right">
                <p className="text-secondary-wins">
                    Potential Win
                </p>
                <h3>
                    0,000D
                </h3>
            </div>
        </div>
    );
}