import React, { useState } from "react";
import { SingleMatchComponent } from "./SingleMatchComponent"
import { Collapse, Divider } from "antd";
import { GameName } from "./GameName";
const { Panel } = Collapse;
export const OddsSelection = () => {
    const [selection, setSelection] = useState("money")
    return (
        <div style={{ display: "flex", alignItems: "center", borderRadius: 22.5, backgroundColor: "#242424", width: "60%", height: 48, marginLeft: 25, marginTop: -54 }}>
            <div onClick={() => setSelection('money')} className={selection === 'money' ? "odds odds-active" : "odds"}>
                <div style={{ color: selection === 'money' ? "white" : "gray" }}>Money Line</div>
                <b>+725</b>
            </div>
            <Divider style={{ height: 32 }} type="vertical" />
            <div onClick={() => setSelection('spread')} className={selection === 'spread' ? "odds odds-active" : "odds"}>
                <div style={{ color: selection === 'spread' ? "white" : "gray" }}>Spread</div>
                <b>+14 (-110)</b>
            </div>
            <Divider style={{ height: 32 }} type="vertical" />
            <div onClick={() => setSelection('total')} className={selection === 'total' ? "odds odds-active" : "odds"}>
                <div style={{ color: selection === 'total' ? "white" : "gray" }}>Total</div>
                <b>O 227.5</b>
            </div>
        </div>
    )
};
