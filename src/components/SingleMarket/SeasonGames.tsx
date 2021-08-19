import { SingleMatchComponent } from "./SingleMatchComponent"
import { Collapse, Divider, Col, Row } from "antd";
import { SeasonName } from "./SeasonName";
import { Market, Season } from "../../constants";
import { Fragment } from "react";
import { OddsType } from './OddsType';
const { Panel } = Collapse;
export const SeasonGames = (props: { season: Season, search: string }) => {
  return (
    <div className="single-market">
      <Row>
        <Col span={24}>
          <Collapse defaultActiveKey={"1"} accordion={true} style={{ display: "grid" }} ghost={true} expandIconPosition="right">
            <Panel header={<SeasonName name={props.season.season.seasonName} matches={props.season.markets.length} />} key="1">
              {props.season.markets.length > 0 &&
                <OddsType />
              }
              {props.season.markets.map((value: Market, index: number) => {
                if(value.teamA.concat(value.teamB).toLowerCase().includes(props.search.toLowerCase())) {
                  return (
                    <Fragment key={value.marketId}>
                      <SingleMatchComponent market={value} />
                      <Divider style={{ color: "gray" }} />
                    </Fragment>
                  )
                }
              }      
              )}
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </div>
  )
};
