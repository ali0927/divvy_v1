import * as Accounts from "./accounts";
import { useConnection } from "./connection";
import {
  AccountChangeCallback,
  AccountInfo,
  Commitment,
  Connection,
  Context,
  PublicKey,
} from "@solana/web3.js";
import * as IDS from "../utils/ids";
import { EscrowState, EscrowStateParser } from "../models/escrowState";
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

/**
 * Fetch an account for the specified public key and subscribe a callback
 * to be invoked whenever the specified account changes.
 *
 * @param connection Connection to use
 * @param publicKey Public key of the account to monitor
 * @param callback Function to invoke whenever the account is changed
 * @param commitment Specify the commitment level account changes must reach before notification
 * @return subscription id
 */
export const getAccountInfoAndSubscribe = function (
  connection: Connection,
  publicKey: PublicKey,
  callback: AccountChangeCallback,
  commitment?: Commitment | undefined
): number {
  let latestSlot: number = -1;

  let subscriptionId = connection.onAccountChange(
    publicKey,
    (acc: AccountInfo<Buffer>, context: Context) => {
      if (context.slot >= latestSlot) {
        latestSlot = context.slot;
        callback(acc, context);
      }
    },
    commitment
  );

  connection
    .getAccountInfoAndContext(publicKey, commitment)
    .then((response) => {
      if (response.context.slot >= latestSlot) {
        latestSlot = response.context.slot;
        if (response.value) {
          callback(response.value, response.context);
        }
      }
    });

  return subscriptionId;
};
