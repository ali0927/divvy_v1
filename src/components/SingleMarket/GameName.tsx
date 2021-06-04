import React from 'react';
import { Tag } from 'antd';
export const GameName = () => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <h2>
                UEFA Hero
            </h2>
            <Tag style={{ marginTop: -8, color: 'gray', marginLeft: 6 }}>32 Matches</Tag>
        </div>
    );
};
