import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopReportUntil from "../../util/stat/TopReportUntil";
import RigthStat from "./general-report/RigthStat";
import DayPicker from "./general-report/calendar/DayPicker";
import WeekPicker from "./general-report/calendar/WeekPicker";
import MonthPicker from "./general-report/calendar/MonthPicker";
import YearPicker from "./general-report/calendar/YearPicker";

const GeneralReport = ({ startDate, setStartDate, calendar, setCalendar }) => {
  const dispatch = useDispatch();
  // get stat dailySales from redux db
  const { dailySales, dailyFoodStat } = useSelector((state) => state.stat);

  // split stat last and previous
  const lastDaySales = TopReportUntil.LastOrPrevious("Last", dailySales);
  const previosDaySales = TopReportUntil.LastOrPrevious("Pre", dailySales);
  const difference = TopReportUntil.difference(previosDaySales, lastDaySales);

  // rigth stat
  // todayBills
  const todayBills = (stat) =>
    String(stat.length > 0 ? stat[stat.length - 1].totalOrders : "0");

  // AVERAGE
  const avg = (stat, target) => {
    let sum;
    if (target === "bill") {
      sum = stat.reduce((total, item) => total + item.totalOrders, 0);
    } else {
      sum = stat.reduce((total, item) => total + Number(item.totalAmount), 0);
    }
    return (sum / stat.length).toFixed(2);
  };

  // best food
  const bestFood = dailyFoodStat.length > 0 ? dailyFoodStat[0].productName : "";

  return (
    <div className="col-span-12 lg:col-span-8 xl:col-span-6 mt-2">
      <div className="intro-y block sm:flex items-center h-10">
        <h2 className="text-lg font-medium truncate mr-5">General Report</h2>
        {/* calendar */}
        <div className="sm:ml-auto">
          {calendar === "daily" ? (
            <DayPicker startDate={startDate} setStartDate={setStartDate} />
          ) : calendar === "weekly" ? (
            <WeekPicker />
          ) : calendar === "monthly" ? (
            <MonthPicker />
          ) : calendar === "yearly" ? (
            <YearPicker />
          ) : (
            ""
          )}
        </div>

        {/* select calendar */}
        <select
          value={calendar}
          onChange={(e) => setCalendar(e.target.value)}
          className="sm:ml-auto mt-3 sm:mt-0 sm:w-auto form-select box"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div className="report-box-2 intro-y mt-12 sm:mt-5">
        {/* left section */}
        <div className="box sm:flex">
          <div className="px-8 py-12 flex flex-col justify-center flex-1">
            <i data-feather="shopping-bag" className="w-10 h-10 text-theme-12"></i>
            <div className="relative text-3xl font-bold mt-12 pl-4">
              {lastDaySales} ฿
            </div>
            <div
              className="report-box-2__indicator bg-theme-9 tooltip cursor-pointer"
              title="47% Higher than last month"
            >
              {difference ? `${difference}` : "0"}%{" "}
              <i data-feather="chevron-up" className="w-4 h-4 ml-0.5"></i>{" "}
            </div>
            <div className="mt-4 text-gray-600 dark:text-gray-600">
              Today's sales.
            </div>
          </div>
          <div className="px-8 py-12 flex flex-col justify-center flex-1 border-t sm:border-t-0 sm:border-l border-gray-300 dark:border-dark-5 border-dashed">
            {/* rigth section */}
            <RigthStat
              todayBill={todayBills(dailySales)}
              label="TODAYS BILLS"
            />
            <RigthStat
              avgBill={avg(dailySales, "bill")}
              label="AVERAGE BILLS PER DAY"
            />
            <RigthStat
              avgRevenue={avg(dailySales, "revenue")}
              label="AVERAGE DAILY REVENUE"
            />
            <RigthStat bestFood={bestFood} label="BEST SELLING FOODS" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralReport;
