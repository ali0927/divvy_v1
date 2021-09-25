import {Col, Row} from "antd";
import BetsTable from "../../../components/Games/MoonShot/BetsTable";
import PlaceBet from "../../../components/Games/MoonShot/PlaceBet";
import {MultiplierGraph} from "../../../components/Games/MoonShot/MultiplierGraph";

export const MoonShot = () => {
    return (
        <Row style={{height: "100vh"}}>
            <Col md={6} xs={24}>
            </Col>
            <Col md={12} xs={24}>
                <div className={"flex-vertical-full"}>
                    <div className={"center-child-flex"}>
                        <MultiplierGraph />
                    </div>
                    <div className={"center-child-flex"}>
                        <PlaceBet />
                    </div>
                </div>
            </Col>
            <Col md={6} xs={24}>
                <BetsTable />
            </Col>
        </Row>
    )
}
