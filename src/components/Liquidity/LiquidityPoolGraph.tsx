import { Line } from '@ant-design/charts';
import { LineConfig } from "@ant-design/charts/es/plots/line";
export const LiquidityPoolGraph: React.FC = () => {
  const data = [
    {
        month: 'January',
        performance: 38,
    },
    {
        month: 'February',
        performance: 52,
    },
    {
        month: 'March',
        performance: 6,
    },
    {
        month: 'April',
        performance: 145,
    },
    {
        month: 'May',
        performance: 48,
    },
    {
        month: 'June',
        performance: -48,
    },
    {
        month: 'July',
        performance: 25,
    },
    {
        month: 'August',
        performance: -69,
    },
    {
        month: 'September',
        performance: 31,
    },
    {
        month: 'October',
        performance: 17,
    },
    {
        month: 'November',
        performance: -30,
    },
    {
        month: 'December',
        performance: 38,
    },
  ];

  var config: LineConfig = {
    data: data,
    xField: "month",
    yField: "performance",
    // annotations: [
    //   {
    //     type: 'regionFilter',
    //     start: ['max', 0],
    //     end: [0, 'min'],
    //     color: "l(270) 0:#f20600 1:#7c01ff",
    //   },
    // ],
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
