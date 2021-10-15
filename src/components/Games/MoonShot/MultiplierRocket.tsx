import React, {useContext, useEffect, useState} from "react";
import {MultiplierGraphModel} from "../../../models/games/moonshot/bets";
import {getDuration, getMappedMultiplier} from "../../../constants/games";
import {MoonshotSocketContext} from "../../../contexts/moonshot-socket";
import {RocketAnimation} from "./RocketAnimation";

export const MultiplierRocket = () => {
    const [val, setVal] = useState("0");
    const [seed, setSeed] = useState(0);
    const [multiplier, setMultiplier] = useState(0);
    const socket = useContext(MoonshotSocketContext);

    let time = getDuration(multiplier);
    time = time > 0 ? time : 1;
    const handleRocket = () => {
        let i = 0;
        if(seed) {
            let arr = [];
            while(i < seed-1 && i < 60) {
                i+=0.1;
                let currVal = getMappedMultiplier(i);
                arr.push({ "multiplier": currVal, "time": i });
            }
            console.log(i);
            setSeed(0);
        }
        const interval = setInterval(() => {
            if(i > time-1) {
                window.clearInterval(interval);
                setVal(multiplier.toString());
                return;
            }
            i+=0.1;
            let currVal = getMappedMultiplier(i);
            setVal(currVal.toFixed(2));
        }, 100);
    }
    useEffect(() => {
        socket.on('data', data => {
            if(Date.now()-data.start_time > 2000) {
                console.log(Date.now()-data.start_time);
                setSeed((Date.now()-data.start_time)/1000.0);
            }
            setMultiplier(data.multiplier)
            console.log(data.multiplier);
        })
    }, [socket])
    useEffect(() => {
        if(multiplier) {
            handleRocket();
        }
    }, [multiplier])
    return (
        <>
            <RocketAnimation multiplier={multiplier.toString()} val={val} />
            <div style={{fontSize:'2em', color:'white', backgroundColor:'var(--off-black)', borderRadius:'0.5em', padding:'0.2em', margin:'0.8em', textAlign:'center'}}>
                {val}&times;
            </div>
        </>
    )
}
