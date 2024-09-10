import axios from "axios";

const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}/api/state`;

const getStatDaily = async (date) => {
  const response = await axios.get(
    `${BACKEND_URL}/daily?period=daily&selectedDate=${date}`
  );
  return response.data;
};

const getStatWeekly = async (date) => {
  const response = await axios.get(
    `${BACKEND_URL}/week?period=weekly&selectedDate=${date}`
  );
  return response.data;
};

const getStatMonthly = async (date) => {
  const response = await axios.get(
    `${BACKEND_URL}/month?period=monthly&selectedDate=${date}`
  );
  return response.data;
};

const getStatYearly = async (date) => {
  const response = await axios.get(
    `${BACKEND_URL}/year?period=yearly&selectedDate=${date}`
  );
  return response.data;
};

const getStatFoodDaily = async (date) => {
  const response = await axios.get(
    `${BACKEND_URL}/food/daily?period=daily&selectedDate=${date}`
  );
  return response.data;
};

const getStatFoodWeekly = async (date) => {
  const response = await axios.get(
    `${BACKEND_URL}/food/weekly?period=weekly&selectedDate=${date}`
  );
  return response.data;
};

const getStatFoodMonthly = async (date) => {
  const response = await axios.get(
    `${BACKEND_URL}/food/monthly?period=monthly&selectedDate=${date}`
  );
  return response.data;
};

const getStatFoodYearly = async (date) => {
  const response = await axios.get(
    `${BACKEND_URL}/food/yearly?period=yearly&selectedDate=${date}`
  );
  return response.data;
};

const statApi = {
  getStatDaily,
  getStatFoodDaily,
  getStatWeekly,
  getStatMonthly,
  getStatYearly,
  getStatFoodWeekly,
  getStatFoodMonthly,
  getStatFoodYearly,
};

export default statApi;
