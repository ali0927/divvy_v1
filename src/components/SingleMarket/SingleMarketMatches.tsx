import React from "react";
import { SingleMatchComponent } from "./SingleMatchComponent"
import { Collapse, Divider } from "antd";
import { GameName } from "./GameName";
const { Panel } = Collapse;
export const SingleMarketMatches = () => {
    return (
        <div className="single-market">
            <Collapse accordion={true} style={{ display: "grid" }} ghost={true} expandIconPosition="right">
                <Panel header={<GameName />} key="1">
                    <SingleMatchComponent  />
                    <Divider style={{ color: "gray" }} />
                    <SingleMatchComponent />
                </Panel>
            </Collapse>

        </div>
    )
};
