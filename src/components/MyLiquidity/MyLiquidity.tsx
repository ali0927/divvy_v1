import { DepositLiquidity } from "./DepositLiquidity";
import { WithdrawLiquidity } from "./WithdrawLiquidity";
import { DivvyDao } from "./DivvyDao";
import { StakeHT } from "./StakeHT";
import { useContext } from "react";
import { UserHPTContext } from "../../contexts/solana/userhpt";
import { Tooltip } from "antd";
import { LABELS } from "../../constants/labels"
import { InfoCircleOutlined } from "@ant-design/icons"
export const MyLiquidity = (props: {}) => {
  const { userHPT } = useContext(UserHPTContext);
  return (
    <div>
      <div className="sidebar-section">
        <h3>My House Pool Stats</h3>
        <small>
          <div className="balance-container">
            <span>House Pool tokens</span>
            <span className="balance">
              {userHPT} HPT
            </span>
          </div>
          <div className="balance-container">
            <span>Balance in USDT</span>
            <span className="balance">{userHPT} USDT</span>
          </div>
          <div className="balance-container">
            <Tooltip title={LABELS.CONVERSION_RATIO}>
              <span style={{ display: 'flex' }}>Conversion Ratio <InfoCircleOutlined style={{ fontSize: 9, marginTop:3.4, marginLeft:2 }} /></span>
            </Tooltip>
            <span className="balance">1.00</span>
          </div>
        </small>
      </div>
      <DepositLiquidity />
      <WithdrawLiquidity />
      <DivvyDao />
      <StakeHT />
    </div>
  );
};
