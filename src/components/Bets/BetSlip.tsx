import { Bet, BetType } from "../../constants/bets";
import { Button } from "antd";
import { MyBet } from "./MyBet";
import LinkLabel from "../Nav/LinkLabel";
import { useContext } from "react";
import { BetsContext } from "../../contexts/bets";
import { americanToDecimal, LAMPORTS_PER_USDT } from "../../constants/math";
export const BetSlip = () => {
  const bets = useContext(BetsContext)

  var totalRisk = 0
  var totalPayout = 0
  var betsCount = 0
  bets?.bets.forEach((bet: Bet) => {
    if (bet.type === BetType.Current) {
      totalRisk += bet.risk
      totalPayout += bet.risk * americanToDecimal(bet.odds)
      betsCount++;
    }
  })

  return (
    <div className="form-grey" >
      <div style={{ height: "75vh", overflowX: "hidden", overflowY: "auto" }}>
        {bets?.bets.map((value: Bet) => {
          return value.type === BetType.Current
            ? <MyBet bet={value} />
            : undefined;
        })}
        {betsCount !== 0 ? <div style={{ marginTop: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginRight: 20, marginLeft: 20 }}>
            <p>
              Total Wager
            </p>
            <p>
              {(totalRisk / LAMPORTS_PER_USDT).toFixed(2)} USDT
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginRight: 20, marginLeft: 20 }}>
            <p>
              Total Payout
            </p>
            <p>
              {(totalPayout / LAMPORTS_PER_USDT).toFixed(2)} USDT
            </p>
          </div>
          <Button className="ant-btn-active" style={{ width: "100%", height: 40 }} type="primary" onClick={() => bets?.placeBetSlip()}>
            <LinkLabel style={{ marginRight: 20, marginLeft: 20 }}>Place {betsCount} Single bets</LinkLabel>
          </Button>
        </div> : <></>
        }
      </div>
    </div>
  );
};
