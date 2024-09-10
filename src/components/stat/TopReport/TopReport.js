import React, { useEffect, useState } from "react";
import Box from "./Box";
import { useDispatch, useSelector } from "react-redux";
import { getStatDaily } from "../../../redux/statState";
import TopReportUntil from "../../../util/stat/TopReportUntil";

const TopReport = () => {
  const dispatch = useDispatch();
  // get stat dailySales from redux db
  const { dailySales } = useSelector((state) => state.stat);
  // split stat last and previous
  const lastDay = TopReportUntil.LastOrPrevious("Last", dailySales);
  const previosDay = TopReportUntil.LastOrPrevious("Pre", dailySales);
  const difference = TopReportUntil.difference(previosDay, lastDay);

  return (
    <div className="col-span-12 mt-8">
      <div className="intro-y flex items-center h-10">
        <h2 className="text-lg font-medium truncate mr-5">Report by time period</h2>
        <a
          href=""
          className="ml-auto flex items-center text-theme-1 dark:text-theme-10"
        >
          {" "}
          <i data-feather="refresh-ccw" className="w-4 h-4 mr-3"></i> Reload Data{" "}
        </a>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <Box
          statDailySales={lastDay}
          difference={difference}
          label="Daily sales"
        />
        <Box totalSales="5000.00" label="Weekly Sales" difference="33" />
        <Box totalSales="5000.00" label="Monthly sales" difference="33" />
        <Box totalSales="5000.00" label="Annual sales" difference="33" />
      </div>
    </div>
  );
};

export default TopReport;
