import React, { useState, createContext, useEffect } from "react"
import { HousePoolLiquidityContextProvider } from "./hpliquidity"
import { UserHPTContextProvider } from "./userhpt"
import { UserUSDTContextProvider } from "./userusdt"
export const SolanaProvider = (props: { children: any }) => {
    return (
        <HousePoolLiquidityContextProvider>
            <UserHPTContextProvider>
                <UserUSDTContextProvider>
                    {props.children}
                </UserUSDTContextProvider>
            </UserHPTContextProvider>
        </HousePoolLiquidityContextProvider>
    )
}