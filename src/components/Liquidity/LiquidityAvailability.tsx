
import { useContext } from "react";
import { HousePoolContext } from "../../contexts/hpliquidity";
export const LiquidityAvailability = () => {
  const { hpBalance } = useContext(HousePoolContext);
  return (
    <div>
      <div className="liquidity-left">
        <h6>100% Available Liquidity</h6>
        <p className="text-primary">{hpBalance} USDT</p>
      </div>
      <div className="liquidity-right">
        <h6 className="text-secondary">0% Locked Liquidity</h6>
        <p className="text-secondary">0 USDT</p>
      </div>
    </div>
  );
};
