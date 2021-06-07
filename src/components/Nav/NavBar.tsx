import { BetsViewLink } from "./BetsViewLink";
import { LiquidityViewLink } from "./LiquidityViewLink";
import { ConnectLink } from "./ConnectLink";
import { MyDashboardLink } from "./MyDashboardLink";
import { MarketsLink } from "./MarketsLink";

export const NavBar = () => {
  return (
    <div>
      <BetsViewLink />
      <LiquidityViewLink />
      <ConnectLink />
      <MyDashboardLink />
      <MarketsLink />
    </div>
  );
};
