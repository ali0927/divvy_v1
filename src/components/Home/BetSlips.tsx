import { useState } from "react";
import { MyBets } from "../Bets/MyBets";
import { PendingBets } from "../Bets/PendingBets";
export const BetSlips = (props: {}) => {
  const [active, setActive] = useState("slips")
  return (
    <div className="sidebar-section-bets">
      <div style={{ display: "flex" }}>
        <div onClick={() => setActive('slips')} className={active === "slips" ? "bets-active bets-left" : "bets-left"}>
          <h3>Bet Slip (2)</h3>
        </div>
        <div onClick={() => setActive('pending')} className={active === "pending" ? "bets-active bets-right" : "bets-right"}>
          <h3>Pending (1)</h3>
        </div>
      </div>
      {active === "slips" ? <MyBets /> : <PendingBets />}
    </div>
  );
};
