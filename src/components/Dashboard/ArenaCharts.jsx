import { AreaChart, Card, Title } from "@tremor/react";
import UseElementSize from "../../hooks/UseElementSize";

const chartdata = [
  {
    date: "Jan 22",
    Products: 2890,
  },
  {
    date: "Feb 22",
    Products: 2756,
  },
  {
    date: "Mar 22",
    Products: 3322,
  },
  {
    date: "Apr 22",
    Products: 3470,
  },
  {
    date: "May 22",
    Products: 3475,
  },
  {
    date: "Jun 22",
    Products: 3129,
  },
  {
    date: "Jul 22",
    Products: 3490,
  },
  {
    date: "Aug 22",
    Products: 2903,
  },
  {
    date: "Sep 22",
    Products: 2643,
  },
  {
    date: "Oct 22",
    Products: 2837,
  },
  {
    date: "Nov 22",
    Products: 2954,
  },
  {
    date: "Dec 22",
    Products: 5000,
  },
];

const valueFormatter = (number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

const ArenaCharts = () => {
  const [ref, size] = UseElementSize();

  return (
    <div ref={ref} className="w-full h-full min-w-[300px] min-h-[300px]">
      {size.width > 0 && size.height > 0 && (
        <Card>
          <Title className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            Product Sales Overview
          </Title>
          <AreaChart
            className="mt-1 h-72"
            data={chartdata}
            index="date"
            categories={["Products"]}
            colors={["indigo"]}
            valueFormatter={valueFormatter}
            yAxisWidth={60}
          />
        </Card>
      )}
    </div>
  );
};

export default ArenaCharts;
