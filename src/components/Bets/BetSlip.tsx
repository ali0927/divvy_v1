import { Bet, BetType } from "../../constants/bets";
import { Button } from "antd";
import { MyBetSlip } from "./MyBetSlip";
import LinkLabel from "../Nav/LinkLabel";
export const MyBets = (props: { betSlips: Array<Bet>, setbetSlips: any, removebetSlip: any, editBetSlip: any, placeBets: any }) => {
  var totalRisk = 0
  var wins = 0
  var bets = 0
  props.betSlips.forEach((value: Bet) => {
    if (value.type === BetType.Current) {
      totalRisk += value.risk
      wins += value.risk * value.odds
      bets++;
    }
  })

  return (
    <div className="form-grey" >
      <div style={{ height: "75vh", overflowX: "hidden", overflowY: "auto" }}>
        {props.betSlips.map((value: Bet, index: number) => {
          if (value.type === BetType.Current) {
            return <MyBetSlip betSlips={props.betSlips} setbetSlips={props.setbetSlips} index={index} betSlip={value} removebetSlip={props.removebetSlip} editBetSlip={props.editBetSlip} />
          }
        })}
      </div>
      {bets !== 0 ? <div style={{ marginTop: 10 }}>
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
        <Button className="ant-btn-active" style={{ width: "100%", height: 40 }} type="primary" onClick={() => props.placeBets()}>
          <LinkLabel style={{marginRight: 20, marginLeft: 20}}>Place {bets} Single bets</LinkLabel>
        </Button>
      </div> : <></>
      }
    </div>
  );
};
