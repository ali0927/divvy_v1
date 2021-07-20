import { Table} from 'antd';
export const LiquidityActivityTable = () => {

    const columns = [
        {
          title: 'Activity Type',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'Username/User ID',
          dataIndex: 'user',
          key: 'user',
          render: (text: string) => <div>{text.substr(0, text.length/2)}<br />{text.substr(text.length/2+1)}</div>
        },
        {
          title: 'Match',
          dataIndex: 'match',
          key: 'match',
          render: (html : any) => <div style={{ textAlign: "right" }} dangerouslySetInnerHTML={{__html: html}} />
        },
        {
          title: 'Odds',
          dataIndex: 'odds',
          key: 'odds',
          render: (html : any) => <div style={{ textAlign: "right" }} dangerouslySetInnerHTML={{__html: html}} />
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
          render: (html : any) => <div style={{ textAlign: "right" }} dangerouslySetInnerHTML={{__html: html}} />
        }
    ]

    const data = [
        {
          key: '1',
          type: 'Bet Submitter',
          user: "0x000aabbee60667e9ba7935b841131a6945572c7b",
          match: '<b>Cashpoint SCR Altach</b> <br />WSG Swarowski',
          odds: "Money Line <br /> +725",
          amount: "0,000 D <br />Pending"
        },
        {
          key: '2',
          type: 'Deposit',
          user: "0x000aabbee60667e9ba7935b841131a6945572c7b",
          match: '',
          odds: "Money Line <br /> +725",
          amount: "0,000 D <br />Pending"
        },
      ];

    return (
        <Table 
            columns={columns} 
            dataSource={data} 
            className={"pool-activity-table"} 
        />
    );
};