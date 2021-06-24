import { useState, createContext, useEffect } from "react"
import * as Accounts from "./accounts";
import { getAccountInfoAndSubscribe, useConnection } from "./connection";
import { AccountInfo, RpcResponseAndContext } from "@solana/web3.js";
import * as IDS from "../../utils/ids";
import { EscrowState, EscrowStateParser } from "../../models/escrowState";
export const HousePoolContext = createContext({
    accountData: undefined as Accounts.ParsedAccount<EscrowState> | undefined,
    hpBalance: 0
});

export const HousePoolProvider = (props: { children: any }) => {
    const connection = useConnection();
    let [accountData, setAccountData] =
        useState<Accounts.ParsedAccount<EscrowState>>();
    const [hpBalance, sethpBalance] = useState<number>(0);

    useEffect(() => {
        let subscriptionId = getAccountInfoAndSubscribe(
            connection,
            IDS.DIVVY_USDT_ACCOUNT,
            parseAccount
        );
        
        async function parseAccount(response: RpcResponseAndContext<AccountInfo<Buffer> | null>) {
            if(response.value) {
                const parsed = EscrowStateParser(IDS.DIVVY_USDT_ACCOUNT, response.value);
                const data = await connection.getTokenAccountBalance(IDS.DIVVY_USDT_ACCOUNT);
                sethpBalance(data.value.uiAmount || 0);
                setAccountData(parsed);
            } else {
                sethpBalance(0);
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
