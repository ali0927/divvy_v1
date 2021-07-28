import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { LIQUIDITY_ACTIVITY_COLUMNS } from '../../constants/LiquidityColumns';
import { DIVVY_WEBSOCKET_API } from "../../constants/urls";

const client = new W3CWebSocket(DIVVY_WEBSOCKET_API);

export const LiquidityActivityTable = () => {
  const [data, setData] = useState<object[]>([])
  client.onopen = () => {
    console.log('WebSocket Client Connected');
  };
  client.onmessage = (message) => {
    console.log("Received transaction")
    let place = JSON.parse(message.data.toString())
    place['key'] = String(data.length);
    setData([place, ...data]);
  };
  client.onclose = (message) =>  {
    console.log("closed");
    console.log(message)
  }

  return (
    <Table
      columns={LIQUIDITY_ACTIVITY_COLUMNS}
      dataSource={data}
      className={"pool-activity-table"}
    />
  );
};