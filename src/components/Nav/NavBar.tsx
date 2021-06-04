import { HomeViewLink } from "./HomeViewLink";
import { LiquidityViewLink } from "./LiquidityViewLink";
import { ConnectLink } from "./ConnectLink";
import { MyDashboardLink } from "./MyDashboardLink";
import { MarketsLink } from "./MarketsLink";

export const NavBar = () => {
  return (
    <div>
      <HomeViewLink />
      <LiquidityViewLink />
      <ConnectLink />
      <MyDashboardLink />
      <MarketsLink />
    </div>
  );
};
