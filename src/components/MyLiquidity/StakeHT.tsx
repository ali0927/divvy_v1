import { Form, Input, Button } from "antd";
export const StakeHT = () => {

    return (
        <div className="sidebar-section">
            <h3>Stake your House Tokens</h3>
            <div className="balance-container">
                <p>
                    <small className="text-secondary">House Token Balance</small>
                </p>
                <p className="balance">0.00 HT</p>
            </div>
            <Form.Item
                name="usdtAmount"
                rules={[{ required: true, message: "Please input the USDT amount." }]}>
                <Input.Group compact>
                    <Input placeholder={"House Token"} min="0" style={{width:"75%"}} disabled={true}/>
                    <Button style={{border: "1px solid rgb(67, 67, 67)" }} disabled={true}>MAX</Button>
                </Input.Group>
            </Form.Item>

            <Button type="primary" htmlType="submit">
                Stake
            </Button>
        </div >
    );
};
