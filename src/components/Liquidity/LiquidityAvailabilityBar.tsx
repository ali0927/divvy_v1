import { Component } from 'react';
import { CircularProgressbarWithChildren, CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useState, useEffect, useContext } from "react";
import { HousePoolContext } from "../../contexts/sol/hpliquidity";
import { BetStateContext } from "../../contexts/sol/betstate";
import "react-circular-progressbar/dist/styles.css";
class GradientSVG extends Component<{ startColor: string, endColor: string, rotation: number, id: string }, {}> {
  render() {
    let gradientTransform = `rotate(${this.props.rotation})`;

    return (
      <svg style={{ height: 0, position:'absolute' }}>
        <defs>
          <linearGradient id={this.props.id} gradientTransform={gradientTransform}>
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
    <>
      <div style={{transform: "rotate(225deg)"}}>
        <CircularProgressbarWithChildren
          value={95}
          circleRatio={0.75}
          strokeWidth={15}
          styles={buildStyles({
            pathColor: `gray`,
            trailColor: `url(#gradient-progress-red)`,
            strokeLinecap: "butt"
          })}
        >
          {/* Foreground path */}
          <CircularProgressbar
            value={((htBalance - liveLiquidity - lockedLiquidity) * 100) / (htBalance)}
            circleRatio={0.75}
            strokeWidth={15}  
            styles={buildStyles({
              pathColor: `url(#gradient-progress-green)`,
              trailColor: "transparent",
              strokeLinecap: "butt"
            })}
          />
          <video autoPlay={true} style={{position:'absolute', transform:"rotate(-225deg) translate(-60%, -5%)", top:'50%', right:'50%' }} loop={true} width={width > 160 ? width / 3 : width / 1.5} height={width > 160 ? width / 3 : width / 1.5} src={"https://storage.googleapis.com/divvy-cdn/assets/animated_logo.mp4"} />
        </CircularProgressbarWithChildren>
      </div>
      <GradientSVG startColor={"#7c01ff"} endColor={"#00d77d"} rotation={90} id={"gradient-progress-green"} />
      <GradientSVG startColor={"#f5d020"} endColor={"#f53803"} rotation={120} id={"gradient-progress-orange"} />
      <GradientSVG startColor={"#D75752"} endColor={"#ff0000"} rotation={100} id={"gradient-progress-red"} />
    </>
  );
};
