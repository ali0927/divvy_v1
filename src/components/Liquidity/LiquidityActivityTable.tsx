import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Transactions, TransactionsTable } from '../../constants';
import { LIQUIDITY_ACTIVITY_COLUMNS } from '../../constants/LiquidityColumns';
import { DIVVY_WEBSOCKET_API } from "../../constants/urls";

const client = new W3CWebSocket(DIVVY_WEBSOCKET_API);

export const LiquidityActivityTable = (props: { transactions : Array<Transactions> | null | undefined }) => {
  const [data, setData] = useState<object[]>([])
  useEffect(() => {
    let tmpArr : TransactionsTable[] = [];
    if(props.transactions) {
      props.transactions.map(item => {
        tmpArr.push({
          key: item.id ? item.id : 0,
          type: item.type,
          pubkey: (item.pubkey && item.pubkey?.substr(0, item.pubkey?.length/2))+"<br />"+(item.pubkey && item.pubkey?.substr(item.pubkey?.length/2+1)),
          match: item.match,
          odds: item.odds_type+" <br />"+(item.odds && item.odds.includes('-') ? item.odds : "+"+item.odds),
          amount: item.amount+" D <br />Pending"
        })
      })
      setData(tmpArr);
    }
  }, [props.transactions])
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