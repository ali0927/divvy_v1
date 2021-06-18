import { GameTeams } from "./GameTeams";
import { Form, Input, Divider } from "antd";
import { ConfirmedOdds } from "./ConfirmedOdds";
import { Bet } from "../../constants/bets";
import { useState, useContext } from "react";
import { CloseOutlined } from "@ant-design/icons"
import { BetsContext } from "../../contexts/bets";
export const MyBet = (props: { bet: Bet }) => {
    const [risk, setRisk] = useState(0)
    const bets = useContext(BetsContext);
    return (
        <div style={{ margin: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <GameTeams selectionTeam={props.bet.selectionTeam.name} otherTeam={props.bet.otherTeam.name} betSlip={props.bet} />
                <CloseOutlined onClick={() => bets?.removeBet(props.bet.id)} style={{ marginTop: 5 }} />
            </div>
            <ConfirmedOdds oddsType={props.bet.oddsType} bet={props.bet} />
            <div style={{ display: "inline-flex" }}>
                <Form.Item
                    style={{ width: "50%", marginRight: 4 }}
                    label="Wager"
                    name={"stake " + props.bet.id}
                    rules={[
                        {
                            required: true,
                            message: "Please enter an amount",
                        },
                    ]}
                >
                    <Input value={risk} onChange={(value) => { setRisk(parseInt(value.currentTarget.value)); bets?.editBetRisk(props.bet.id, parseInt(value.currentTarget.value)) }} />
                </Form.Item>
                <Form.Item
                    style={{ width: "50%", marginLeft: 4 }}
                    label="Payout"
                    name={"win" + props.bet.id}
                    rules={[
                        {
                            required: true,
                            message: "Please enter your house pool address.",
                        },
                    ]}
                >
                    <Input color={"white"} style={{ color: "white" }} placeholder={String(risk * props.bet.odds)} disabled={true} />
                </Form.Item>
            </div>
            <Divider style={{ marginTop: 0 }} />
        </div>
    );
};
