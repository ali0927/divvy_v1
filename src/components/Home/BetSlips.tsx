import { useContext, useState } from "react";
import { Bet, BetStatus } from "../../constants";
import { BetSlip } from "../Bets/BetSlip";
import { PendingBets } from "../Bets/PendingBets";
import { Badge } from "antd";
import { BetsContext } from "../../contexts/bets";

export const BetSlips = () => {
  const [active, setActive] = useState("slips")
  const bets = useContext(BetsContext);
  var slips = 0
  var pending = 0
  bets?.bets.forEach((value: Bet) => {
    if (value.status === BetStatus.Current) {
      slips = slips + 1
    }
    else {
      pending = pending + 1
    }
  })
  return (
    <div className="sidebar-section" style={{ display: "flex", flexDirection: 'column', height: '100vh', position: 'relative' }}>
      <div style={{ display: "flex", position: 'absolute', left: 0, right: 0, top: 0 }}>
        <div onClick={() => setActive('slips')} className={active === "slips" ? "bets-active bets-left" : "bets-left"}>
          <Badge style={{ backgroundColor: "#7c01ff" }} size="default" count={slips}>
            <h3>Bet Slip</h3>
          </Badge>
        </div>
        <div onClick={() => setActive('pending')} className={active === "pending" ? "bets-active bets-right" : "bets-right"}>
          <h3>Pending ({pending})</h3>
        </div>
      </div>

      <div className="mybets-scroll">
        {active === "slips" ? <BetSlip/> : <PendingBets/>}
      </div>
      <div className="mybets-scroll-mobile">
        {active === "slips" ? <BetSlip/> : <PendingBets/>}
      </div>
    
    </div>
  );
};
