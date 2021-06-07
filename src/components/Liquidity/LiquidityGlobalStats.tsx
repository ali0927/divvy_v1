import { useUserBalance } from "../../hooks";
import { ESCROW_STATE_ID, USDT_MINT } from "../../utils/ids";

export const LiquidityGlobalStats = () => {
  const escrowUsdtBalance = useUserBalance(ESCROW_STATE_ID, USDT_MINT);

  return (
    <div>
      <div className="horizontal-outline" />
      <h1>{"1,000,000"} USDT</h1>
      <div className="text-secondary liquidity-total">Total in the Liquidity Pool</div>
    </div>
  );
};
