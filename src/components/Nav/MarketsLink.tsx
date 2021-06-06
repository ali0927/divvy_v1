import React, { useState } from 'react';
import { Input, Button } from 'antd'
import { SearchOutlined } from "@ant-design/icons"
export const MarketsLink = () => {
    const markets = [{ value: "football", name: "Football" }, { value: "basketball", name: "Basketball" }, { value: "mma", name: "MMA" },];
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
            <Input style={{ border: "0px", marginLeft: "1px", outline: "1px solid #1f1f1f", height: "40px", width: "20em" }} placeholder={"Search for bets"} prefix={<SearchOutlined />} />
            <div className="sidebar-section">
                {MarketsUI()}
            </div>
        </div>
    );
};
