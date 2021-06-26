import "./App.css";
import "flag-icon-css/css/flag-icon.css"
import { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import * as PATHS from "./constants/paths";
import { store } from './store'
const load = (Component: any) => (props: any) => (
  <Suspense fallback={<div></div>}>
    <Component {...props} />
  </Suspense>
)
const ChainProvider = load(lazy(() => import("./contexts/chainselect")));
const BetsView = load(lazy(() => import("./views/BetsView")));
const LiquidityView = load(lazy(() => import("./views/LiquidityView")));
const LandingPageView = load(lazy(() => import("./views/LandingPageView")));
const RootContextProvider = load(lazy(() => import("./contexts")));
const BetsProvider = load(lazy(() => import("./contexts/bets")));
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ChainProvider>
          <RootContextProvider>
            <BetsProvider>
              {/* Routes are ordered specific to general. the '/' route must be placed last */}
              <Switch>
                <Route path={PATHS.LIQUIDITY_VIEW_PATH}>
                  <LiquidityView />
                </Route>
                <Route path={PATHS.BETS_VIEW_PATH}>
                  <BetsView />
                </Route>
                <Route path={PATHS.LANDING_PAGE_VIEW_PATH}>
                  <LandingPageView />
                </Route>
              </Switch>
            </BetsProvider>
          </RootContextProvider>
        </ChainProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
