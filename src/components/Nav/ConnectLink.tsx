import { SolWallet } from "../Wallet/SolWallet";
import { EthWallet } from "../Wallet/EthWallet";
import { useContext } from "react";
import { ChainSelectContext } from "../../contexts/chainselect";
import { ChainType } from "../../constants/chains";
export const ConnectLink = () => {
  const { chain } = useContext(ChainSelectContext)
  if (chain === ChainType.Eth) {
    return (
      <div className="sidebar-section">
        <EthWallet />
      </div>
    )
  }
  else {
    return (
      <div className="sidebar-section">
        <SolWallet />
      </div>
    );
  }
};
