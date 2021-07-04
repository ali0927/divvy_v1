import { useState, createContext, useEffect, useContext } from "react"
import * as Accounts from "./accounts";
import { getAccountInfoAndSubscribe, useConnection } from "./connection";
import {
    AccountInfo,
    PublicKey,
    TokenAccountsFilter,
    TokenAmount
} from "@solana/web3.js";
import * as IDS from "../../utils/ids";
import { EscrowState, EscrowStateParser } from "../../models/sol/state/escrowState";
import { WalletContext } from "./wallet"
export const UserHTContext = createContext({
    userHT: 0
});
export const UserHTContextProvider = (props: { children: any }) => {
    const { wallet } = useContext(WalletContext);
    const connection = useConnection();
    let [accountData, setAccountData] =
        useState<Accounts.ParsedAccount<EscrowState>>();
    const [userHT, setUserHT] = useState(0);
    useEffect(() => {
        if (wallet?.publicKey) {
            const check = async () => {
                const userHT: TokenAccountsFilter = { mint: IDS.HP_MINT }
                const userHTData = await connection.getTokenAccountsByOwner(new PublicKey(String(wallet?.publicKey)), userHT)
                const userHTPubKey = userHTData.value[0].pubkey;
                let subscriptionId = getAccountInfoAndSubscribe(
                    connection,
                    userHTPubKey,
                    parseAccount
                );
                async function parseAccount(acc: AccountInfo<Buffer>|null) {
                    if(acc) {
                        const parsed = EscrowStateParser(userHTPubKey, acc);
                        const data = await connection.getTokenAccountBalance(userHTPubKey);
                        setUserHT(parseInt(data.value.amount) || 0);
                        setAccountData(parsed);
                    } else {
                        setUserHT(0);
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
        <UserHTContext.Provider value={{ userHT }}>
            {props.children}
        </UserHTContext.Provider>
    )
}