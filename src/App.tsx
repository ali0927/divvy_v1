import "./App.css";
import "flag-icon-css/css/flag-icon.css"
import { ChainProvider } from "./contexts/chainselect";
import { BetsView } from "./views/BetsView";
import { LiquidityView } from "./views/LiquidityView";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LandingPageView } from "./views/LandingPageView";
import { RootContextProvider } from "./contexts";
import { BetsProvider } from "./contexts/bets";
function App() {
  return (
    <BrowserRouter>
      <ChainProvider>
        <RootContextProvider>
          <BetsProvider>
            {/* Routes are ordered specific to general. the '/' route must be placed last */}
            <Switch>
              <Route path="/fhe83az">
                <LiquidityView />
              </Route>
              <Route path="/fhe839g">
                <BetsView />
              </Route>
              <Route path="/">
                <LandingPageView />
              </Route>
            </Switch>
          </BetsProvider>
        </RootContextProvider>
      </ChainProvider>
    </BrowserRouter>
  );
}

export default App;
