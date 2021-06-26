import React, { useState, createContext, useEffect, useContext } from "react"
import * as Accounts from "./accounts";
import { getAccountInfoAndSubscribe, useConnection, useConnectionConfig } from "./connection";
import {
    AccountInfo,
    PublicKey,
    RpcResponseAndContext,
} from "@solana/web3.js";
import * as IDS from "../../utils/ids";
import { EscrowState, EscrowStateParser } from "../../models/sol/state/escrowState";
import { WalletContext } from "./wallet"
export const UserUSDTContext = createContext<any>(null);
export const UserUSDTContextProvider = (props: { children: any }) => {
    const { wallet } = useContext(WalletContext);
    const connection = useConnection();
    const connectionConfig = useConnectionConfig();
    let [accountData, setAccountData] =
        useState<Accounts.ParsedAccount<EscrowState>>();
    const [userUSDT, setUserUSDT] = useState<number>(0);
    useEffect(() => {
        if (wallet?.publicKey) {
            const check = async () => {
                const USDTMint = IDS.getUsdtMint(connectionConfig.env);
                const UserUSDTData = await connection.getTokenAccountsByOwner(new PublicKey(String(wallet?.publicKey)), { mint: USDTMint })
                const UserUSDTPubKey = UserUSDTData.value[0].pubkey;
                let subscriptionId = getAccountInfoAndSubscribe(
                    connection,
                    UserUSDTPubKey,
                    parseAccount
                );
                async function parseAccount(response: RpcResponseAndContext<AccountInfo<Buffer> | null>) {
                    if(response.value){
                        const parsed = EscrowStateParser(UserUSDTPubKey, response.value);
                        const data = await connection.getTokenAccountBalance(UserUSDTPubKey);
                        setUserUSDT(data.value.uiAmount || 0)
                        setAccountData(parsed)
                    } else {
                        setUserUSDT(0);
                        setAccountData(undefined);
                    }
                }
                return () => {
                    connection.removeAccountChangeListener(subscriptionId);
                }
            }
            check()
        }
    }, [connection, connectionConfig, wallet]);
    return (
        <UserUSDTContext.Provider value={{ userUSDT, setUserUSDT }}>
            {props.children}
        </UserUSDTContext.Provider>
    )
}
