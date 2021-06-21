import { useState, createContext } from "react"
import { Bet, BetType, LAMPORTS_PER_USDT } from "../constants";
import { ChainType } from "../constants/chains";
import { useAccountByMint } from "../hooks";
import { useConnection, useConnectionConfig } from "./sol/connection";
import { useWallet } from "./sol/wallet";
import { settleBet } from "../models/sol/settleBet";
import { initBet } from "../models/sol/initBet";
import * as IDS from "../utils/ids"

export const BetsContext = createContext<{
  bets: Bet[],
  addBet: (bet: Bet) => void,
  removeBet: (betId: string) => void,
  editBetRisk: (betId: string, risk: number) => void,
  placeBetSlip: () => Promise<void>,
  settleBets: (outcome: "win" | "lose") => Promise<void>,
} | null>(null);


const BetsProvider = (props: { children: any }) => {
  const [bets, setBets] = useState(Array<Bet>());
  const wallet = useWallet();
  const connection = useConnection();
  const connectionConfig = useConnectionConfig();
  const usdtTokenAccount = useAccountByMint(IDS.USDT_MINT);

  const addBet = (betSlip: Bet) => {
    setBets([...bets, betSlip])
  }
  const removeBet = (betId: string) => {
    var newBets: Array<Bet> = [];
    bets.forEach((value: Bet) => {
      if (value.id !== betId) {
        newBets.push(value)
      }
    })
    setBets(newBets)
  }
  const editBetRisk = (betId: string, amount: number) => {
    var bet: Bet;
    var newBets: Array<Bet> = [];
    bets.forEach((value: Bet) => {
      if (value.id === betId) {
        bet = value
        bet.risk = amount;
        newBets.push(bet)
      }
      else {
        newBets.push(value)
      }
    })
    setBets(newBets)
  }
  const placeBetSlip = async () => {
    var newBets: Array<Bet> = [];
    bets.forEach(async bet => {
      if (bet.type === BetType.Current) {
        const betTokenAccount = await initBet(
          connection,
          connectionConfig.env,
          wallet.wallet,
          usdtTokenAccount?.pubkey,
          bet.risk * LAMPORTS_PER_USDT,
          bet.odds);
        if (betTokenAccount) {
          bet.betTokenAccount = betTokenAccount;
          bet.type = BetType.Pending
        }
      }
      newBets.push(bet)
      setBets(newBets)
    })
  }
  const settleBets = async (outcome: "win" | "lose") => {
    var newBets: Array<Bet> = [...bets];
    //for (const bet of betSlips){
    bets.forEach(async bet => {
      if (bet.type === BetType.Pending) {
        const ok = await settleBet(
          connection,
          connectionConfig.env,
          wallet.wallet,
          bet.betTokenAccount,
          usdtTokenAccount?.pubkey,
          outcome);
        if (ok) {
          const index = newBets.indexOf(bet);
          if (index > -1) {
            newBets.splice(index, 1);
            setBets(newBets)
          }
        }
      }
    })
  }
    
  return (
      <BetsContext.Provider value={{
        bets: bets,
        addBet: addBet,
        removeBet: removeBet,
        editBetRisk: editBetRisk,
        placeBetSlip: placeBetSlip,
        settleBets: settleBets
      }}>
          {props.children}
      </BetsContext.Provider>
  )
}
export default BetsProvider