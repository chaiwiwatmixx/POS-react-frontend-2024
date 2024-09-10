import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthTemplate from "../../components/AuthTemplate";
import { toast } from "react-toastify";
import { validateEmail, registerUser } from "../../service/auth-service";
import { useDispatch } from "react-redux";
import {
  SET_LOGIN,
  SET_USERNAME,
  SET_USER_INFO,
} from "../../redux/authState";

const initialState = {
  username: "",
  password: "",
  password2: "",
  email: "",
  phone: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const { username, password, password2, email, phone } = formData;

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    if (!username || !password || !password2 || !email || !phone) {
      return toast.error("Please fill in complete information");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    if (phone.length !== 10) {
      return toast.error("Please enter a valid phone");
    }

    const userData = {
      username,
      email,
      password,
      phone,
    };

    try {
      const data = await registerUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_USERNAME(data.username));
      await dispatch(SET_USER_INFO(data));
      navigate("/dashboard");
    } catch (error) {
      return toast.error("register error");
    }
  };

  return (
    <AuthTemplate mainTopic="Sign Up" subTopic="sign up">
      <form onSubmit={register} className="intro-x mt-8">
        <input
          type="text"
          className="intro-x login__input form-control py-3 px-4 border-gray-300 block"
          placeholder="Username"
          required
          name="username"
          value={username}
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
        <input
          type="password"
          className="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4"
          placeholder="Password Confirmation"
          required
          name="password2"
          value={password2}
          onChange={inputChange}
        />
        <input
          type="text"
          className="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4"
          placeholder="Email"
          required
          name="email"
          value={email}
          onChange={inputChange}
        />
        <input
          type="text"
          className="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4"
          placeholder="Phone"
          required
          name="phone"
          value={phone}
          onChange={inputChange}
        />
        <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
          <button
            type="submit"
            className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
          >
            Register
          </button>
          <button className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top">
            <Link to="/login">Sign in</Link>
          </button>
        </div>
      </form>
    </AuthTemplate>
  );
};

export default Register;
