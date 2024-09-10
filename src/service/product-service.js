import axios from "axios";

const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}/api/product`;

//create product
const createProduct = async (formData) => {
  console.log("API run... = ", formData);
  const response = await axios.post(BACKEND_URL, formData);
  return response.data;
};

//get all product
const getAllProduct = async () => {
  // console.log("get API run... = ");
  const response = await axios.get(BACKEND_URL);
  return response.data;
};

//get all product
const getProduct = async (id) => {
  const response = await axios.get(`${BACKEND_URL}/${id}`);
  return response.data;
};

//update product
const updateProduct = async (id, formData) => {
  const response = await axios.patch(`${BACKEND_URL}/${id}`, formData);
  return response.data;
};

//delete product
const deleteProduct = async (id, formData) => {
  const response = await axios.delete(`${BACKEND_URL}/${id}`);
  return response.data;
};

const productApi = {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};

export default productApi;
