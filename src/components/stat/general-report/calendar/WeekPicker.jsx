import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WeekPicker = () => {
  const [startDate, setStartDate] = useState(new Date("2021/02/22"));
  // console.log(startDate);
  return (
    <DatePicker
      showIcon
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="I/R"
      showWeekNumbers
      showWeekPicker
    />
  );
};

export default WeekPicker;
