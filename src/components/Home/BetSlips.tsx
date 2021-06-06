import { useEffect, useState } from "react";
import { BetSlip, BetType } from "../../constants";
import { MyBets } from "../Bets/MyBets";
import { PendingBets } from "../Bets/PendingBets";
export const BetSlips = (props: { betSlips: Array<BetSlip>, setbetSlips: any, removebetSlip: any, editBetSlip: any, placeBets: any }) => {
  const [active, setActive] = useState("slips")
  var slips = 0
  var pending = 0
  props.betSlips.map((value: BetSlip) => {
    if (value.type == BetType.Current) {
      slips = slips + 1
    }
    else {
      pending = pending + 1
    }
  })
  return (
    <div className="sidebar-section-bets">
      <div style={{ display: "flex" }}>
        <div onClick={() => setActive('slips')} className={active === "slips" ? "bets-active bets-left" : "bets-left"}>
          <h3>Bet Slip ({slips})</h3>
        </div>
        <div onClick={() => setActive('pending')} className={active === "pending" ? "bets-active bets-right" : "bets-right"}>
          <h3>Pending ({pending})</h3>
        </div>
      </div>
      {active === "slips" ? <MyBets betSlips={props.betSlips} setbetSlips={props.setbetSlips} removebetSlip={props.removebetSlip} editBetSlip={props.editBetSlip} placeBets={props.placeBets} /> : <PendingBets betSlips={props.betSlips} setbetSlips={props.setbetSlips} removebetSlip={props.removebetSlip} />}
    </div>
  );
};
