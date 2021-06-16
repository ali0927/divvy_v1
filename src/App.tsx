import "./App.css";
import "flag-icon-css/css/flag-icon.css"
import { WalletProvider } from "./contexts/sol/wallet";
import { ConnectionProvider } from "./contexts/sol/connection";
import { AccountsProvider } from "./contexts/sol/accounts";
import { MarketProvider } from "./contexts/sol/market";
import { SolanaProvider } from "./contexts/sol";
import { ChainProvider } from "./contexts/chainselect";
import { BetsView } from "./views/BetsView";
import { LiquidityView } from "./views/LiquidityView";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LandingPageView } from "./views/LandingPageView";
import { RootContextProvider } from "./contexts";
function App() {
  return (
    <BrowserRouter>
      <ChainProvider>
        <RootContextProvider>
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
        </RootContextProvider>
      </ChainProvider>
    </BrowserRouter>
  );
}

export default App;
