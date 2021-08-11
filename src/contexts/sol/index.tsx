import { BetPoolStateProvider } from "./betstate"
import { HousePoolProvider } from "./hpliquidity"
import { HousePoolStateProvider } from "./hpstate"
import { HPTokenProvider } from "./hptoken"
import { UserHTContextProvider } from "./userht"
import { UserUSDTContextProvider } from "./userusdt"

export const SolanaProvider = (props: { children: any }) => {
    return (
        <HousePoolProvider>
            <HousePoolStateProvider>
                <HPTokenProvider>
                    <BetPoolStateProvider>
                        <UserHTContextProvider>
                            <UserUSDTContextProvider>
                                {props.children}
                            </UserUSDTContextProvider>
                        </UserHTContextProvider>
                    </BetPoolStateProvider>
                </HPTokenProvider>
            </HousePoolStateProvider>
        </HousePoolProvider>
    )
}