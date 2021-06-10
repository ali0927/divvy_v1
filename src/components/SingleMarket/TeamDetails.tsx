import React, { useState } from 'react';
import { Input, Button } from 'antd'
import { SearchOutlined } from "@ant-design/icons"
export const TeamDetails = (props: { name: string, logo: string }) => {
    return (
        <div style={{ display: "flex", alignItems: "center", paddingTop: 18 }}>
            {/* <img className="team-logo" src={props.logo} /> */}
            <span className={"flag-icon " + props.logo} style={{ fontSize: 30 }}></span>
            <h2 style={{ marginLeft: 6, marginBottom: 0, width: 50 }}>{props.name}</h2>
        </div>
    );
};
