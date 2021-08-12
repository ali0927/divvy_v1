import { Component } from 'react';
import { Progress } from "antd";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { useState, useEffect, useContext } from "react";
import { HousePoolContext } from "../../contexts/sol/hpliquidity";
import { BetStateContext } from "../../contexts/sol/betstate";

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
  const { liveLiquidity, lockedLiquidity } = useContext(BetStateContext)
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
        value={((htBalance - liveLiquidity - lockedLiquidity) * 100) / (htBalance)}
        circleRatio={0.75}
        strokeWidth={15}
        styles={{
          path: { stroke: `url(#gradient-progress)`, height: '100%', transition: 'stroke-dashoffset 0.5s ease 0s', }, 
          trail: { stroke: "#242424" }
        }}
      >
        <video autoPlay={true} style={{ transform: "rotate(-225deg)" }} loop={true} width={width > 222.3 ? width / 3 : width / 1.5} height={width > 222.3 ? width / 3 : width / 1.5} src={"https://storage.googleapis.com/divvy-cdn/assets/animated_logo.mp4"} />
      </CircularProgressbarWithChildren>
    </div>
  );
};
