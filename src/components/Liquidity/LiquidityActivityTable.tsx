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
    console.log(message)
    let place = JSON.parse(message.data.toString())
    place['key'] = String(data.length);
    setData([place, ...data]);
  };
  // const data = [
  //   {
  //     key: '1',
  //     type: 'Bet Submitter',
  //     user: "0x000aabbee60667e9ba7935b841131a6945572c7b",
  //     match: '<b>Cashpoint SCR Altach</b> <br />WSG Swarowski',
  //     odds: "Money Line <br /> +725",
  //     amount: "0,000 D <br />Pending"
  //   },
  //   {
  //     key: '2',
  //     type: 'Deposit',
  //     user: "0x000aabbee60667e9ba7935b841131a6945572c7b",
  //     match: '',
  //     odds: "Money Line <br /> +725",
  //     amount: "0,000 D <br />Pending"
  //   },
  // ];

  return (
    <Table
      columns={LIQUIDITY_ACTIVITY_COLUMNS}
      dataSource={data}
      className={"pool-activity-table"}
    />
  );
};