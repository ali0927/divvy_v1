import { useUserBalance } from "../../hooks";
import { ReactComponent as Logo } from "../../img/Divvy_UI_Logo_NoText_Beta.svg";
import { ESCROW_PROGRAM_ID, USDT_MINT } from "../../utils/ids";

export const LiquidityGlobalStats = () => {
  const escrowUsdtBalance = useUserBalance(ESCROW_PROGRAM_ID, USDT_MINT);

  return (
    <div>
      <div className="horizontal-outline" />
      <h1>{escrowUsdtBalance.balance.toFixed(2)} USDT</h1>
      <p className="text-secondary">Total in the Liquidity Pool</p>
      <div className="horizontal-outline" />
    </div>
  );
};
