import axios from "axios";

const BACKEND_URL_BILL = `${process.env.REACT_APP_BACKEND_URL}/api/bill`;
const BACKEND_URL_ORDER = `${process.env.REACT_APP_BACKEND_URL}/api/order`;

// create bill
const createBill = async (formData) => {
  const response = await axios.post(BACKEND_URL_BILL, formData);
  return response.data;
};

const getBills = async () => {
  const response = await axios.get(BACKEND_URL_BILL);
  return response.data;
};

const getBill = async (id) => {
  const response = await axios.get(`${BACKEND_URL_BILL}/${id}`);
  return response.data;
};

const createOrder = async (id, formData) => {
  const response = await axios.post(`${BACKEND_URL_ORDER}/${id}`, formData);
  return response.data;
};

const deleteBill = async (id) => {
  const response = await axios.delete(`${BACKEND_URL_BILL}/${id}`);
  return response.data;
};

const payBill = async (id) => {
  const response = await axios.put(`${BACKEND_URL_BILL}/${id}`);
  return response.data;
};

const orderApi = {
  createBill,
  getBills,
  getBill,
  createOrder,
  deleteBill,
  payBill,
};

export default orderApi;
