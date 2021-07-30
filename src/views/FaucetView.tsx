import { u64 } from "@solana/spl-token";
import { Col, Input, Layout, Row, Button } from "antd";
import { useState } from "react";
import { LeftSideBar } from "../components/LeftSideBar";
import { MobileHeader } from "../components/Nav/Mobile/MobileHeader";
import { NavBar } from "../components/Nav/NavBar";
import { HeaderTypes } from "../constants/HeaderTypes";
import { useConnection } from "../contexts/sol/connection";
import { useWallet } from "../contexts/sol/wallet";
import { airdropTokens } from "../models/sol/instruction/usdtFaucet";
import { useAccountByMint } from "../hooks";
import { USDT_MINT_DEVNET } from "../utils/ids";
import { PublicKey } from "@solana/web3.js";
import { MONEY_LINE_BET_LAYOUT } from "../models/sol/state/moneyLineBet";
import { MARKET_STATE_ACCOUNT_DATA_LAYOUT } from "../models/sol/state/marketState";
import { HPStateParser, HP_STATE_LAYOUT } from "../models/sol/state/hpState";

export const FaucetView = () => {
    const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
    const [isBetSlipsVisible, setBetSlipsVisible] = useState(false);
    const wallet = useWallet();
    const { connected } = useWallet();
    const connection = useConnection();
    const usdtAddress = useAccountByMint(USDT_MINT_DEVNET);
    const FAUCET_ADDRESS = "4tCrsQbAckpLkX8cK2VN2vcbbjbEEgwZMrDhXGtGf33S"
    const callUSDTFaucet = async () => {
        airdropTokens(usdtAddress?.pubkey, FAUCET_ADDRESS, new u64(100, 10), connection, wallet.wallet)
    }
    const [inspectPubkey, setInspectPubkey] = useState("");
    const [inspectAccount, setInspectAccount] = useState<string>("");

    const tryInspect = async (pubkeyString: string) => {
        setInspectPubkey(pubkeyString);
        let pubkey: PublicKey;
        try {
            pubkey = new PublicKey(pubkeyString);
        } catch (ex) {
            setInspectAccount("");
            return;
        }
        let account = await connection.getAccountInfo(pubkey);
        if (account) {
            if (account.data.length === MONEY_LINE_BET_LAYOUT.span) {
                setInspectAccount(JSON.stringify(MONEY_LINE_BET_LAYOUT.decode(account.data), null, 2));
            } else if (account.data.length === MARKET_STATE_ACCOUNT_DATA_LAYOUT.span) {
                setInspectAccount(JSON.stringify(MARKET_STATE_ACCOUNT_DATA_LAYOUT.decode(account.data), null, 2));
            } else if (account.data.length === HP_STATE_LAYOUT.span) {
                setInspectAccount(JSON.stringify(HPStateParser(pubkey, account), null, 2));
            } else {
                setInspectAccount(`Account data has an unfamiliar length of ${account.data.length}. Are you missing a buffer layout or are they out of date?`);
            }
        } else {
            setInspectAccount("");
        }
    }

    return (
        <Layout style={{ backgroundColor: "#0D0D0D" }}>
            <Row>
                <Col xs={24} sm={24} md={0}>
                    <MobileHeader headerType={HeaderTypes.Bets} isBetSlipsVisible={isBetSlipsVisible} setBetSlipsVisible={setBetSlipsVisible} isMobileMenuVisible={isMobileMenuVisible} setMobileMenuVisible={setMobileMenuVisible} />
                </Col>
                <Col span={5} xs={isMobileMenuVisible ? 24 : 0} sm={isMobileMenuVisible ? 24 : 0} md={5}>
                    <LeftSideBar>
                        <NavBar />
                    </LeftSideBar>
                </Col>
                {!isMobileMenuVisible && !isBetSlipsVisible &&
                    <Col span={24} xs={24} sm={24} md={19}>
                        <header className="root-content">
                            {connected ? "" : "Please connect your wallet"}
                            <br />
                            <br />
                            <Button onClick={() => callUSDTFaucet()}>
                                Get 10 USDT
                            </Button>
                            <br />
                            <br />
                            <Input placeholder="Enter a Solana public key to inspect the account." value={inspectPubkey} onChange={event => { tryInspect(event.currentTarget.value) }} style={{ width: "40%" }} />
                            <pre>
                                {inspectAccount}
                            </pre>
                        </header>
                        <Layout>
                        </Layout>
                    </Col>
                }
            </Row>
        </Layout>
    )
}