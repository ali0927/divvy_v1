import { useContext } from "react";
import { tokenAmountToString } from "../../constants";
import { HousePoolContext } from "../../contexts/sol/hpliquidity";

export const LiquidityPool = () => {
  const { htBalance } = useContext(HousePoolContext);
    return (
      <div className="liquidity-pool">
        <p className="text-primary">Total in Divvy</p>
        <h2><span style={{ fontSize: "2rem", fontWeight: 800 }}>{tokenAmountToString(htBalance)}</span> USDC</h2>
      </div>
    );
};