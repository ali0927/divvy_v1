import { SingleMatchComponent } from "./SingleMatchComponent"
import { Collapse, Divider, Col, Row } from "antd";
import { SeasonName } from "./SeasonName";
import { Game, Season } from "../../constants";
const { Panel } = Collapse;
export const SeasonGames = (props: { season: Season }) => {
    return (
        <div className="single-market">
            <Row>
                <Col span={24}>
                    <Collapse defaultActiveKey={"1"} accordion={true} style={{ display: "grid" }} ghost={true} expandIconPosition="right">
                        <Panel header={<SeasonName name={props.season.season.seasonName} matches={props.season.games.length} />} key="1">
                            {props.season.games.map((value: Game, index: number) => (
                                <>
                                    <SingleMatchComponent game={value} />
                                    <Divider style={{ color: "gray" }} />
                                </>
                            ))}
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </div>
    )
};
