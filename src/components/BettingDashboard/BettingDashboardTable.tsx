import { Table} from 'antd';
import { DASHBOARD_DATA, DATE_STRING_TO_NUMBER } from "../../constants/DashboardColumns";

export const BettingDashboardTable = (props: { sortBy: string, sortedInfo: any, filteredInfo: any, setSortedInfo: any, setFilteredInfo: any }) => {
    const handleChange = (pagination: any, filters: any, sorter: any) => {
        console.log(filters);
        props.setSortedInfo(sorter);
        props.setFilteredInfo(filters);
    }
    const convertToDate = (date : string) : any=> {
        let dateArr = date.replace("<br />at", '').split(' ');
        console.log(new Date(JSON.parse(dateArr[2]), (DATE_STRING_TO_NUMBER as any)[dateArr[0]], JSON.parse(dateArr[1].replace('th', '')), JSON.parse(dateArr[3].split(':')[0]), JSON.parse(dateArr[3].split(':')[1]), 0));
        return new Date(JSON.parse(dateArr[2]), (DATE_STRING_TO_NUMBER as any)[dateArr[0]], JSON.parse(dateArr[1].replace('th', '')), JSON.parse(dateArr[3].split(':')[0]), JSON.parse(dateArr[3].split(':')[1]), 0);
    }

    const DASHBOARD_COLUMNS = [
        {
          title: 'TYPE',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'MATCH',
          dataIndex: 'match',
          key: 'match',
          render: (html : any) => <div className="text-table" dangerouslySetInnerHTML={{__html: html}} />
        },
        {
          title: "SPORT",
          dataIndex: "sport",
          key: 'sport',
          filters: [
              { text: 'All Bets', value: '' },
              { text: 'Football', value: 'Football' },
              { text: 'Baseball', value: 'Baseball' }
          ],
          filteredValue: props.filteredInfo.sport || null,
          onFilter: (value : any, record : any) => record.sport.includes(value),
        },
        {
          title: 'PLACED ON',
          dataIndex: 'placed',
          key: 'placed',
          render: (html : any) => <div className="text-table" style={{ textAlign: "right" }} dangerouslySetInnerHTML={{__html: html}} />,
          sorter: {
            compare: (a: any, b: any) => convertToDate(a.placed)-convertToDate(b.placed)
          },
          sortOrder: props.sortedInfo.columnKey === 'placed' && props.sortedInfo.order,
        },
        {
          title: 'SETTLED ON',
          dataIndex: 'settled',
          key: 'settled',
          render: (html : any) => <div className="text-table" style={{ textAlign: "right" }} dangerouslySetInnerHTML={{__html: html}} />
        },
        {
          title: "ODDS",
          dataIndex: "odds",
          key: "odds",
          render: (html : any) => <div className="text-table" style={{ textAlign: "right" }} dangerouslySetInnerHTML={{__html: html}} />
        },
        {
          title: "ORIGINAL BET",
          dataIndex: "original",
          key: "original",
          render: (html : any) => <div className="text-table" style={{ textAlign: "right" }} dangerouslySetInnerHTML={{__html: html}} />
        },
        {
          title: "POTENTIAL WIN",
          dataIndex: "potential",
          key: "potential",
          sorter: {
              compare: (a: any, b: any) => JSON.parse(a.potential.split(' USDT')[0].replace(',', ''))-JSON.parse(b.potential.split(' USDT')[0].replace(',', ''))
          },
          sortOrder: props.sortedInfo.columnKey === 'potential' && props.sortedInfo.order,
        }
    ];

    return (
        <Table 
            columns={DASHBOARD_COLUMNS} 
            dataSource={DASHBOARD_DATA} 
            className={"pool-activity-table"} 
            onChange={handleChange}
        />
    );
};