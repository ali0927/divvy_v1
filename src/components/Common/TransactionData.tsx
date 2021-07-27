import { UpOutlined, DownOutlined } from "@ant-design/icons";
export const TransactionData = (props: { textContext: string, percentage: number, data: string }) => {
    return (
        <div className="header-align">
            {
                props.percentage >= 0 ?
                <p className="text-primary">{props.textContext}: <span style={{color: "#16c57c"}}>{"+"+props.percentage+"%"} <UpOutlined className="direction-icon" /></span></p>
                :
                <p className="text-primary">{props.textContext}: <span style={{color: "#d75752"}}>{"-"+props.percentage+"%"} <DownOutlined className="direction-icon" /></span></p>
            }
            <h3><span style={{fontSize: "1.8rem", fontWeight: 800}}>{props.data.includes("USDT") ? props.data.split(" ")[0] : props.data}</span> {props.data.includes("USDT") ? props.data.split(" ")[1] : ""}</h3>
        </div>
    );
}