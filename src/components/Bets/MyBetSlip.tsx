import { GameTeams } from "./GameTeams";
import { Form, Input, Divider } from "antd";
import { ConfirmedOdds } from "./ConfirmedOdds";
import { BetSlip } from "../../constants/bets";
import { useState } from "react";
export const MyBetSlip = (props: { betSlips: Array<BetSlip>, setbetSlips: any, index: number, betSlip: BetSlip, removebetSlip: any, editBetSlip: any }) => {
    const [stake, setStake] = useState(0)
    return (
        <div style={{ margin: 20 }} >
            <GameTeams selectionTeam={props.betSlip.selectionTeam.name} otherTeam={props.betSlip.otherTeam.name} betSlip={props.betSlip} />
            <ConfirmedOdds oddsType={props.betSlip.oddsType} odds={props.betSlip} />
            <div style={{ display: "inline-flex" }}>
                <Form.Item
                    style={{ width: "50%", marginRight: 4 }}
                    label="Wager"
                    name={"stake " + props.betSlip.id}
                    rules={[
                        {
                            required: true,
                            message: "Please enter an amount",
                        },
                    ]}
                >
                    <Input value={stake} onChange={(value) => { setStake(parseInt(value.currentTarget.value)); props.editBetSlip(props.betSlip.id, parseInt(value.currentTarget.value)) }} />
                </Form.Item>
                <Form.Item
                    style={{ width: "50%", marginLeft: 4 }}
                    label="Payout"
                    name={"win" + props.betSlip.id}
                    rules={[
                        {
                            required: true,
                            message: "Please enter your house pool address.",
                        },
                    ]}
                >
                    <Input color={"white"} style={{ color: "white" }} placeholder={String(stake * props.betSlip.odds)} disabled={true} />
                </Form.Item>
            </div>
            <Divider style={{ marginTop: 0 }} />
        </div>
    );
};
