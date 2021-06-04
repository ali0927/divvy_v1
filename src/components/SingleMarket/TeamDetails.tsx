import React, { useState } from 'react';
import { Input, Button } from 'antd'
import { SearchOutlined } from "@ant-design/icons"
import logo from "../../logo.svg"
export const TeamDetails = () => {
    return (
        <div>
            <img className="team-logo" src={logo} />
            <p>Cashpoint SCR Altach</p>
        </div>
    );
};
