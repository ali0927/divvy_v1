import { Bet, BetType } from "../../constants/bets";
import { MyBet } from "./MyBet";
import { RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { BetsContext } from "../../contexts/bets";
import { useContext } from "react";
export const MyBets = () => {
  const bets = useContext(BetsContext);

  var stakes = 0
  var wins = 0
  var betsCount = 0
  bets?.bets.forEach((value: Bet) => {
    if (value.type === BetType.Current) {
      stakes = stakes + value.risk
      wins = wins + (value.risk * value.odds)
      betsCount = betsCount + 1
    }
  })

  return (
    <div>
      <div style={{ height: "75vh", overflowX: "hidden", overflowY: "auto" }}>
        {bets?.bets.map((value: Bet, index: number) => {
          if (value.type === BetType.Current) {
            return <MyBet bet={value} />
          }
        })}</div>
      {betsCount !== 0 ? <div className="sidebar-section-bets-button">
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
        <Button style={{ width: "100%", backgroundImage: "radial-gradient(circle at 0% 105%, #7c01ff, #00d77d)", height: 40 }} type="primary" onClick={() => bets?.placeBetSlip()}>
          <div style={{ display: "flex", justifyContent: "space-between", marginRight: 20, marginLeft: 20 }}>
            Place {betsCount} Single bets
            <RightOutlined style={{ marginLeft: 10, marginTop: 4 }} />
          </div>
        </Button>
      </div> : <></>
      }
    </div>
  );
};
