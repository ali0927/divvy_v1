import { Bet, BetStatus } from "../../constants/bets";
import { Button } from "antd";
import { MyBet } from "./MyBet";
import LinkLabel from "../Nav/LinkLabel";
import { useContext } from "react";
import { BetsContext } from "../../contexts/bets";
import { americanToDecimal, tokenAmountToString } from "../../constants/math";
import { ChainSelectContext } from "../../contexts/chainselect";
import { ChainType } from "../../constants/chains";
export const BetSlip = () => {
  const bets = useContext(BetsContext)
  const chain = useContext(ChainSelectContext);

  var totalRisk = 0
  var totalPayout = 0
  var betsCount = 0
  bets?.bets.forEach((bet: Bet) => {
    if (bet.status === BetStatus.Current) {
      totalRisk += bet.risk
      totalPayout += bet.risk * americanToDecimal(bet.odds)
      betsCount++;
    }
  })
  
  const solTxnCount = Math.ceil(betsCount / 3);

  return (
    <div className="form-grey" >
      <div style={{ height: "75vh", overflowX: "hidden", overflowY: "auto" }}>
        {bets?.bets.map((value: Bet) => {
          return value.status === BetStatus.Current
            ? <MyBet bet={value} />
            : undefined;
        })}
        {betsCount !== 0 ? <div style={{ marginTop: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginRight: 20, marginLeft: 20 }}>
            <p>
              Total Wager
            </p>
            <p>
              {tokenAmountToString(totalRisk)} USDT
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginRight: 20, marginLeft: 20 }}>
            <p>
              Total Payout
            </p>
            <p>
              {tokenAmountToString(totalPayout)} USDT
            </p>
          </div>
          <Button className="ant-btn-active" style={{ width: "100%", height: 40 }} type="primary" onClick={() => bets?.placeBetSlip()}>
            <LinkLabel style={{ marginRight: 20, marginLeft: 20 }}>
              Place {betsCount} Single bets {chain.chain === ChainType.Sol && solTxnCount > 1 ? ` in ${solTxnCount} transactions.` : ""}
            </LinkLabel>
          </Button>
        </div> : <></>
        }
      </div>
    </div>
  );
};
