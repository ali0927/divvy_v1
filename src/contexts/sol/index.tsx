import { HousePoolProvider } from "./hpliquidity"
import { UserHPTContextProvider } from "./userhpt"
import { UserUSDTContextProvider } from "./userusdt"
export const SolanaProvider = (props: { children: any }) => {
    return (
        <HousePoolProvider>
            <UserHPTContextProvider>
                <UserUSDTContextProvider>
                    {props.children}
                </UserUSDTContextProvider>
            </UserHPTContextProvider>
        </HousePoolProvider>
    )
}