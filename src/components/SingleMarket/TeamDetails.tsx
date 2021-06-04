import React, { useState } from 'react';
import { Input, Button } from 'antd'
import { SearchOutlined } from "@ant-design/icons"
import logo from "../../logo.svg"
export const TeamDetails = () => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <img className="team-logo" src={logo} />
            <h3 style={{ marginTop: 10, marginLeft: 6 }}>Cashpoint SCR Altach</h3>
        </div>
    );
};
