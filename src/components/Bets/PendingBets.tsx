import { Collapse, Divider } from "antd";
import { GameTeams } from "./GameTeams";
import { PotentialWins } from "./PotentialWins";
import { ConfirmedOdds } from "./ConfirmedOdds";
import { Bet, BetStatus, BetType } from "../../constants";
import { useContext } from "react";
import { BetsContext } from "../../contexts/bets";
import { PendingHeader } from "./PendingHeader";

export const PendingBets = () => {
    const bets = useContext(BetsContext);

    return (
        <div className="form-grey" style={{ paddingTop : '70px' }}>
            {bets?.bets.map((value: Bet, i: number) => {
                const { betType, status, selectionTeam, otherTeam } = value
                console.log(betType)

                if (status === BetStatus.Pending) {

                    return (
                        <div>
                            <PendingHeader selectionTeam={selectionTeam} otherTeam={otherTeam} betType={betType}/>
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <PotentialWins betSlip={value} />
                                <ConfirmedOdds betType={value.betType} bet={value} />
                            </div>  
                            { i !== bets?.bets.length - 1 && <Divider />}
                        </div>
                    )
                }
            })}
        </div>
    );
};
