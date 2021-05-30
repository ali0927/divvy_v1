import { HomeViewLink } from "./HomeViewLink";
import { LiquidityViewLink } from "./LiquidityViewLink";
import { MyDashboardLink } from "./MyDashboardLink";

export const NavBar = () => {
  return (
    <div>
      <HomeViewLink />
      <LiquidityViewLink />
      <MyDashboardLink />
    </div>
  );
};
