import { useState, createContext, useEffect } from "react"
import { Bet, BetStatus, BetType } from "../constants";
import { useAccountByMint } from "../hooks";
import { useConnection, useConnectionConfig } from "./sol/connection";
import { useWallet } from "./sol/wallet";
import { settleBet } from "../models/sol/settleBet";
import { initBet } from "../models/sol/initBet";
import * as IDS from "../utils/ids"
import { useGetBetsQuery } from "../store/getBets";
import { useStoreBetsMutation } from "../store/storeBets";
import { PublicKey } from "@solana/web3.js";

export const BetsContext = createContext<{
  bets: Bet[],
  addBet: (bet: Bet) => void,
  addBets: (bets: Array<Bet>) => void,
  removeBet: (betId: number) => void,
  editBetRisk: (betId: number, risk: number) => void,
  placeBetSlip: () => Promise<void>,
  settleBets: (outcome: "win" | "lose") => Promise<void>,
} | null>(null);


const BetsProvider = (props: { children: any }) => {
  const [bets, setBets] = useState(Array<Bet>());
  const wallet = useWallet();
  const connection = useConnection();
  const connectionConfig = useConnectionConfig();
  const usdtTokenAccount = useAccountByMint(IDS.getUsdtMint(connectionConfig.env));
  const { data, error, isLoading } = useGetBetsQuery(wallet?.publicKey?.toString())
  const [
    storeBet, // This is the mutation trigger
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useStoreBetsMutation()


  const addBet = (betSlip: Bet) => {
    let bet: Array<Bet> = [];
    var b: Bet;
    console.log(data)
    data?.map((value: Bet) => {
      b = value
      switch (b.status) {
        case BetStatus.Pending:
          bet.push(b)
      }
    })
    bets?.map((b) => {
      if (b["status"] == BetStatus.Current) {
        bet.push(b)
      }
    })
    bet.push(betSlip)
    setBets(bet)
  }

  const addBets = (betSlips: Array<Bet>) => {
    setBets(betSlips)
  }

  const removeBet = (betId: number) => {
    var newBets: Array<Bet> = [];
    bets.forEach((value: Bet) => {
      if (value.betId !== betId) {
        newBets.push(value)
      }
    })
    setBets(newBets)
  }
  const editBetRisk = (betId: number, amount: number) => {
    var bet: Bet;
    var newBets: Array<Bet> = [];
    bets.forEach((value: Bet) => {
      if (value.betId === betId) {
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
    bets.forEach(async betData => {
      let bet: Bet = betData
      if (bet.status === BetStatus.Current) {
        const betPubkey = await initBet(
          connection,
          connectionConfig.env,
          wallet.wallet,
          usdtTokenAccount?.pubkey,
          bet);
        //  TODO Send all in one transaction?
        if (betPubkey && wallet.publicKey) {
          bet.betPubkey = betPubkey.toString();
          bet.status = BetStatus.Pending
          bet.userPubkey = wallet?.publicKey?.toString()
          //  call function to store  bets
          console.log(bet)
          storeBet(bet)
        }
      }
      newBets.push(bet)
      setBets(newBets)
    })
  }
  const settleBets = async (outcome: "win" | "lose") => {
    // var newBets: Array<Bet> = [...bets];
    // //for (const bet of betSlips){
    // bets.forEach(async bet => {
    //   if (bet.status === BetStatus.Pending) {
    //     const ok = await settleBet(
    //       connection,
    //       connectionConfig.env,
    //       wallet.wallet,
    //       new PublicKey(bet.betTokenAccount?),
    //       usdtTokenAccount?.pubkey,
    //       outcome);
    //     if (ok) {
    //       const index = newBets.indexOf(bet);
    //       if (index > -1) {
    //         newBets.splice(index, 1);
    //         setBets(newBets)
    //       }
    //     }
    //   }
    // })
  }

  return (
    <BetsContext.Provider value={{
      bets: bets,
      addBet: addBet,
      addBets: addBets,
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
