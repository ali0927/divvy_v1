import React from 'react';
export const ConfirmedOdds = (props: {}) => {
    return (
        <div>
            <div className="wins-left">
                <p className="text-secondary-wins">
                    Original Odds:
                </p>
                <h5>
                    Money Line
                </h5>
            </div>
            <div className="wins-right">
                <h3 style={{ marginTop: 4 }}>
                    +175
                </h3>
            </div>
        </div>
    );
}