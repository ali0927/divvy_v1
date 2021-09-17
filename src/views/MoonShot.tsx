import {Col, Row} from "antd";
import BetsTable from "../components/Games/BetsTable";
import PlaceBet from "../components/Games/PlaceBet";

export const MoonShot = () => {
    return (
        <Row>
            <Col md={8} xs={24}>
            </Col>
            <Col md={8} xs={24}>
                <PlaceBet />
            </Col>
            <Col md={8} xs={24}>
                <BetsTable />
            </Col>
        </Row>
    )
}
