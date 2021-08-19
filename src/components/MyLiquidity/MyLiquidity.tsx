import { DepositLiquidity } from "./DepositLiquidity";
import { WithdrawLiquidity } from "./WithdrawLiquidity";
import { DivvyDao } from "./DivvyDao";
import { StakeHT } from "./StakeHT";
import { useContext } from "react";
import { UserHTContext } from "../../contexts/sol/userht";
import { Tooltip } from "antd";
import { LABELS } from "../../constants/labels"
import { InfoCircleOutlined } from "@ant-design/icons"
import { tokenAmountToString } from "../../constants";
import { HPTokenContext } from "../../contexts/sol/hptoken";
import { HousePoolContext } from "../../contexts/sol/hpliquidity";
export const MyLiquidity = (props: {}) => {
  const { userHT } = useContext(UserHTContext);
  const { htBalance } = useContext(HousePoolContext);
  const { htSupply } = useContext(HPTokenContext);
  console.log(htSupply)
  return (
    <div>
      <div className="sidebar-section">
        <h3>My House Pool Stats</h3>
        <small>
          <div className="balance-container">
            <span>House Pool tokens</span>
            <span className="balance">
              {tokenAmountToString(userHT)} HT
            </span>
          </div>
          <div className="balance-container">
            <span>Balance in USDC</span>
            <span className="balance">{tokenAmountToString(userHT / (htSupply / htBalance))} USDC</span>
          </div>
          <div className="balance-container">
            <Tooltip title={LABELS.CONVERSION_RATIO}>
              <span style={{ display: 'flex' }}>Conversion Ratio <InfoCircleOutlined style={{ fontSize: 9, marginTop:3.4, marginLeft:2 }} /></span>
            </Tooltip>
            <span className="balance">{htBalance / htSupply}</span>
          </div>
        </small>
      </div>
      <DepositLiquidity />
      <WithdrawLiquidity />
      {/* 
        <DivvyDao />
        <StakeHT />
      */}
    </div>
  );
};
