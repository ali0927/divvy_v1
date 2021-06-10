import { BetsViewLink } from "./BetsViewLink";
import { LiquidityViewLink } from "./LiquidityViewLink";
import { ConnectLink } from "./ConnectLink";
import { MyDashboardLink } from "./MyDashboardLink";
import { MarketsLink } from "./MarketsLink";

export const NavBar = () => {
  return (
    <div style={{maxHeight: "100vh", display: "flex", flexDirection: "column"}}>
      <BetsViewLink />
      <LiquidityViewLink />
      <ConnectLink />
      <MyDashboardLink />
      <MarketsLink />
    </div>
  );
};
