import React from "react";
import { Link } from "react-router-dom";
import { FAUCET_VIEW_PATH } from "../../constants";
import LinkLabel from "./LinkLabel";
export const USDTFaucetLink = () => {

    return (
        <Link
            to={FAUCET_VIEW_PATH}>
            <div className="sidebar-section text-secondary">
                <LinkLabel style={{ marginBottom: "0.83em" }}>
                    <h2 style={{ marginBottom: 0 }}>Get Devnet USDT</h2>
                </LinkLabel>
                <small>
                    <div className="balance-container">
                    </div>
                </small>
            </div>
        </Link>
    );
};
