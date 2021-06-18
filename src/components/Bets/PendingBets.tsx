import { Button, Collapse } from "antd";
import { GameTeams } from "./GameTeams";
import { PotentialWins } from "./PotentialWins";
import { ConfirmedOdds } from "./ConfirmedOdds";
import { Bet, BetType } from "../../constants";
import LinkLabel from "../Nav/LinkLabel";
import { useContext } from "react";
import { BetsContext } from "../../contexts/bets";
export const PendingBets = () => {
    const bets = useContext(BetsContext);

    var pendingBets = 0
    bets?.bets.forEach((value: Bet) => {
      if (value.type === BetType.Pending)
      {
        pendingBets++;
      }
    })
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Collapse accordion={true} style={{ display: "grid" }} ghost={true} expandIconPosition="right">
                {bets?.bets.map((value: Bet) => {
                    if (value.type === BetType.Pending) {
                        return (
                            <Collapse.Panel header={<GameTeams selectionTeam={value.selectionTeam.name} otherTeam={value.otherTeam.name} betSlip={value} />} key={value.id}>
                                <PotentialWins betSlip={value} />
                                <ConfirmedOdds oddsType={value.oddsType} bet={value} />
                            </Collapse.Panel>
                        )
                    }
                })}
            </Collapse>
            {pendingBets !== 0 ? <div style={{display: "flex", alignContent: "flex-end"}}>
                <Button onClick={() => bets?.settleBets("win")} className="ant-btn-active" style={{ justifyContent: "flex-end", width:"50%"}}>
                    <LinkLabel>
                        Win Bets
                    </LinkLabel>
                </Button>
                <Button onClick={() => bets?.settleBets("lose")} className="ant-btn-active" style={{ justifyContent: "flex-end", width:"50%"}}>
                    <LinkLabel>
                        Lose Bets
                    </LinkLabel>
                </Button>
            </div>
            : <></>}
        </div>
    );
};
