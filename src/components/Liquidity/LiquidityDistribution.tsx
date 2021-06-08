import { useUserBalance } from "../../hooks";
import { ReactComponent as Logo } from "../../img/Divvy_UI_Logo_NoText_Beta.svg";
import { ESCROW_STATE_ID, USDT_MINT } from "../../utils/ids";

export const LiquidityDistribution = () => {
  const escrowUsdtBalance = useUserBalance(ESCROW_STATE_ID, USDT_MINT);

  return (
    <div>
      <div className="liquidity-left">
        <h6>Distributed amongst</h6>
        <p className="text-primary">{278} Liquidity Providers</p>
      </div>
      <div className="liquidity-right">
        <h6 className="text-secondary">Reserved for</h6>
        <p className="text-secondary">{3620} Pending Bets</p>
      </div>
    </div>
  );
};
