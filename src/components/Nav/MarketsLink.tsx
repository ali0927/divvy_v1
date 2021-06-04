import React, { useState } from 'react';
import { Input, Button } from 'antd'
import { SearchOutlined } from "@ant-design/icons"
export const MarketsLink = () => {
    const markets = [{ value: "football", name: "Football" }, { value: "baseball", name: "Baseball" }, { value: "basketball", name: "Basketball" }, { value: "basketball", name: "Basketball" }, { value: "basketball", name: "Basketball" }, { value: "basketball", name: "Basketball" }, { value: "basketball", name: "Basketball" }, { value: "basketball", name: "Basketball" }, { value: "basketball", name: "Basketball" }, { value: "basketball", name: "Basketball" }, { value: "basketball", name: "Basketball" }, { value: "basketball", name: "Basketball" }, { value: "basketball", name: "Basketball" }, { value: "basketball", name: "Basketball" }];
    const MarketsUI = () => {
        let market = new Array();
        markets.map((data, index) => {
            market.push(
                <div className="search-item">
                    <Button className="search-button" ghost type="default">
                        <div className="search-button-data">
                            <div className="search-left">
                                {data.name}
                            </div>
                            <div className="search-right">
                                {23}
                            </div>
                        </div>
                    </Button>
                </div>
            )
        })
        return market;
    }
    return (
        <div>
            <Input style={{ background: "#0d0d0d", height: "40px", width: "100%" }} placeholder={"Search for bets"} prefix={<SearchOutlined />} />
            <div className="sidebar-section">
                {MarketsUI()}
            </div>
        </div>
    );
};
