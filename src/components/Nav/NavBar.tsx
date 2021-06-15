import { BetsViewLink } from "./BetsViewLink";
import { LiquidityViewLink } from "./LiquidityViewLink";
import { ConnectLink } from "./ConnectLink";
import { MyDashboardLink } from "./MyDashboardLink";
import { MarketsLink } from "./MarketsLink";
import { Input } from 'antd'
import { SearchOutlined } from "@ant-design/icons"
import { useState } from "react";

export const NavBar = () => {
  const [search, setSearch] = useState("")
  return (
    <div style={{maxHeight: "100vh", display: "flex", flexDirection: "column"}}>
      <BetsViewLink />
      <LiquidityViewLink />
      <ConnectLink />
      <MyDashboardLink />
      <Input value={search} onChange={(event) => setSearch(event.currentTarget.value)} style={{ border: "0px", padding: "1em", marginTop: "1px",  outline: "1px solid #1f1f1f", height: "40px", width: "20em" }} placeholder={"Search for bets"} prefix={<SearchOutlined />} />
      <MarketsLink search={search} />
    </div>
  );
};
