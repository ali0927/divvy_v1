import { SingleMatchComponent } from "./SingleMatchComponent"
import { Collapse, Divider, Col, Row } from "antd";
import { SeasonName } from "./SeasonName";
import { Market, Season } from "../../constants";
import { Fragment } from "react";
const { Panel } = Collapse;
export const SeasonGames = (props: { season: Season }) => {
  return (
    <div className="single-market">
      <Row>
        <Col span={24}>
          <Collapse defaultActiveKey={"1"} accordion={true} style={{ display: "grid" }} ghost={true} expandIconPosition="right">
            <Panel header={<SeasonName name={props.season.season.seasonName} matches={props.season.markets.length} />} key="1">
              {props.season.markets.map((value: Market, index: number) => (
                <Fragment key={value.marketId}>
                  <SingleMatchComponent market={value} />
                  <Divider style={{ color: "gray" }} />
                </Fragment>
              ))}
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </div>
  )
};
