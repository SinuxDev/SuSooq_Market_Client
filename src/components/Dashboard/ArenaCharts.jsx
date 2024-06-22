import { AreaChart, Card, Title } from "@tremor/react";
import UseElementSize from "../../hooks/UseElementSize";

import PropTypes from "prop-types";
import { useState, useEffect } from "react";

// Data To Show in Chart | Limit Date [At least One Week] | Filter Data [Products in last week (per day)]
// [date: "Jan 22"(format) , Products: productCount]

const ArenaCharts = ({ products }) => {
  const [ref, size] = UseElementSize();
  const [chartdata, setChartData] = useState([]);

  useEffect(() => {
    // Get Date from last week
    const CurrentDate = new Date(); // Current Date
    const lastWeekDate = new Date(); // Last Week Date
    lastWeekDate.setDate(CurrentDate.getDate() - 7); // Set Last Week Date

    // Calculate the product count for each day in the last week
    const dailyProductCount = {};
    products.forEach((product) => {
      const productSellDate = new Date(product.createdAt);

      if (productSellDate >= lastWeekDate && productSellDate <= CurrentDate) {
        const dateKey = productSellDate.toISOString().split("T")[0];

        if (!dailyProductCount[dateKey]) {
          dailyProductCount[dateKey] = 0;
        }

        dailyProductCount[dateKey] += 1;
      }
    });

    // Convert dailyProductCount to chart data
    const chartData = Object.keys(dailyProductCount).map((date) => ({
      date: date.split("T")[0].split("-").slice(1).join("-"),
      Products: dailyProductCount[date],
    }));

    setChartData(chartData);
  }, [products]);

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
            yAxisWidth={60}
          />
        </Card>
      )}
    </div>
  );
};

ArenaCharts.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ArenaCharts;
