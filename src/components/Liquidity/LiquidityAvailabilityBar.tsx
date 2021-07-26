import { Progress } from "antd";
import { useState, useEffect, useContext } from "react";
import { HousePoolContext } from "../../contexts/sol/hpliquidity";
import { HousePoolStateContext } from "../../contexts/sol/hpstate";

export const LiquidityAvailabilityBar = () => {
  const [width, setWindowWidth] = useState(0);
  const { htBalance } = useContext(HousePoolContext);
  const { bettorBalance, liveLiquidity, lockedLiquidity } = useContext(HousePoolStateContext)
  const updateDimensions = () => {
    const width = window.innerWidth
    setWindowWidth(width / 4.5)
  }
  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [])
  return (
    <Progress
      type="dashboard"
      strokeColor={{
        "0%": "#04f35e",
        "100%": "#4b54cd",
      }}
      strokeWidth={15}
      percent={((htBalance - bettorBalance - liveLiquidity - lockedLiquidity) * 100) / (htBalance - bettorBalance)}
      strokeLinecap={"square"}
      width={width}
      format={() => {
        return <video autoPlay={true} loop={true} width={100} height={100} src={"https://siasky.net/AABLoM1oiF4w42__V4_9CO1M1AhNGydb5oaYL0vgiRpFjQ"} />;
      }}
      showInfo={true}
    />
  );
};
