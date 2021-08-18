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
  const [submitEnabled, setSubmitEnabled] = useState(false)
  const [showError, setShowError] = useState(false)
  
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

  useEffect(() => {
    setSubmitEnabled(true)
    bets?.bets.forEach((bet: Bet) => {
      if (bet.status === BetStatus.Current && bet.risk <= 0) {
        setSubmitEnabled(false)
      }
    })
    
    if(totalRisk > userUSDT) {
      setShowError(true)
      setSubmitEnabled(false)
    }
    else setShowError(false)
  }, [userUSDT, bets, totalRisk])
  
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
            Wallet balance exceeded.           
          </div>
        }
        <div style={{ display: "flex", justifyContent: "space-between", marginRight: 20, marginLeft: 20 }}>
          <p>
            Total Wager
          </p>
          <p style={{overflowWrap: 'anywhere', marginLeft: '0.5vw'}}>
            {tokenAmountToString(totalRisk)} USDT
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginRight: 20, marginLeft: 20 }}>
          <p>
            Total Payout
          </p>
          <p style={{overflowWrap: 'anywhere', marginLeft: '0.5vw'}}>
            {tokenAmountToString(totalPayout)} USDT
          </p>
        </div>
        <Button 
          className="ant-btn-active bet-submit"
          style={{ width: '100%', height: 40}}
          type="primary"
          onClick={() => bets?.placeBetSlip()}
          disabled={!submitEnabled}
        >
          <LinkLabel style={{ margin:"auto" }}>
            <span style={{ width: '90%', overflow: 'hidden', textAlign: 'left' }}>Place {betsCount} Single bets {chain.chain === ChainType.Sol && solTxnCount > 1 ? ` in ${solTxnCount} txns.` : ""}</span>
          </LinkLabel>
        </Button>
      </div> : <></>
      }
    </div>
  );
};
