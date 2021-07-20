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
    columnStyle: {
        fill: "l(270) 0:#7c01ff 1:#00d77d",
        lineOpacity: 0.2
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
