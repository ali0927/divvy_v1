import { Bet, BetStatus } from "../../constants/bets";
import { Button } from "antd";
import { MyBet } from "./MyBet";
import LinkLabel from "../Nav/LinkLabel";
import { useContext, useState, useEffect } from "react";
import { BetsContext } from "../../contexts/bets";
import { americanToDecimal, tokenAmountToString } from "../../constants/math";
import { ChainSelectContext } from "../../contexts/chainselect";
import { ChainType } from "../../constants/chains";
import { UserUSDTContext } from "../../contexts/sol/userusdt";

export const BetSlip = () => {
  const { userUSDT } = useContext(UserUSDTContext)
  const bets = useContext(BetsContext)
  const chain = useContext(ChainSelectContext);
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if(totalRisk === 0 || totalRisk > userUSDT) setSubmitDisabled(true)
    else setSubmitDisabled(false)
    
    if(totalRisk > userUSDT) setShowError(true)
    else setShowError(false)
  }, [userUSDT, bets])

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
    <div className="form-grey" style={{position:'absolute', top:'70px', bottom:0, left:0, right:0, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
      <div style={{ overflow: 'auto'}}>
        {bets?.bets.map((value: Bet) => {
          return value.status === BetStatus.Current
            ? <MyBet bet={value} />
            : undefined;
        })}
      </div>
      {betsCount !== 0 ? 
      <div style={{ padding: '0.5em 1em' }}>
        {
          showError &&
          <div className="error-box">
            Maximum bet amount exceeded.<br/>
            Please enter a value under {tokenAmountToString(userUSDT)} USDT
          </div>
        }
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
        <Button 
          className="ant-btn-active"
          style={{ width: '100%', height: 40, overflow: 'hidden' }}
          type="primary"
          onClick={() => bets?.placeBetSlip()}
          disabled={submitDisabled}
        >
          <LinkLabel style={{ margin:"auto" }}>
            <span style={{ width: '90%', overflow: 'hidden', textAlign: 'left' }}>Place {betsCount} Single bets {chain.chain === ChainType.Sol && solTxnCount > 1 ? ` in ${solTxnCount} transactions.` : ""}</span>
          </LinkLabel>
        </Button>
      </div> : <></>
      }
    </div>
  );
};
