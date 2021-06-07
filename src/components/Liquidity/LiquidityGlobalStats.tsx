import { useContext } from "react";
import { useUserBalance } from "../../hooks";
import { DIVVY_PDA_ACCOUNT, ESCROW_STATE_ID, USDT_MINT } from "../../utils/ids";
import { HousePoolLiquidityContext } from "../../contexts/hpliquidity";
export const LiquidityGlobalStats = () => {
  const escrowUsdtBalance = useUserBalance(DIVVY_PDA_ACCOUNT, USDT_MINT);
  const { accountData, hpBalance } = useContext(HousePoolLiquidityContext);
  console.log(accountData)
  return (
    <div>
      <div className="horizontal-outline" />
      <h1>{hpBalance} USDT</h1>
      <div className="text-secondary liquidity-total">Total in the Liquidity Pool</div>
    </div>
  );
};
