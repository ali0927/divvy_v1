import { Collapse } from "antd";
import { GameTeams } from "./GameTeams";
import { PotentialWins } from "./PotentialWins";
import { ConfirmedOdds } from "./ConfirmedOdds";
import { BetSlip, BetType } from "../../constants";
export const PendingBets = (props: { betSlips: Array<BetSlip>, setbetSlips: any, removebetSlip: any }) => {
    const { Panel } = Collapse;
    return (
        <Collapse accordion={true} style={{ display: "grid" }} ghost={true} expandIconPosition="right">
            {props.betSlips.map((value: BetSlip, index: number) => {
                if (value.type === BetType.Pending) {
                    return (
                        <Panel header={<GameTeams selectionTeam={value.selectionTeam.name} otherTeam={value.otherTeam.name} betSlip={value} />} key={value.id}>
                            <PotentialWins betSlip={value} />
                            <ConfirmedOdds oddsType={value.oddsType} odds={value} />
                        </Panel>
                    )
                }
            })}
        </Collapse>
    );
};
