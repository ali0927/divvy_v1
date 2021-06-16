import { PicRightOutlined, CloseOutlined } from "@ant-design/icons";
import { Badge, Button, Menu, Modal } from 'antd';
import { Bet } from "../../../constants/bets";
export const MobileBetSlip = (props: { isBetSlipsVisible: boolean, setBetSlipsVisible: any, betSlips: Array<Bet> }) => {
    return (
        <Button style={{ backgroundColor: "transparent", borderColor: "transparent", borderWidth: 0, padding: 0, width: "100%", height: "100%" }} onClick={() => props.setBetSlipsVisible(!props.isBetSlipsVisible)}>
            {props.isBetSlipsVisible ? <CloseOutlined /> :
                <Badge style={{ backgroundColor: "#7c01ff" }} size="default" count={props.betSlips.length}>
                    <PicRightOutlined />
                </Badge>
            }
            <br />
            Bet Slips
        </Button>
    );
};
