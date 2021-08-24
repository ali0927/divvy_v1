import React from "react";
import { Button } from "antd";
import { useWallet } from "../../contexts/sol/wallet";
import { shortenAddress } from "../../utils/utils";
import { CopyOutlined } from "@ant-design/icons";

export const SolWalletSettings = () => {
  const { connected, disconnect, select, provider, wallet } = useWallet();

  return (
    <div className="sol-wallet-setting">
      {connected && (
        <div>
          <div className="sol-wallet-info">
            <div>
              <img src={provider?.icon} style={{width:'20px', height:'20px', marginRight:'0.8rem'}} alt="" />
              {shortenAddress(`${wallet?.publicKey}`)}
            </div>           
            <CopyOutlined onClick={() => {navigator.clipboard.writeText((wallet?.publicKey || 0).toString())}}/>
          </div>
          <div style={{display:'flex', marginTop:'0.5rem'}}>
            <Button type="primary" onClick={select} style={{marginRight:'1rem'}}>
              Change Wallet
            </Button>
            <Button type="primary" onClick={disconnect}>
              Disconnect
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
