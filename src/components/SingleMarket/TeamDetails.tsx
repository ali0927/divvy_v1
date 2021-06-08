import React, { useState } from 'react';
import { Input, Button } from 'antd'
import { SearchOutlined } from "@ant-design/icons"
export const TeamDetails = (props: { name: string, logo: string }) => {
    return (
        <div style={{ display: "flex", alignItems: "center", paddingTop: 18 }}>
            {/* <img className="team-logo" src={props.logo} /> */}
            <p style={{ fontSize: 30, marginTop: 18 }}>{props.logo}</p>
            <h2 style={{ marginTop: 0, marginLeft: 6, width: 50 }}>{props.name}</h2>
        </div>
    );
};
