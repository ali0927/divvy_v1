import { Collapse } from "antd";
import { GameTeams } from "./GameTeams";
import { PotentialWins } from "./PotentialWins";
import { ConfirmedOdds } from "./ConfirmedOdds";
export const PendingBets = (props: {}) => {
    const { Panel } = Collapse;
    return (
        <Collapse accordion={true} style={{ display: "grid" }} ghost={true} expandIconPosition="right">
            <Panel header={<GameTeams />} key="1">
                <PotentialWins />
                <ConfirmedOdds />
            </Panel>
            <Panel header={<GameTeams />} key="2">
                <PotentialWins />
                <ConfirmedOdds />
            </Panel>
        </Collapse>
    );
};
