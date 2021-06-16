import React, { useState, createContext, useEffect, useContext } from "react"
import * as Accounts from "./accounts";
import { getAccountInfoAndSubscribe, useConnection } from "./connection";
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
export const UserHPTContext = createContext<any>(null);
export const UserHPTContextProvider = (props: { children: any }) => {
    const { wallet, connected, provider, select } = useContext(WalletContext);
    const connection = useConnection();
    let [accountData, setAccountData] =
        useState<Accounts.ParsedAccount<EscrowState>>();
    const [userHPT, setUserHPT] = useState<number | null>(0);
    useEffect(() => {
        console.log(wallet)
        if (wallet?.publicKey) {
            const check = async () => {
                const userHPT: TokenAccountsFilter = { mint: IDS.HP_MINT }
                const userHPTData = await connection.getTokenAccountsByOwner(new PublicKey(String(wallet?.publicKey)), userHPT)
                const userHPTPubKey = userHPTData.value[0].pubkey;
                let subscriptionId = getAccountInfoAndSubscribe(
                    connection,
                    userHPTPubKey,
                    parseAccount
                );
                async function parseAccount(acc: AccountInfo<Buffer>) {
                    const parsed = EscrowStateParser(userHPTPubKey, acc);
                    const data = await connection.getTokenAccountBalance(userHPTPubKey);
                    setUserHPT(data.value.uiAmount)
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
        <UserHPTContext.Provider value={{ userHPT, setUserHPT }}>
            {props.children}
        </UserHPTContext.Provider>
    )
}
