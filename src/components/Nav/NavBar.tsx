import { HomeViewLink } from "./HomeViewLink";
import { LiquidityViewLink } from "./LiquidityViewLink";
import { ConnectLink } from "./ConnectLink";
import { MyDashboardLink } from "./MyDashboardLink";

export const NavBar = () => {
  return (
    <div>
      <HomeViewLink />
      <LiquidityViewLink />
      <ConnectLink />
      <MyDashboardLink />
    </div>
  );
};
