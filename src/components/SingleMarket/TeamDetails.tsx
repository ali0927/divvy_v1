import React, { useState } from 'react';
import { Row, Col } from 'antd'
import { SearchOutlined } from "@ant-design/icons"
export const TeamDetails = (props: { name: string, logo: string }) => {
    return (
        <div style={{ alignItems: "center", paddingTop: 18 }}>
            <Row>
                <Col span={12} xs={0} sm={0} md={10}>
                    <span className={"flag-icon " + props.logo} style={{ fontSize: 24 }}></span>
                </Col>
                <Col span={12} xs={24} sm={24} md={14}>
                    <div style={{ fontSize: "1em", hyphens: "auto" }}>{props.name}</div>
                </Col>
            </Row>
        </div>
    );
};
