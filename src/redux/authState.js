import { createSlice } from "@reduxjs/toolkit";


const username = JSON.parse(localStorage.getItem("username"));

const initialState = {
  loginStatus: false,
  username: username ? username : "",
  userData: {
    userCode: "",
    username: "",
    email: "",
    phone: "",
    package: {},
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.loginStatus = action.payload;
    },
    SET_USERNAME(state, action) {
      localStorage.setItem("username", JSON.stringify(action.payload));
      state.username = action.payload;
    },
    SET_USER_INFO(state, action) {
      const userInfo = action.payload;
      state.userData.userCode = userInfo.userCode;
      state.userData.username = userInfo.username;
      state.userData.email = userInfo.email;
      state.userData.phone = userInfo.phone;
      state.userData.package = userInfo.package;
    },
  },
});

export const { SET_LOGIN, SET_USERNAME, SET_USER_INFO } = authSlice.actions;

export const selectLoginStatus = (state) => state.auth.loginStatus;
export const selectUsername = (state) => state.auth.username;
export const selectUserData = (state) => state.auth.userData;

export default authSlice.reducer;
