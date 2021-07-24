import { HousePoolProvider } from "./hpliquidity"
import { HousePoolStateProvider } from "./hpstate"
import { UserHTContextProvider } from "./userht"
import { UserUSDTContextProvider } from "./userusdt"

export const SolanaProvider = (props: { children: any }) => {
    return (
        <HousePoolProvider>
            <HousePoolStateProvider>
                <UserHTContextProvider>
                    <UserUSDTContextProvider>
                        {props.children}
                    </UserUSDTContextProvider>
                </UserHTContextProvider>
            </HousePoolStateProvider>
        </HousePoolProvider>
    )
}