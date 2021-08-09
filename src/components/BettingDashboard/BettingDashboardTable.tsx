import { useState, useEffect } from 'react';
import { Table} from 'antd';
import { DATE_STRING_TO_NUMBER } from "../../constants/DashboardColumns";
import { BetStatus, BetsTable } from "../../constants/bets";
import { useGetBetsQuery } from "../../store/getBets";
import { useWallet } from "../../contexts/sol/wallet";
import { LAMPORTS_PER_USDT } from "../../constants/math";

export const BettingDashboardTable = (props: { sortBy: string, sortedInfo: any, filteredInfo: any, setSortedInfo: any, setFilteredInfo: any }) => {
    const wallet = useWallet();  
    const { data, error, isLoading } = useGetBetsQuery(wallet?.publicKey?.toString());
    const [betData, setBetData] = useState<BetsTable[]>([]);
    useEffect(() => {
      let tmpArr: BetsTable[] = [];
      data?.map((bet: any, i: number) => {
        tmpArr.push({
          key: i,
          type: 'Single',
          match: bet["match"],
          sport: bet["sport"],
          placed: bet["placedOn"],
          settled: BetStatus[bet["status"]].toLowerCase(),
          odds: bet["betType"]+'<br />'+(bet["odds"] < 0 ? "" : "+")+bet["odds"],
          original: '<b>'+bet["risk"]/LAMPORTS_PER_USDT+' USDT</b>',
          potential: bet["payout"]/LAMPORTS_PER_USDT+' USDT'
        })
      })
      setBetData(tmpArr);
    }, [data])
    const handleChange = (pagination: any, filters: any, sorter: any) => {
        props.setSortedInfo(sorter);
        props.setFilteredInfo(filters);
    }
    const convertToDate = (date : string) : any=> {
        let dateArr = date.replace("<br />at", '').split(' ');
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
            dataSource={betData} 
            className={"pool-activity-table"} 
            onChange={handleChange}
        />
    );
};