import {Button, Form, Input} from "antd";
import { Bet } from "../../models/games/moonshot/bets";
import { useStoreBetsMutation } from "../../store/games/moonshot/storeBet";

const PlaceBet = () => {
    const [storeBets, { isLoading: isUpdating }] = useStoreBetsMutation();
    const onFinish = async (values: any) => {
        let bet: Bet = {
            "bet": JSON.parse(values.bet),
            "userPubkey": "temp",
            "payout": JSON.parse(values.payout),
            "status": 0,
            "placedOn": (new Date()).toUTCString()
        }
        const res = await storeBets(bet);
        if("data" in res) {
            if(res.data?.success) {
                alert("Bet added successfully")
            } else {
                console.log("Bet adding failed");
            }
        }
    }
    return (
        <Form name="control-hooks" onFinish={onFinish}>
            <Form.Item name="bet" label="Bet">
                <Input />
            </Form.Item>
            <Form.Item name="payout" label="Payout">
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isUpdating}>
                    Place Bet
                </Button>
            </Form.Item>
        </Form>
    )
}
export default PlaceBet;
