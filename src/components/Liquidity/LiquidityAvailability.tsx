import { useUserBalance } from "../../hooks";
import { ReactComponent as Logo } from "../../img/Divvy_UI_Logo_NoText_Beta.svg";
import { ESCROW_STATE_ID, USDT_MINT } from "../../utils/ids";

export const LiquidityAvailability = () => {
  const escrowUsdtBalance = useUserBalance(ESCROW_STATE_ID, USDT_MINT);

  return (
    <div>
      <div className="liquidity-left">
        <h6>91% Available Liquidity</h6>
        <p className="text-primary">911,112 USDT</p>
      </div>
      <div className="liquidity-right">
        <h6 className="text-secondary">9% Locked Liquidity</h6>
        <p className="text-secondary">88,888 USDT</p>
      </div>
    </div>
  );
};
