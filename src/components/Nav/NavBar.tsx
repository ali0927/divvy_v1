import { BetsViewLink } from "./BetsViewLink";
import { DivvyLinks } from "./DivvyLinks";
import { LiquidityViewLink } from "./LiquidityViewLink";
import { MyDashboardLink } from "./MyDashboardLink";
import { MarketsLink } from "./MarketsLink";
import { Input } from 'antd'
import { SearchOutlined } from "@ant-design/icons"
import { useState } from "react";
import { USDCFaucetLink } from "./USDCFaucet";
import { DivvyGamesLink } from "./DivvyGames";
import { DivvyNFTS } from "./DivvyNFTS";

export const NavBar = () => {
  const [search, setSearch] = useState("")
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <BetsViewLink />
      <DivvyNFTS />
      <DivvyLinks />
      <LiquidityViewLink />
      <MyDashboardLink />
      {/* <DivvyGamesLink /> */}
      <USDCFaucetLink />
      <Input value={search} onChange={(event) => setSearch(event.currentTarget.value)} style={{ border: "0px", padding: "1em", marginTop: "1px",  outline: "1px solid #1f1f1f", height: "40px", width: "100%" }} placeholder={"Search for bets"} prefix={<SearchOutlined />} />
      <MarketsLink search={search} />
    </div>
  );
};
