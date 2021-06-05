import { useUserBalance } from "../../hooks";
import { ReactComponent as Logo } from "../../img/Divvy_UI_Logo_NoText_Beta.svg";
import { ESCROW_PROGRAM_ID, USDT_MINT } from "../../utils/ids";

export const LiquidityAvailability = () => {
    const escrowUsdtBalance = useUserBalance(ESCROW_PROGRAM_ID, USDT_MINT);

    return (
        <div>
            <div className="liquidity-left">
                <h6>91% Available Liquidity</h6>
                {/* <p className="text-primary">{escrowUsdtBalance.balance.toFixed(2)}</p> */}
                <p className="text-primary">911,112</p>
            </div>
            <div className="liquidity-right text-secondary">
                <h6 className="text-secondary">9% Locked Liquidity</h6>
                {/* <p>{escrowUsdtBalance.balance.toFixed(2)}</p> */}
                <p>88,888</p>
            </div>
        </div>
    );
};
