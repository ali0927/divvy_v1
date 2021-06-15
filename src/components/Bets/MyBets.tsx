import { BetSlip, BetType } from "../../constants/bets";
import { Form, Input, Button } from "antd";
import { MyBetSlip } from "./MyBetSlip";
import { RightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
export const MyBets = (props: { betSlips: Array<BetSlip>, setbetSlips: any, removebetSlip: any, editBetSlip: any, placeBets: any }) => {
  var stakes = 0
  var wins = 0
  var bets = 0
  props.betSlips.map((value: BetSlip) => {
    if (value.type == BetType.Current) {
      stakes = stakes + value.betAmount
      wins = wins + (value.betAmount * value.odds)
      bets = bets + 1
    }
  })

  return (
    <div>
      <div style={{ height: "75vh", overflowX: "hidden", overflowY: "auto" }}>
        {props.betSlips.map((value: BetSlip, index: number) => {
          if (value.type === BetType.Current) {
            return <MyBetSlip betSlips={props.betSlips} setbetSlips={props.setbetSlips} index={index} betSlip={value} removebetSlip={props.removebetSlip} editBetSlip={props.editBetSlip} />
          }
        })}</div>
      {bets != 0 ? <div className="sidebar-section-bets-button">
        <div style={{ display: "flex", justifyContent: "space-between", marginRight: 20, marginLeft: 20, marginTop: 10 }}>
          <p>
            Total Wager
          </p>
          <p>
            {stakes} USDT
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginRight: 20, marginLeft: 20 }}>
          <p>
            To Win
          </p>
          <p>
            {wins} USDT
          </p>
        </div>
        <Button style={{ width: "100%", backgroundImage: "radial-gradient(circle at 0% 105%, #7c01ff, #00d77d)", height: 40 }} type="primary" onClick={() => props.placeBets()}>
          <div style={{ display: "flex", justifyContent: "space-between", marginRight: 20, marginLeft: 20 }}>
            Place {bets} Single bets
            <RightOutlined style={{ marginLeft: 10, marginTop: 4 }} />
          </div>
        </Button>
      </div> : <></>
      }
    </div>
  );
};
