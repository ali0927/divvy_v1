import { Progress } from "antd";
export const LiquidityAvailabilityBar = () => {

  return (
    <Progress
      className="progress-bar"
      strokeColor={{
        "0%": "#7c01ff",
        "100%": "#00d77d",
      }}
      percent={100}
      showInfo={false}
    />
  );
};
