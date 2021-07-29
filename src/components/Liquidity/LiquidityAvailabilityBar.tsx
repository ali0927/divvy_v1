import { Component } from 'react';
import { Progress } from "antd";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { useState, useEffect, useContext } from "react";
import { HousePoolContext } from "../../contexts/sol/hpliquidity";
import { HousePoolStateContext } from "../../contexts/sol/hpstate";

class GradientSVG extends Component<{ startColor: string, endColor: string, rotation: number }, {}> {
  render() {
    let gradientTransform = `rotate(${this.props.rotation})`;

    return (
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id={"gradient-progress"} gradientTransform={gradientTransform}>
            <stop offset="0%" stopColor={this.props.startColor} />
            <stop offset="100%" stopColor={this.props.endColor} />
          </linearGradient>
        </defs>
      </svg>
    );
  }
}


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
    <div style={{transform: "rotate(225deg)"}}>
      <GradientSVG startColor={"#7c01ff"} endColor={"#00d77d"} rotation={90} />
      <CircularProgressbarWithChildren
        value={((htBalance - bettorBalance - liveLiquidity - lockedLiquidity) * 100) / (htBalance - bettorBalance)}
        circleRatio={0.75}
        strokeWidth={15}
        styles={{
          path: { stroke: `url(#gradient-progress)`, height: '100%', transition: 'stroke-dashoffset 0.5s ease 0s', }, 
          trail: { stroke: "#242424" }
        }}
      >
        <video autoPlay={true} style={{transform: "rotate(-225deg)"}} loop={true} width={width/3} height={width/3} src={"https://siasky.net/AABLoM1oiF4w42__V4_9CO1M1AhNGydb5oaYL0vgiRpFjQ"} />
      </CircularProgressbarWithChildren>
    </div>
  );
};
