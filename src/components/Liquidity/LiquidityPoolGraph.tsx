import { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import { LineConfig } from "@ant-design/charts/es/plots/line";
import { Pool, PoolGraph } from '../../constants';
import { DATE_STRING_TO_NUMBER } from '../../constants/DashboardColumns';
export const LiquidityPoolGraph = (props: { data : Array<Pool> | undefined }) => {
  const [chartData, setChartData] = useState<PoolGraph[]>([])
  useEffect(() => {
    console.log(props.data)
    if(props.data) {
      let tmp : PoolGraph[] = [];
      props.data.map(item => {
        let d = (new Date(JSON.parse(item?.day))).toString();
        let tmpArr = [];
        tmpArr = d.split(" ")
        tmp.push({ "date": tmpArr[2]+"/"+(DATE_STRING_TO_NUMBER as any)[tmpArr[1]]+"/"+tmpArr[3], "performance": item?.earning })
      })
      console.log(tmp)
      setChartData([ ...tmp ]);
    } 
  }, [props.data])

  var config: LineConfig = {
    data: chartData,
    xField: "date",
    yField: "performance",
    lineStyle: {
      stroke: 'l(270) 0:#7c01ff 1:#00d77d',
      fillOpacity: 0.5,
      cursor: 'pointer'
    },
    point: {
      size: 5,
      shape: 'circle',
      style: {
        fill: 'white',
        stroke: '#2593fc',
        lineWidth: 2,
      },
    },
    
  };

  return (
    <Line
      {...config}
    />
  );
};
