import React, { useState, createContext, useEffect, useContext } from "react"
import * as Accounts from "./accounts";
import { useConnection } from "./connection";
import {
    AccountChangeCallback,
    AccountInfo,
    Commitment,
    Connection,
    Context,
    PublicKey,
    TokenAccountsFilter
} from "@solana/web3.js";
import * as IDS from "../../utils/ids";
import { EscrowState, EscrowStateParser } from "../../models/escrowState";
import { WalletContext } from "./wallet"
export const UserUSDTContext = createContext<any>(null);
export const UserUSDTContextProvider = (props: { children: any }) => {
    const { wallet, connected, provider, select } = useContext(WalletContext);
    const connection = useConnection();
    let [accountData, setAccountData] =
        useState<Accounts.ParsedAccount<EscrowState>>();
    const [userUSDT, setUserUSDT] = useState<number | null>(0);
    useEffect(() => {
        if (wallet?.publicKey) {
            const check = async () => {
                const UserUSDT: TokenAccountsFilter = { mint: IDS.USDT_MINT }
                const UserUSDTData = await connection.getTokenAccountsByOwner(new PublicKey(String(wallet?.publicKey)), UserUSDT)
                const UserUSDTPubKey = UserUSDTData.value[0].pubkey;
                let subscriptionId = getAccountInfoAndSubscribe(
                    connection,
                    UserUSDTPubKey,
                    parseAccount
                );
                async function parseAccount(acc: AccountInfo<Buffer>) {
                    const parsed = EscrowStateParser(UserUSDTPubKey, acc);
                    const data = await connection.getTokenAccountBalance(UserUSDTPubKey);
                    console.log(data.value.uiAmount)
                    setUserUSDT(data.value.uiAmount)
                    setAccountData(parsed)
                }
                return () => {
                    connection.removeAccountChangeListener(subscriptionId);
                }
            }
            check()
        }
    }, [connection]);
    return (
        <UserUSDTContext.Provider value={{ userUSDT, setUserUSDT }}>
            {props.children}
        </UserUSDTContext.Provider>
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