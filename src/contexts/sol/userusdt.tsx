import { useState, createContext, useEffect } from "react"
import * as Accounts from "./accounts";
import { getAccountInfoAndSubscribe, useConnection, useConnectionConfig } from "./connection";
import { AccountInfo } from "@solana/web3.js";
import * as IDS from "../../utils/ids";
import { EscrowState, EscrowStateParser } from "../../models/sol/state/escrowState";
import { useAccountByMint } from "../../hooks";
export const UserUSDTContext = createContext({
    userUSDT: 0,
});
export const UserUSDTContextProvider = (props: { children: any }) => {
    const connection = useConnection();
    const connectionConfig = useConnectionConfig();
    const USDTMint = IDS.getUsdtMint(connectionConfig.env);
    const userUSDTPubkey = useAccountByMint(USDTMint)?.pubkey
    let [accountData, setAccountData] =
        useState<Accounts.ParsedAccount<EscrowState>>();
    const [userUSDT, setUserUSDT] = useState(0);
    useEffect(() => {
        const check = async () => {
            if(userUSDTPubkey == null){
                setUserUSDT(0);
                setAccountData(undefined);
                return;
            }
            let subscriptionId = getAccountInfoAndSubscribe(
                connection,
                userUSDTPubkey,
                parseAccount
            );
            async function parseAccount(acc: AccountInfo<Buffer>|null) {
                if (acc && userUSDTPubkey) {
                    const parsed = EscrowStateParser(userUSDTPubkey, acc);
                    const data = await connection.getTokenAccountBalance(userUSDTPubkey);
                    setUserUSDT(parseInt(data.value.amount) || 0)
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
    }, [connection, connectionConfig, userUSDTPubkey]);
    return (
        <UserUSDTContext.Provider value={{ userUSDT }}>
            {props.children}
        </UserUSDTContext.Provider>
    )
}
