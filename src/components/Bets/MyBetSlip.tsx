import { GameTeams } from "./GameTeams";
import { Form, Input, Divider } from "antd";
import { ConfirmedOdds } from "./ConfirmedOdds";
import { Bet } from "../../constants/bets";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons"
export const MyBetSlip = (props: { betSlips: Array<Bet>, setbetSlips: any, index: number, betSlip: Bet, removebetSlip: any, editBetSlip: any }) => {
    const [stake, setStake] = useState(0)
    return (
        <div style={{ margin: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <GameTeams selectionTeam={props.betSlip.selectionTeam.name} otherTeam={props.betSlip.otherTeam.name} betSlip={props.betSlip} />
                <CloseOutlined onClick={() => props.removebetSlip(props.betSlip.id)} style={{ marginTop: 5 }} />
            </div>
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
