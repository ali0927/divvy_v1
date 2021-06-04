import React, { useState } from 'react';
import { Input, Button } from 'antd'
import { SearchOutlined } from "@ant-design/icons"
import { TeamDetails } from "./TeamDetails"
import { OddsSelection } from './OddsSelection';
export const SingleMatchComponent = () => {
    return (
        <div className="single-match">
            <div>
                <div>
                    <TeamDetails />
                </div>
                <p style={{ marginLeft: 48, marginTop: -4, marginBottom: -4, color: "gray" }}>Versus</p>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <TeamDetails />
                    <OddsSelection />
                </div>
            </div>
            <div>
            </div>
        </div>
    );
};
