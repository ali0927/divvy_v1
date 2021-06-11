import "./App.css";
import "flag-icon-css/css/flag-icon.css"
import { WalletProvider } from "./contexts/solana/wallet";
import { ConnectionProvider } from "./contexts/solana/connection";
import { AccountsProvider } from "./contexts/solana/accounts";
import { MarketProvider } from "./contexts/solana/market";
import { SolanaProvider } from "./contexts/solana";
import { ChainProvider } from "./contexts/chainselect";
import { BetsView } from "./views/BetsView";
import { LiquidityView } from "./views/LiquidityView";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LandingPageView } from "./views/LandingPageView";

function App() {
  return (
    <BrowserRouter>
      <ChainProvider>
        <ConnectionProvider>
          <WalletProvider>
            <AccountsProvider>
              <MarketProvider>
                <SolanaProvider>
                  {/* Routes are ordered specific to general. the '/' route must be placed last */}
                  <Switch>
                    <Route path="/liquidity">
                      <LiquidityView />
                    </Route>
                    <Route path="/app">
                      <BetsView />
                    </Route>
                    <Route path="/">
                      <LandingPageView />
                    </Route>
                  </Switch>
                </SolanaProvider>
              </MarketProvider>
            </AccountsProvider>
          </WalletProvider>
        </ConnectionProvider>
      </ChainProvider>
    </BrowserRouter>
  );
}

export default App;
