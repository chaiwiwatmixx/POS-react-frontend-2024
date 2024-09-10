import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBill, getBills } from "../../redux/orderState";
const feather = require("feather-icons");

const Bill = ({ openModal }) => {
  const dispatch = useDispatch();
  const { details, detail } = useSelector((state) => state.order);

  const [selectedOption, setSelectedOption] = useState("");

  const select = (e) => {
    setSelectedOption(e.target.value);
    dispatch(getBill(e.target.value));
  };

  useEffect(() => {
    feather.replace();
    dispatch(getBills());
  }, [detail]);

  return (
    <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button onClick={openModal} className="btn btn-primary shadow-md mr-2">
        New Order
      </button>
      <select
        onChange={select}
        className="py-3 px-4 box w-full lg:w-auto mt-3 lg:mt-0 ml-auto"
        value={selectedOption}
      >
        <option value="" disabled>
          Select a Bill
        </option>
        {details.map((bill) => {
          const { _id, orderNumber, table } = bill;
          return (
            <option key={_id} value={_id}>
              Bill - {orderNumber} / Table - {table}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Bill;
