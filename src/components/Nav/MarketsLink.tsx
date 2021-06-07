import React, { useState } from 'react';
import { Input, Button } from 'antd'
import { SearchOutlined } from "@ant-design/icons"
export const MarketsLink = () => {
    const marketseg = [{ value: "football", name: "Football", }, { value: "basketball", name: "Basketball" }, { value: "mma", name: "MMA" },
    { value: "americanfootball", name: "American Football" },
    { value: "basketball", name: "Basketball" },
    { value: "hockey", name: "Hockey" },
    { value: "esports", name: "E-Sports" },
    { value: "hoor", name: "Horse Racing" },
    { value: "fighting", name: "Fighting" },
    { value: "motorracing", name: "Motor Racing" },
    { value: "tennis", name: "Tennis" },
    { value: "golf", name: "Golf" },
    { value: "darts", name: "Darts" },
    { value: "rugby", name: "Rugby" },
    { value: "tabletennis", name: "Table Tennis" },
    { value: "cricket", name: "Cricket" },
    { value: "snooker", name: "Snooker" },
    { value: "volleyball", name: "Volleyball" },
    { value: "cycling", name: "Cycling" },];
    const [markets, setMarkets] = useState(marketseg)
    const [search, setSearch] = useState("")
    const MarketsUI = () => {
        let market = new Array();
        markets.map((data, index) => {
            if (data.name.toLowerCase().includes(search.toLowerCase())) {
                market.push(
                    <div className="search-item">
                        <Button className="search-button" ghost type="default">
                            <div className="search-button-data">
                                <div className="search-left">
                                    {data.name}
                                </div>
                                <div className="search-right">
                                    {parseInt(String((Math.random() + 1) * 10))}
                                </div>
                            </div>
                        </Button>
                    </div>
                )
            }
        })
        return market;
    }
    return (
        <div>
            <Input value={search} onChange={(event) => setSearch(event.currentTarget.value)} style={{ border: "0px", marginLeft: "1px", outline: "1px solid #1f1f1f", height: "40px", width: "20em" }} placeholder={"Search for bets"} prefix={<SearchOutlined />} />
            <div className="sidebar-section">
                {MarketsUI()}
            </div>
        </div>
    );
};
