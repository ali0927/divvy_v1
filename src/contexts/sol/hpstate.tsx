import { useState, createContext, useEffect } from "react"
import * as Accounts from "./accounts";
import { getAccountInfoAndSubscribe, useConnection } from "./connection";
import { AccountInfo, TokenAmount } from "@solana/web3.js";
import * as IDS from "../../utils/ids";
import { HPState, HPStateParser } from "../../models/sol/state/hpState";
export const HousePoolStateContext = createContext({
    // accountData: undefined as Accounts.ParsedAccount<EscrowState> | undefined,
    // htBalance: 0
});

export const HousePoolStateProvider = (props: { children: any }) => {
    const connection = useConnection();
    let [accountData, setAccountData] =
        useState<Accounts.ParsedAccount<HPState>>();
    const [htBalance, setHTBalance] = useState(0);

    useEffect(() => {
        let subscriptionId = getAccountInfoAndSubscribe(
            connection,
            IDS.DIVVY_STATE_ACCOUNT,
            parseAccount
        );

        async function parseAccount(acc: AccountInfo<Buffer> | null) {
            if (acc) {
                const parsed = HPStateParser(IDS.DIVVY_STATE_ACCOUNT, acc);
                // const data = await connection.getTokenAccountBalance(IDS.DIVVY_STATE_ACCOUNT);
                console.log(parsed)
            } else {
                // setHTBalance(0);
                // setAccountData(undefined);
            }
        }

        return () => {
            connection.removeAccountChangeListener(subscriptionId);
        };
    }, [connection]);
    return (
        <HousePoolStateContext.Provider value={{ "hello": "hello" }}>
            {props.children}
        </HousePoolStateContext.Provider>
    )
}
