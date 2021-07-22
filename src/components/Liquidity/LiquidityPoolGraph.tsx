import { Column } from '@ant-design/charts';

export const LiquidityPoolGraph = () => {
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
        performance: -6,
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

  const config = {
    data,
    xField: 'month',
    yField: 'performance',
    seriesField: '',
    color: function color(_ref : any) {
      var type = _ref.month;
      if(type === "November" || type === "August" || type === "June") {
        return "l(270) 0:#f20600 1:#7c01ff"; 
      }
      return "l(270) 0:#7c01ff 1:#00d77d";
    },
    meta: {
      month: { alias: 'Month' },
      performance: { alias: 'Performance' },
    },
  };

  return (
    <Column
      {...config}
      onReady={(plot) => {
        plot.on('plot:click', (evt: any) => {
          const { x, y } = evt;
          const tooltipData = plot.chart.getTooltipItems({ x, y });
          console.log(tooltipData);
        });
      }}
    />
  );
};
