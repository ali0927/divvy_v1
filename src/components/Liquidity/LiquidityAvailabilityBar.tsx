import { Progress } from "antd";
import { useState, useEffect } from "react";
export const LiquidityAvailabilityBar = () => {
  const [width, setWindowWidth] = useState(0);
  const updateDimensions = () => {
    const width = window.innerWidth
    setWindowWidth(width/4.5)
  }
  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize",updateDimensions);
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
        percent={60}
        strokeLinecap={"square"}
        width={width}
        format={() => {
          return <video autoPlay={true} loop={true} width={100} height={100} src={"https://siasky.net/AABLoM1oiF4w42__V4_9CO1M1AhNGydb5oaYL0vgiRpFjQ"} />;
        }}
        showInfo={true}
      />
  );
};
