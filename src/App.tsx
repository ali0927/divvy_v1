import "./App.css";
import { WalletProvider } from "./contexts/wallet";
import { ConnectionProvider } from "./contexts/connection";
import { AccountsProvider } from "./contexts/accounts";
import { MarketProvider } from "./contexts/market";
import { EscrowProvider } from "./contexts/escrow";
import { BetsView } from "./views/BetsView";
import { LiquidityView } from "./views/LiquidityView";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LandingPageView } from "./views/LandingPageView";

function App() {
  return (
    <BrowserRouter>
      <ConnectionProvider>
        <WalletProvider>
          <AccountsProvider>
            <MarketProvider>
              <EscrowProvider>
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
              </EscrowProvider>
            </MarketProvider>
          </AccountsProvider>
        </WalletProvider>
      </ConnectionProvider>
    </BrowserRouter>
  );
}

export default App;
