import React from "react";
import { useSelector } from "react-redux";

const Box = ({ statDailySales, difference, label }) => {
  return (
    <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
      <div className="report-box zoom-in">
        <div className="box p-5">
          <div className="flex">
            <i
              data-feather="shopping-cart"
              className="report-box__icon text-theme-10"
            ></i>
            <div className="ml-auto">
              <div
                className="report-box__indicator bg-theme-9 tooltip cursor-pointer"
                title="33% Higher than last month"
              >
                {" "}
                {difference}% <i data-feather="chevron-up" className="w-4 h-4 ml-0.5"></i>{" "}
              </div>
            </div>
          </div>
          <div className="text-3xl font-bold leading-8 mt-6">
            {statDailySales ? statDailySales : "0.00"} ฿
          </div>
          <div className="text-base text-gray-600 mt-1">{label}</div>
        </div>
      </div>
    </div>
  );
};

export default Box;

// difference
// const previosDay = dailySales[Array.length - 2];
// const min = Math.min(Number(statDailySales), Number(previosDay));
// const max = Math.max(Number(statDailySales), Number(previosDay));
// let difference;
// if (previosDay && statDailySales) {
//   const calculate = Math.abs(((min - max) / max) * 100).toFixed(2);
//   difference = String(calculate);
// } else {
//   difference = "0";
// }
