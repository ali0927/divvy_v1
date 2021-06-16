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
