import { Bet, BetType } from "../../constants/bets";
import { Button } from "antd";
import { MyBet } from "./MyBet";
import LinkLabel from "../Nav/LinkLabel";
import { useContext } from "react";
import { BetsContext } from "../../contexts/bets";
export const MyBets = () => {
  const bets = useContext(BetsContext)

  var totalRisk = 0
  var wins = 0
  var betsCount = 0
  bets?.bets.forEach((bet: Bet) => {
    if (bet.type === BetType.Current) {
      totalRisk += bet.risk
      wins += bet.risk * bet.odds
      betsCount++;
    }
  })

  return (
    <div className="form-grey" >
      <div style={{ height: "75vh", overflowX: "hidden", overflowY: "auto" }}>
        {bets?.bets.map((value: Bet) => {
          if (value.type === BetType.Current) {
            return <MyBet bet={value} />
          }
        })}
      </div>
      {betsCount !== 0 ? <div style={{ marginTop: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginRight: 20, marginLeft: 20 }}>
          <p>
            Total Wager
          </p>
          <p>
            {totalRisk} USDT
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
        <Button className="ant-btn-active" style={{ width: "100%", height: 40 }} type="primary" onClick={() => bets?.placeBetSlip()}>
          <LinkLabel style={{marginRight: 20, marginLeft: 20}}>Place {betsCount} Single bets</LinkLabel>
        </Button>
      </div> : <></>
      }
    </div>
  );
};
