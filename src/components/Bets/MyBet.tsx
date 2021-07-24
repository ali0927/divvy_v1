import { GameTeams } from "./GameTeams";
import { Form, Input, Divider } from "antd";
import { ConfirmedOdds } from "./ConfirmedOdds";
import { Bet } from "../../constants/bets";
import { useState, useContext } from "react";
import { CloseOutlined } from "@ant-design/icons"
import { BetsContext } from "../../contexts/bets";
import { americanToDecimal, LAMPORTS_PER_USDT, tokenAmountToString } from "../../constants";
export const MyBet = (props: { bet: Bet }) => {
    const [riskStr, setRiskStr] = useState("0")
    const [risk, setRisk] = useState(0)
    const bets = useContext(BetsContext);

    const doSetRisk = (risk: string) => {
        let parsedRisk = parseFloat(risk) * LAMPORTS_PER_USDT;
        if (isNaN(parsedRisk)) {
            parsedRisk = 0;
        }

        setRiskStr(risk);
        setRisk(parsedRisk);
        bets?.editBetRisk(props.bet.betId, parsedRisk)
    }

    return (
        <div style={{ margin: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <GameTeams selectionTeam={props.bet.selectionTeam} otherTeam={props.bet.otherTeam} betSlip={props.bet} />
                <CloseOutlined onClick={() => bets?.removeBet(props.bet.betId)} style={{ marginTop: 5 }} />
            </div>
            <ConfirmedOdds betType={props.bet.betType} bet={props.bet} />
            <div style={{ display: "inline-flex" }}>
                <Form.Item
                    style={{ width: "50%", marginRight: 4 }}
                    label="Wager"
                    rules={[
                        {
                            required: true,
                            message: "Please enter an amount",
                        },
                    ]}
                >
                    <Input value={riskStr} onChange={(event) => { doSetRisk(event.currentTarget.value) }} />
                </Form.Item>
                <Form.Item
                    style={{ width: "50%", marginLeft: 4 }}
                    label="Payout"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your house pool address.",
                        },
                    ]}>
                    <Input color={"white"} style={{ color: "white" }} placeholder={tokenAmountToString(risk * (americanToDecimal(props.bet.odds)))} disabled={true} />
                </Form.Item>
            </div>
            <Divider style={{ marginTop: 0 }} />
        </div>
    );
};
