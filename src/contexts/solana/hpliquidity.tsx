import React, { useState, createContext, useEffect } from "react"
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
import * as IDS from "../../utils/ids";
import { EscrowState, EscrowStateParser } from "../../models/escrowState";
export const HousePoolLiquidityContext = createContext<any>(null);

export const HousePoolLiquidityContextProvider = (props: { children: any }) => {
    const connection = useConnection();
    let [accountData, setAccountData] =
        useState<Accounts.ParsedAccount<EscrowState>>();
    const [hpBalance, sethpBalance] = useState<number|null>(0);

    useEffect(() => {
        let subscriptionId = getAccountInfoAndSubscribe(
            connection,
            IDS.DIVVY_USDT_ACCOUNT,
            parseAccount
        );

        async function parseAccount(acc: AccountInfo<Buffer>) {
            const parsed = EscrowStateParser(IDS.DIVVY_USDT_ACCOUNT, acc);
            const data = await connection.getTokenAccountBalance(IDS.DIVVY_USDT_ACCOUNT);
            sethpBalance(data.value.uiAmount)
            setAccountData(parsed)

        }

        return () => {
            connection.removeAccountChangeListener(subscriptionId);
        };
    }, [connection]);
    return (
        <HousePoolLiquidityContext.Provider value={{ accountData, hpBalance }}>
            {props.children}
        </HousePoolLiquidityContext.Provider>
    )
}

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