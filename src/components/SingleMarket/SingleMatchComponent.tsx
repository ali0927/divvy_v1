import React, { useState } from 'react';
import { Input, Button } from 'antd'
import { SearchOutlined } from "@ant-design/icons"
import { TeamDetails } from "./TeamDetails"
import { OddsSelection } from './OddsSelection';
import { OddsType } from './OddsType';
export const SingleMatchComponent = () => {
    return (
        <div className="single-match">
            <div>
                <OddsType />
                <div style={{ display: "flex", alignItems: "center" }}>
                    <TeamDetails teamName={"Turkey"} />
                    <OddsSelection />
                </div>
                <p style={{ marginLeft: 48, marginTop: -4, marginBottom: -4, color: "gray" }}>Versus</p>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <TeamDetails teamName={"Italy"} />
                    <OddsSelection />
                </div>
            </div>
            <div>
            </div>
        </div>
    );
};
