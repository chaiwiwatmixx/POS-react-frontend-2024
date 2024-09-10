import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const YearPicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  console.log(startDate);
  return (
    <DatePicker
      showIcon
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      showYearPicker
      dateFormat="yyyy"
    />
  );
};

export default YearPicker;
