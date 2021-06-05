import React, { useState } from 'react';
import { Input, Button } from 'antd'
import { SearchOutlined } from "@ant-design/icons"
import logo from "../../logo.svg"
export const TeamDetails = (props: { teamName: String }) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <img className="team-logo" src={logo} />
            <h3 style={{ marginTop: 10, marginLeft: 6, width:50 }}>{props.teamName}</h3>
        </div>
    );
};
