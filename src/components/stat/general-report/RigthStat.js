import React from "react";

const RigthStat = ({ todayBill, avgBill, avgRevenue, bestFood, label }) => {
  let showData =
    label === "TODAYS BILLS"
      ? todayBill
      : label === "AVERAGE BILLS PER DAY"
      ? avgBill
      : label === "AVERAGE DAILY REVENUE"
      ? avgRevenue
      : label === "BEST SELLING FOODS"
      ? bestFood
      : "";

  return (
    <>
      <div className="text-gray-600 dark:text-gray-600 text-xs mt-5">{label}</div>
      <div className="mt-1.5 flex items-center">
        <div className="text-base">{showData}</div>
      </div>
    </>
  );
};

export default RigthStat;
