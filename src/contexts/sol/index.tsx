import { BetPoolStateProvider } from "./betstate"
import { HousePoolProvider } from "./hpliquidity"
import { HousePoolStateProvider } from "./hpstate"
import { UserHTContextProvider } from "./userht"
import { UserUSDTContextProvider } from "./userusdt"

export const SolanaProvider = (props: { children: any }) => {
    return (
        <HousePoolProvider>
            <HousePoolStateProvider>
                <BetPoolStateProvider>
                    <UserHTContextProvider>
                        <UserUSDTContextProvider>
                            {props.children}
                        </UserUSDTContextProvider>
                    </UserHTContextProvider>
                </BetPoolStateProvider>
            </HousePoolStateProvider>
        </HousePoolProvider>
    )
}