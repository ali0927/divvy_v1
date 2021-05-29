import "./App.css";
import { WalletProvider } from "./contexts/wallet";
import { ConnectionProvider } from "./contexts/connection";
import { AccountsProvider } from "./contexts/accounts";
import { MarketProvider } from "./contexts/market";
import { HomeView } from "./views/home";

function App() {
  return (
    <ConnectionProvider>
      <WalletProvider>
        <AccountsProvider>
          <MarketProvider>
            <HomeView></HomeView>
          </MarketProvider>
        </AccountsProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
