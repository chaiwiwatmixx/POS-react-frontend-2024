import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarChartStat = ({ data, label, calendar }) => {
  const { dailySales } = useSelector((state) => state.stat);
  console.log("dailySales = ", dailySales);

  // formatDate
  const formatDate = (data) => {
    return data.map((item) => {
      if (item && item["date"]) {
        return {
          ...item,
          date: item["date"].split("-")[2],
          totalAmount: parseFloat(item["totalAmount"]),
        };
      } else {
        return item;
      }
    });
  };
  const chartData = calendar === "daily" ? formatDate(dailySales) : dailySales;

  //
  const dataKey =
    calendar === "daily"
      ? "date"
      : calendar === "weekly"
      ? "week"
      : calendar === "monthly"
      ? "month"
      : calendar === "yearly"
      ? "year"
      : "";

  return (
    <div className="col-span-12 lg:col-span-8 xl:col-span-6 mt-2">
      <div className="intro-y block sm:flex items-center h-10">
        <h2 className="text-lg font-medium truncate mr-5">
          Sales statistics by time period
        </h2>
      </div>
      <div className="report-box-2 intro-y mt-12 sm:mt-5">
        <div className="box sm:flex">
          <BarChart
            width={500}
            height={415}
            data={chartData} // input data
            margin={{
              top: 5,
              // right: 30,
              // left: 20,
              bottom: 5,
            }}
            barSize={10}
          >
            <XAxis
              dataKey={dataKey} // lable
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey={data} // Compare data
              name={`${label} in the last ${chartData.length} ${calendar}`}
              fill="#8884d8"
              background={{ fill: "#eee" }}
            />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default BarChartStat;
