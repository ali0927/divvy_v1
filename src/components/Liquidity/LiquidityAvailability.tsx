
import { useContext } from "react";
import { tokenAmountToString } from "../../constants";
import { HousePoolContext } from "../../contexts/sol/hpliquidity";
export const LiquidityAvailability = () => {
  const { htBalance } = useContext(HousePoolContext);
  return (
    <div>
      <div className="liquidity-left">
        <h6>100% Available Liquidity</h6>
        <p className="text-primary">{tokenAmountToString(htBalance)} USDT</p>
      </div>
      <div className="liquidity-right">
        <h6 className="text-secondary">0% Locked Liquidity</h6>
        <p className="text-secondary">0.00 USDT</p>
      </div>
    </div>
  );
};
