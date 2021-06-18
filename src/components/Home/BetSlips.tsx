import { useContext, useState } from "react";
import { Bet, BetType } from "../../constants";
import { MyBets } from "../Bets/MyBets";
import { PendingBets } from "../Bets/PendingBets";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { BetsContext } from "../../contexts/bets";
export const BetSlips = () => {
  const [active, setActive] = useState("slips")
  const [isCollapsed, setIsCollapsed] = useState(true)
  const bets = useContext(BetsContext);
  var slips = 0
  var pending = 0
  bets?.bets.forEach((value: Bet) => {
    if (value.type === BetType.Current) {
      slips = slips + 1
    }
    else {
      pending = pending + 1
    }
  })
  return (
    <div className={isCollapsed ? "sidebar-section-bets" : "sidebar-section-bets-active"}>
      <div style={{ display: "flex" }}>
        <div onClick={() => setActive('slips')} className={active === "slips" ? "bets-active bets-left" : "bets-left"}>
          <Badge style={{ backgroundColor: "#7c01ff" }} size="default" count={slips}>
            <h3>Bet Slip</h3>
          </Badge>
        </div>
        <div onClick={() => setActive('pending')} className={active === "pending" ? "bets-active bets-right" : "bets-right"}>
          <h3>Pending ({pending})</h3>
        </div>
        <div className="bets-icon">
          {isCollapsed ? <UpOutlined onClick={() => setIsCollapsed(!isCollapsed)} /> : <DownOutlined onClick={() => setIsCollapsed(!isCollapsed)} />}
        </div>
      </div>
      {!isCollapsed &&
        <div className="mybets-scroll">
          {active === "slips" ? <MyBets/> : <PendingBets/>}
        </div>
      }
      <div className="mybets-scroll-mobile">
        {active === "slips" ? <MyBets/> : <PendingBets/>}
      </div>
    </div>
  );
};
