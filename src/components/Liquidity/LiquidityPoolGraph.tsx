import { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import { LineConfig } from "@ant-design/charts/es/plots/line";
import { Pool, PoolGraph } from '../../constants';
import { DATE_STRING_TO_NUMBER } from '../../constants/DashboardColumns';

const LiquidityPoolGraph = (props: { data : Array<Pool> | undefined, poolPerformance: number }) => {
  const [chartData, setChartData] = useState<PoolGraph[]>([])
  useEffect(() => {
    if(props.data) {
      let tmp : PoolGraph[] = [];
      props.data.map(item => {
        let d = (new Date(JSON.parse(item?.day))).toString();
        let tmpArr = [];
        tmpArr = d.split(" ")
        tmp.push({ "date": tmpArr[2]+"/"+(DATE_STRING_TO_NUMBER as any)[tmpArr[1]]+"/"+tmpArr[3], "performance": props.poolPerformance == 1 ? item?.earning : props.poolPerformance == 0 ? item?.balance : item?.volume })
      })
      setChartData([ ...tmp ]);
    } 
  }, [props.data, props.poolPerformance])

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
    <Line {...config} /> 
  );
};
export default LiquidityPoolGraph;
