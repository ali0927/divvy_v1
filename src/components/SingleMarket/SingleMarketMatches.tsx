import React from "react";
import { SingleMatchComponent } from "./SingleMatchComponent"
import { Collapse, Divider, Col, Row } from "antd";
import { GameName } from "./GameName";
import { Game } from "../../constants";
const { Panel } = Collapse;
export const SingleMarketMatches = (props: { games: Array<Game>, setbetSlips: any }) => {
    return (
        <div className="single-market">
            <Row>
                <Col span={24}>
                    <Collapse defaultActiveKey={"1"} accordion={true} style={{ display: "grid" }} ghost={true} expandIconPosition="right">
                        <Panel header={<GameName matches={props.games.length} />} key="1">
                            {props.games.map((value: Game, index: number) => {
                                return (
                                    <>
                                        <SingleMatchComponent game={value} setbetSlips={props.setbetSlips} />
                                        <Divider style={{ color: "gray" }} />
                                    </>
                                )
                            })}
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </div>
    )
};
