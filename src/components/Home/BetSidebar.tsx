import { useState } from "react";
import { Bet, BetType } from "../../constants";
import { MyBets as BetSlip } from "../Bets/BetSlip";
import { PendingBets } from "../Bets/PendingBets";
export const BetSidebar = (props: { bets: Array<Bet>, setbetSlips: any, removebetSlip: any, editBetSlip: any, placeBets: any, settleBets: any }) => {
  const [active, setActive] = useState("slips")
  var slips = 0
  var pending = 0
  props.bets.forEach((value: Bet) => {
    if (value.type === BetType.Current) {
      slips++;
    }
    else {
      pending++;
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
      {
        active === "slips" 
        ? <BetSlip betSlips={props.bets} setbetSlips={props.setbetSlips} removebetSlip={props.removebetSlip} editBetSlip={props.editBetSlip} placeBets={props.placeBets} /> 
        : <PendingBets betSlips={props.bets} setbetSlips={props.setbetSlips} removebetSlip={props.removebetSlip} settleBetSlips={props.settleBets} />
      }
    </div>
  );
};
