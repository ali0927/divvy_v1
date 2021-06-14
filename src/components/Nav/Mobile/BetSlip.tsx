import { PicRightOutlined, CloseOutlined } from "@ant-design/icons";
import { Badge, Button, Menu, Modal } from 'antd';
import { BetSlip } from "../../../constants/bets";
export const MobileBetSlip = (props: { isBetSlipsVisible: boolean, setBetSlipsVisible: any, betSlips: Array<BetSlip> }) => {
    return (
        <Button style={{ backgroundColor: "transparent", borderColor: "transparent", borderWidth: 0, padding: 0, width: "100%", height: "100%" }} onClick={() => props.setBetSlipsVisible(!props.isBetSlipsVisible)}>
            {props.isBetSlipsVisible ? <CloseOutlined /> :
                <Badge size="default" count={props.betSlips.length}>
                    <PicRightOutlined />
                </Badge>
            }
            <br />
            Bet Slips
        </Button>
    );
};
