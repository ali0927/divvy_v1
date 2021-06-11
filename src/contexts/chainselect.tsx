import React, { useState, createContext, useEffect } from "react"
import { ChainType } from "../constants/chains";
export const ChainSelectContext = createContext<any>(null);

export const ChainProvider = (props: { children: any }) => {
    let [chain, setChain] =
        useState<ChainType>();
    useEffect(() => {
        const getChain = async () => {
            const chain: any = await localStorage.getItem("chain")
            if (chain) {
                setChain(chain)
            } else {
                setChain(ChainType.Sol)
            }
        }
        getChain()
    }, [])
    function changeChain(chain: ChainType) {
        localStorage.setItem("chain", chain)
        setChain(chain);
    };
    return (
        <ChainSelectContext.Provider value={{ chain, changeChain }}>
            {props.children}
        </ChainSelectContext.Provider>
    )
}
