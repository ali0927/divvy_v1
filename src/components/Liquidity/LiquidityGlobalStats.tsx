import { useUserBalance } from "../../hooks";
import { ReactComponent as Logo } from "../../img/Divvy_UI_Logo_NoText_Beta.svg";
import { ESCROW_PROGRAM_ID, USDT_MINT } from "../../utils/ids";

export const LiquidityGlobalStats = () => {
  const escrowUsdtBalance = useUserBalance(ESCROW_PROGRAM_ID, USDT_MINT);

  return (
    <div>
      <div className="horizontal-outline" />
      <h1>{"1,000,000"} USDT</h1>
      <div className="text-secondary liquidity-total">Total in the House Pool</div>
    </div>
  );
};
