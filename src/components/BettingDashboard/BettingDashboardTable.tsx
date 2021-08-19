import { useState, useEffect } from 'react';
import { Table} from 'antd';
import { DATE_STRING_TO_NUMBER } from "../../constants/DashboardColumns";
import { BetStatus, BetsTable } from "../../constants/bets";
import { useGetBetsQuery } from "../../store/getBets";
import { useWallet } from "../../contexts/sol/wallet";
import { americanToDecimal, LAMPORTS_PER_USDC } from "../../constants/math";

export const BettingDashboardTable = (props: { sortBy: string, sortedInfo: any, filteredInfo: any, setSortedInfo: any, setFilteredInfo: any }) => {
    const wallet = useWallet();  
    const { data, error, isLoading } = useGetBetsQuery(wallet?.publicKey?.toString());
    const [betData, setBetData] = useState<BetsTable[]>([]);
    useEffect(() => {
      let tmpArr: BetsTable[] = [];
      console.log(data)
      data?.map((bet: any, i: number) => {
        tmpArr.push({
          key: i,
          type: 'Single',
          match: bet["match"],
          sport: bet["sportName"],
          placed: bet["placedOn"].split(" "),
          settled: BetStatus[bet["status"]].toLowerCase(),
          odds: bet["betType"]+'<br />'+(bet["odds"] < 0 ? "" : "+")+americanToDecimal(bet["odds"]),
          original: '<b>'+bet["risk"]/LAMPORTS_PER_USDC+' USDC</b>',
          potential: bet["payout"]/LAMPORTS_PER_USDC+' USDC'
        })
      })
      setBetData(tmpArr);
    }, [data])
    const handleChange = (pagination: any, filters: any, sorter: any) => {
        props.setSortedInfo(sorter);
        props.setFilteredInfo(filters);
    }
    const convertToDate = (date : String[]) : any => {
        let parsedDate =  Date.parse(date.slice(0, 5).join())
        // console.log(parsedDate)
        return parsedDate;
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
          render: (date : String[]) => <div className="text-table" style={{ textAlign: "right" }}>{date[1]} {date[2]} <br />at {date[4].split(":")[0]+":"+date[4].split(":")[1] + (JSON.parse(date[4].split(":")[0]) >= 12 ? " PM" : " AM")}</div>,
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
              compare: (a: any, b: any) => JSON.parse(a.potential.split(' USDC')[0].replace(',', ''))-JSON.parse(b.potential.split(' USDC')[0].replace(',', ''))
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