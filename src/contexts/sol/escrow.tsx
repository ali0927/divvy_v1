import * as Accounts from "./accounts";
import { getAccountInfoAndSubscribe, useConnection } from "./connection";
import {
  AccountChangeCallback,
  AccountInfo,
  Commitment,
  Connection,
  Context,
  PublicKey,
} from "@solana/web3.js";
import * as IDS from "../../utils/ids";
import { EscrowState, EscrowStateParser } from "../../models/escrowState";
import React, { useContext, useEffect, useState } from "react";

export interface EscrowContextState {
  escrow: Accounts.ParsedAccount<EscrowState> | undefined;
}

const EscrowContext = React.createContext<EscrowContextState>(
  {} as EscrowContextState
);

export const EscrowProvider = ({ children = null as any }) => {
  const connection = useConnection();
  let [accountData, setAccountData] =
    useState<Accounts.ParsedAccount<EscrowState>>();

  useEffect(() => {
    let subscriptionId = getAccountInfoAndSubscribe(
      connection,
      IDS.ESCROW_STATE_ID,
      parseAccount
    );

    function parseAccount(acc: AccountInfo<Buffer>) {
      const parsed = EscrowStateParser(IDS.ESCROW_STATE_ID, acc);
      setAccountData(parsed);
    }

    return () => {
      connection.removeAccountChangeListener(subscriptionId);
    };
  }, [connection]);

  return (
    <EscrowContext.Provider
      value={{
        escrow: accountData,
      }}
    >
      {children}
    </EscrowContext.Provider>
  );
};

export const useEscrow = () => {
  return useContext(EscrowContext) as EscrowContextState;
};