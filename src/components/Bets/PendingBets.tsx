import { Button, Collapse } from "antd";
import { GameTeams } from "./GameTeams";
import { PotentialWins } from "./PotentialWins";
import { ConfirmedOdds } from "./ConfirmedOdds";
import { Bet, BetType } from "../../constants";
import LinkLabel from "../Nav/LinkLabel";
export const PendingBets = (props: { betSlips: Array<Bet>, setbetSlips: any, removebetSlip: any, settleBetSlips: any }) => {
    var bets = 0
    props.betSlips.forEach((value: Bet) => {
      if (value.type === BetType.Pending)
      {
        bets++;
      }
    })
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Collapse accordion={true} style={{ display: "grid" }} ghost={true} expandIconPosition="right">
                {props.betSlips.map((value: Bet, index: number) => {
                    if (value.type === BetType.Pending) {
                        return (
                            <Collapse.Panel header={<GameTeams selectionTeam={value.selectionTeam.name} otherTeam={value.otherTeam.name} betSlip={value} />} key={value.id}>
                                <PotentialWins betSlip={value} />
                                <ConfirmedOdds oddsType={value.oddsType} odds={value} />
                            </Collapse.Panel>
                        )
                    }
                })}
            </Collapse>
            {bets !== 0 ? <div style={{display: "flex", alignContent: "flex-end"}}>
                <Button onClick={() => props.settleBetSlips("win")} className="ant-btn-active" style={{ justifyContent: "flex-end", width:"50%"}}>
                    <LinkLabel>
                        Win Bets
                    </LinkLabel>
                </Button>
                <Button onClick={() => props.settleBetSlips("lose")} className="ant-btn-active" style={{ justifyContent: "flex-end", width:"50%"}}>
                    <LinkLabel>
                        Lose Bets
                    </LinkLabel>
                </Button>
            </div>
            : <></>}
        </div>
    );
};
