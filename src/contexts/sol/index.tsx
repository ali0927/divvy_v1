import { HousePoolProvider } from "./hpliquidity"
import { UserHTContextProvider } from "./userht"
import { UserUSDTContextProvider } from "./userusdt"
export const SolanaProvider = (props: { children: any }) => {
    return (
        <HousePoolProvider>
            <UserHTContextProvider>
                <UserUSDTContextProvider>
                    {props.children}
                </UserUSDTContextProvider>
            </UserHTContextProvider>
        </HousePoolProvider>
    )
}