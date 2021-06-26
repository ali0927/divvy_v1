import React, { useState, createContext, useEffect } from "react"
import { Sports } from "../constants/Sports";
export const SportContext = createContext<{
    sport: Sports | null,
    changeSport: (sport: Sports | null) => void
}>(null as any);

const SportProvider = (props: { children: any }) => {
    let [sport, setSport] = useState<Sports | null>(null);
    function changeSport(sport: Sports | null) {
        setSport(sport);
    };
    return (
        <SportContext.Provider value={{ sport, changeSport }}>
            {props.children}
        </SportContext.Provider>
    )
}
export default SportProvider