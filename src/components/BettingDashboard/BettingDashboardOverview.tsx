import { useState, useEffect } from 'react';
import { Col, Row } from "antd";
import { BettingFilterOptions } from "./BettingFilterOptions";
import { CommonHeader } from "../Common/CommonHeader";
import { BettingSortOptions } from "./BettingSortOptions";
import { BettingDashboardTable } from "./BettingDashboardTable";
export const BettingDashboardOverview = () => {
    const [sortBy, setSortBy] = useState("placed");
    const [sortedInfo, setSortedInfo] = useState({ columnKey: null, order: null });
    const [filteredInfo, setFilteredInfo] = useState({ sport: null });
    return (
        <div style={{marginTop: 70}}>
            <Row>
                <Col span={36} md={5}>
                    <CommonHeader side={true} heading={"Bet overview"} />
                </Col>
                <Col span={36} md={8}>
                    <BettingFilterOptions setFilteredInfo={setFilteredInfo} />
                </Col>
                <Col span={36} md={11}>
                    <BettingSortOptions sortBy={sortBy} setSortBy={setSortBy} setSortedInfo={setSortedInfo} />
                </Col>
            </Row>
            <Row>
                <Col span={36} md={24}>
                    <BettingDashboardTable sortBy={sortBy} sortedInfo={sortedInfo} filteredInfo={filteredInfo} setSortedInfo={setSortedInfo} setFilteredInfo={setFilteredInfo} />
                </Col>
            </Row>
        </div>
    );
};