import { useUserBalance } from "../../hooks";
import { ReactComponent as Logo } from "../../img/Divvy_UI_Logo_NoText_Beta.svg";
import { ESCROW_PROGRAM_ID, USDT_MINT } from "../../utils/ids";
import { Progress } from 'antd';
export const LiquidityAvailabilityBar = () => {
    const escrowUsdtBalance = useUserBalance(ESCROW_PROGRAM_ID, USDT_MINT);

    return (
        <Progress
            className="progress-bar"
            strokeColor={{
                '0%': '#7c01ff',
                '100%': '#00d77d',
            }}
            percent={60}
            showInfo={false}
        />
    );
};
