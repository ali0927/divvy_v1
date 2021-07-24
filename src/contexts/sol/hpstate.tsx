import { useState, createContext, useEffect } from "react"
import * as Accounts from "./accounts";
import { getAccountInfoAndSubscribe, useConnection } from "./connection";
import { AccountInfo, TokenAmount } from "@solana/web3.js";
import * as IDS from "../../utils/ids";
import { HPState, HPStateParser } from "../../models/sol/state/hpState";
export const HousePoolStateContext = createContext({
    bettorBalance: 0,
    liveLiquidity: 0,
    lockedLiquidity: 0,
    pendingBets: 0
});

export const HousePoolStateProvider = (props: { children: any }) => {
    const connection = useConnection();
    const [bettorBalance, setBettorBalance] = useState(0);
    const [liveLiquidity, setLiveLiquidity] = useState(0);
    const [lockedLiquidity, setLockedLiquidity] = useState(0);
    const [pendingBets, setPendingBets] = useState(0);

    useEffect(() => {
        let subscriptionId = getAccountInfoAndSubscribe(
            connection,
            IDS.DIVVY_STATE_ACCOUNT,
            parseAccount
        );

        async function parseAccount(acc: AccountInfo<Buffer> | null) {
            if (acc) {
                const parsed = HPStateParser(IDS.DIVVY_STATE_ACCOUNT, acc);
                setBettorBalance(parsed.info.bettorBalance);
                setLiveLiquidity(parsed.info.liveLiquidity);
                setLockedLiquidity(parsed.info.lockedLiquidity);
                setPendingBets(parsed.info.pendingBets);
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
        <HousePoolStateContext.Provider value={{ bettorBalance, liveLiquidity, lockedLiquidity, pendingBets }}>
            {props.children}
        </HousePoolStateContext.Provider>
    )
}
