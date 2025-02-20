import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}/api/users`;

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

//Register
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/register`, userData, {
      withCredentials: true,
    });
    if (response.statusText === "OK") {
      toast.success("User Registered successfully");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//Login
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/login`, userData, {
      withCredentials: true,
    });
    if (response.statusText === "OK") {
      toast.success("User Login successfully");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//Logout
export const logoutUser = async () => {
  try {
    await axios.get(`${BACKEND_URL}/logout`);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//Login status
export const loginStatus = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/status`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
