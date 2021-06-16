import React, { useState } from 'react';
import { Input, Button, Col, Row } from 'antd'
import { SearchOutlined } from "@ant-design/icons"
import { TeamDetails } from "./TeamDetails"
import { OddsSelection } from './OddsSelection';
import { OddsType } from './OddsType';
import { Game } from '../../constants';
export const SingleMatchComponent = (props: { game: Game, setbetSlips: any }) => {
    return (
        <div className="single-match">
            <Row>
                <Col span={24}>
                    <OddsType />
                </Col>
                <Col span={24}>
                    <Row>
                        <Col span={4}>
                            <TeamDetails name={props.game.teamA.name} logo={props.game.teamA.logo} />
                        </Col>
                        <Col span={20} md={10}>
                            <OddsSelection odds={props.game.teamAodds} setbetSlips={props.setbetSlips} game={props.game} selection={props.game.teamA} otherteam={props.game.teamB} />
                        </Col>
                        <Col span={0} md={3}>
                        </Col>
                    </Row>
                </Col>
                <Col span={0} md={2}>
                </Col>
                <Col span={24} md={22}>
                    <p className="text-secondary" style={{ marginTop: -4, marginBottom: -5, fontSize: "0.7em" }}>Versus</p>
                </Col>
                <Col span={24}>
                    <Row>
                        <Col span={4}>
                            <TeamDetails name={props.game.teamB.name} logo={props.game.teamB.logo} />
                        </Col>
                        <Col span={20} md={10}>
                            <OddsSelection odds={props.game.teamBodds} setbetSlips={props.setbetSlips} game={props.game} selection={props.game.teamB} otherteam={props.game.teamA} />
                        </Col>
                        <Col span={0} md={3}>
                            <div style={{ marginLeft: "5%", marginTop: "-20%", textAlign: "center", fontSize: "1em" }}>
                                {props.game.date}<br />{props.game.time + " EDT"}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};
