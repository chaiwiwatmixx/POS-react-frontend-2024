import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthTemplate from "../../components/AuthTemplate";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  SET_LOGIN,
  SET_USERNAME,
  SET_USER_INFO,
} from "../../redux/authState";
import { loginUser, validateEmail } from "../../service/auth-service";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill in complete information");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    if (!password.length >= 6) {
      return toast.error("Please enter a valid password");
    }

    const userData = {
      email,
      password,
    };

    try {
      const data = await loginUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_USERNAME(data.username));
      await dispatch(SET_USER_INFO(data));
      navigate("/products");
    } catch (error) {
      return toast.error("login error");
    }
  };

  return (
    <AuthTemplate mainTopic="Sign In" subTopic="sign in">
      <form onSubmit={login} className="intro-x mt-8">
        <input
          type="text"
          className="intro-x login__input form-control py-3 px-4 border-gray-300 block"
          placeholder="Email"
          required
          name="email"
          value={email}
          onChange={inputChange}
        />
        <input
          type="password"
          className="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4"
          placeholder="Password"
          required
          name="password"
          value={password}
          onChange={inputChange}
        />
        <div className="intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4">
          <a href="">Forgot Password?</a>
        </div>
        <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
          <button
            type="submit"
            className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
          >
            Login
          </button>
          <button className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top">
            <Link to="/register">Sign up</Link>
          </button>
        </div>
      </form>
    </AuthTemplate>
  );
};

export default Login;
