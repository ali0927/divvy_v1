import React, { useState } from 'react';
import { Input, Button } from 'antd'
import { SearchOutlined } from "@ant-design/icons"
export const TeamDetails = (props: { name: string, logo: string }) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <img className="team-logo" src={props.logo} />
            <h2 style={{ marginTop: 14, marginLeft: 6, width: 50 }}>{props.name}</h2>
        </div>
    );
};
