import React, { useEffect, useState } from "react";
import TopReport from "../../components/stat/TopReport/TopReport";
import feather from "feather-icons";
import GeneralReport from "../../components/stat/GeneralReport";
import BarChartStat from "../../components/stat/BarChartStat";
import { useDispatch, useSelector } from "react-redux";
import {
  getStatDaily,
  getStatFoodDaily,
  getStatFoodMonthly,
  getStatFoodWeekly,
  getStatFoodYearly,
  getStatMonthly,
  getStatWeekly,
  getStatYearly,
} from "../../redux/statState";
import BestFood from "../../components/stat/BestFood";
import { getAllProduct } from "../../redux/product/productState";
import Chaseback from "../../components/chaseBack/Chaseback";
import { selectLoginStatus } from "../../redux/authState";
// const feather = require("feather-icons");

const Stat = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [calendar, setCalendar] = useState("daily");

  Chaseback("/login");
  const loginStatus = useSelector(selectLoginStatus);

  console.log("calendar = ", calendar);
  console.log("startDate = ", startDate);

  const fetchDate = () => {
    const toDay = startDate.toISOString();
    console.log("Calendar: ", calendar, "Date: ", toDay);
    if (calendar === "daily") {
      dispatch(getStatDaily(toDay));
      dispatch(getStatFoodDaily(toDay));
    } else if (calendar === "weekly") {
      dispatch(getStatWeekly(toDay));
      dispatch(getStatFoodWeekly(toDay));
    } else if (calendar === "monthly") {
      dispatch(getStatMonthly(toDay));
      dispatch(getStatFoodMonthly(toDay));
    } else if (calendar === "yearly") {
      dispatch(getStatYearly(toDay));
      dispatch(getStatFoodYearly(toDay));
    }
    dispatch(getAllProduct());
  };

  // fetch data from db
  useEffect(() => {
    if (loginStatus === true) {
      fetchDate();
    }
    feather.replace();
  }, [startDate, calendar]);

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 xxl:col-span-9">
        <div className="grid grid-cols-12 gap-6">
          {/* <!-- BEGIN: Report by time period --> */}
          {/* <TopReport /> */}
          {/* <!-- BEGIN: General Report --> */}
          <GeneralReport
            startDate={startDate}
            setStartDate={setStartDate}
            calendar={calendar}
            setCalendar={setCalendar}
          />
          {/* <!-- BEGIN: Compare statistics by time period  --> */}
          <BarChartStat
            data="totalAmount"
            label="Revenue"
            calendar={calendar}
          />
          {/* <!-- BEGIN: Bill statistics by time period --> */}
          <BarChartStat data="totalOrders" label="Bill" calendar={calendar} />
          {/* <!-- BEGIN: Product statistics of best-selling food items --> */}
          <BestFood />
          {/* <!-- END: General Report --> */}
        </div>
      </div>
    </div>
  );
};

export default Stat;
