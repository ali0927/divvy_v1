import { useState } from 'react';
import { BigNumber, ethers, providers } from 'ethers'
import { HPSCaddress, USDTSCaddress } from '../../constants/eth/addresses';
import HPContract from '../eth-abis/HPContract.json'
import usdt from "../eth-abis/usdt.json"
declare let window: any;
async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
}
export async function HouseDeposit(amount: number) {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount()
        const provider = new providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const HPToken = new ethers.Contract(HPSCaddress, HPContract.abi, signer)
        const USDToken = new ethers.Contract(USDTSCaddress, usdt.usdt, signer)
        try {
            let transaction1 = await USDToken.approve(HPToken.address, amount * 10 ** 6)
            await transaction1.wait()
            let transaction2 = await HPToken.process_deposit(amount)
            transaction2.wait()
        } catch (err) {
            console.log("Error: ", err)
        }
    }
}
