import { useState, createContext, useEffect } from "react"
import * as Accounts from "./accounts";
import { getAccountInfoAndSubscribe, useConnection } from "./connection";
import { AccountInfo, TokenAmount } from "@solana/web3.js";
import * as IDS from "../../utils/ids";
import { EscrowState, EscrowStateParser } from "../../models/sol/state/escrowState";
export const HousePoolContext = createContext({
    accountData: undefined as Accounts.ParsedAccount<EscrowState> | undefined,
    hpBalance: undefined as TokenAmount | undefined
});

export const HousePoolProvider = (props: { children: any }) => {
    const connection = useConnection();
    let [accountData, setAccountData] =
        useState<Accounts.ParsedAccount<EscrowState>>();
    const [hpBalance, sethpBalance] = useState<TokenAmount>();

    useEffect(() => {
        let subscriptionId = getAccountInfoAndSubscribe(
            connection,
            IDS.DIVVY_USDT_ACCOUNT,
            parseAccount
        );
        
        async function parseAccount(acc: AccountInfo<Buffer> | null) {
            if (acc) {
                const parsed = EscrowStateParser(IDS.DIVVY_USDT_ACCOUNT, acc);
                const data = await connection.getTokenAccountBalance(IDS.DIVVY_USDT_ACCOUNT);
                
                sethpBalance(data.value);
                setAccountData(parsed);
            } else {
                sethpBalance(undefined);
                setAccountData(undefined);
            }
        }

        return () => {
            connection.removeAccountChangeListener(subscriptionId);
        };
    }, [connection]);
    return (
        <HousePoolContext.Provider value={{ accountData, hpBalance }}>
            {props.children}
        </HousePoolContext.Provider>
    )
}
