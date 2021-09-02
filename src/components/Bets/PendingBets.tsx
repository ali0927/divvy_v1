import { Collapse } from "antd";
import { GameTeams } from "./GameTeams";
import { PotentialWins } from "./PotentialWins";
import { ConfirmedOdds } from "./ConfirmedOdds";
import { Bet, BetStatus } from "../../constants";
import { useContext } from "react";
import { BetsContext } from "../../contexts/bets";
export const PendingBets = () => {
    const bets = useContext(BetsContext);

    return (
        <div className="form-grey">
            <Collapse accordion={true} style={{ display: "grid", marginTop: '70px' }} ghost={true} expandIconPosition="right">
                {bets?.bets.map((value: Bet) => {
                    if (value.status === BetStatus.Pending) {
                        return (
                            <Collapse.Panel header={<GameTeams selectionTeam={value.selectionTeam} otherTeam={value.otherTeam} betSlip={value} />} key={value.betId}>
                                <div style={{display:'flex', flexDirection:'column'}}>
                                    <PotentialWins betSlip={value} />
                                    <ConfirmedOdds betType={value.betType} bet={value} />
                                </div>
                            </Collapse.Panel>
                        )
                    }
                })}
            </Collapse>
        </div>
    );
};
