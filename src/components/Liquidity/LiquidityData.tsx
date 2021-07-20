import { UpOutlined, DownOutlined } from "@ant-design/icons";
export const LiquidityData = (props: { textContext: string, percentage: string, data: string }) => {
    return (
        <div className="liquidity-align">
            {
                props.percentage.includes("+") ?
                <p className="text-primary">{props.textContext}: <span style={{color: "#16c57c"}}>{props.percentage} <UpOutlined className="direction-icon" /></span></p>
                :
                <p className="text-primary">{props.textContext}: <span style={{color: "#d75752"}}>{props.percentage} <DownOutlined className="direction-icon" /></span></p>
            }
            <h2>{props.data}</h2>
        </div>
    );
}