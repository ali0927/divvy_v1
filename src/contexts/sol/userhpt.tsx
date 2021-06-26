import React, { useState, createContext, useEffect, useContext } from "react"
import * as Accounts from "./accounts";
import { getAccountInfoAndSubscribe, useConnection } from "./connection";
import {
    AccountInfo,
    PublicKey,
    RpcResponseAndContext,
    TokenAccountsFilter
} from "@solana/web3.js";
import * as IDS from "../../utils/ids";
import { EscrowState, EscrowStateParser } from "../../models/sol/state/escrowState";
import { WalletContext } from "./wallet"
export const UserHPTContext = createContext<any>(null);
export const UserHPTContextProvider = (props: { children: any }) => {
    const { wallet } = useContext(WalletContext);
    const connection = useConnection();
    let [accountData, setAccountData] =
        useState<Accounts.ParsedAccount<EscrowState>>();
    const [userHPT, setUserHPT] = useState<number>(0);
    useEffect(() => {
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
                async function parseAccount(response: RpcResponseAndContext<AccountInfo<Buffer> | null>) {
                    if(response.value) {
                        const parsed = EscrowStateParser(userHPTPubKey, response.value);
                        const data = await connection.getTokenAccountBalance(userHPTPubKey);
                        setUserHPT(data.value.uiAmount || 0);
                        setAccountData(parsed);
                    } else {
                        setUserHPT(0);
                        setAccountData(undefined);
                    }
                }
                return () => {
                    connection.removeAccountChangeListener(subscriptionId);
                }
            }
            check()
        }
    }, [connection, wallet]);
    return (
        <UserHPTContext.Provider value={{ userHPT, setUserHPT }}>
            {props.children}
        </UserHPTContext.Provider>
    )
}
