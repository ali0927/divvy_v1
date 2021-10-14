import React, {useEffect, useState} from "react";
import {MultiplierGraphModel} from "../../../models/games/moonshot/bets";
import {getDuration, getMappedMultiplier} from "../../../constants/games";
import {io} from "socket.io-client";

export const MultiplierRocket = () => {
    const [data, setData] = useState<MultiplierGraphModel[]>([{"multiplier": 0, "time": 0}]);
    const [val, setVal] = useState("0");
    const [seed, setSeed] = useState(0);
    const [multiplier, setMultiplier] = useState(0);

    const time = getDuration(multiplier);
    const handleGraph = () => {
        let i = 0;
        if(seed) {
            let arr = [];
            while(i < seed-1 && i < 60) {
                i+=0.1;
                let currVal = getMappedMultiplier(i);
                arr.push({ "multiplier": currVal, "time": i });
            }
            console.log(i);
            setData([...arr]);
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
            setData(currentState => [...currentState, { "multiplier": currVal, "time": i }]);
            setVal(currVal.toFixed(2));
        }, 100);
    }
    useEffect(() => {
        const socket = io("http://34.146.175.16");
        socket.on('connect', () => {
            console.log("Conected");
            socket.on('data', data => {
                setData([{"multiplier": 0, "time": 0}]);
                if(Date.now()-data.start_time > 2000) {
                    console.log(Date.now()-data.start_time);
                    setSeed((Date.now()-data.start_time)/1000.0);
                }
                setMultiplier(data.multiplier)
                console.log(data.multiplier);
            })
        })
    }, [])
    useEffect(() => {
        if(multiplier) {
            handleGraph();
        }
    }, [multiplier])
    return (
        <>
            <img src="../hodl.svg" style={{width:'80%', margin:'auto', padding:'4em'}} alt="hodl" />
            <div style={{fontSize:'2em', color:'white', backgroundColor:'var(--off-black)', borderRadius:'0.5em', padding:'0.2em', margin:'0.8em', textAlign:'center'}}>
                {val}&times;
            </div>
        </>
    )
}
