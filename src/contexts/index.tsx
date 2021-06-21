import { useContext } from "react"
import { ChainType } from "../constants/chains";
import { ChainSelectContext } from "./chainselect"
import { SolanaProvider } from "./sol";
import { AccountsProvider } from "./sol/accounts";
import { ConnectionProvider } from "./sol/connection";
import { MarketProvider } from "./sol/market";
import { WalletProvider } from "./sol/wallet";
import { ETHWalletProvider } from "./eth/wallet";
import { MetaMaskProvider } from "./eth/Metamask/MetaMaskProvider";
const RootContextProvider = (props: { children: any }) => {
    const { chain } = useContext(ChainSelectContext);
    console.log(chain)
    if (chain === ChainType.Sol) {
        return (
            <ConnectionProvider>
                <WalletProvider>
                    <AccountsProvider>
                        <MarketProvider>
                            <SolanaProvider>
                                {props.children}
                            </SolanaProvider>
                        </MarketProvider>
                    </AccountsProvider>
                </WalletProvider>
            </ConnectionProvider>
        )
    }
    else {
        return (
            <ConnectionProvider>
                <MetaMaskProvider>
                    <ETHWalletProvider>
                        <AccountsProvider>
                            <MarketProvider>
                                <SolanaProvider>
                                    {props.children}
                                </SolanaProvider>
                            </MarketProvider>
                        </AccountsProvider>
                    </ETHWalletProvider>
                </MetaMaskProvider>
            </ConnectionProvider>
        )
    }
}
export default RootContextProvider