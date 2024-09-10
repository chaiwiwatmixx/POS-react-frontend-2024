import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashbord/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import Produces from "./pages/products/Produces";
import EditProduct from "./pages/products/EditProduct";
import Pos from "./pages/pos/Pos";
import Stat from "./pages/stat/Stat";
import { useSelector } from "react-redux";
import { selectLoginStatus } from "./redux/authState";

axios.defaults.withCredentials = true;

function App() {
  const loginStatus = useSelector(selectLoginStatus);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <Sidebar>
              <Layout>
                <Pos />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/pos"
          element={
            <Sidebar>
              <Layout>
                <Pos />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/products"
          element={
            <Sidebar>
              <Layout>
                <Produces />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <Sidebar>
              <Layout>
                <EditProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/stat"
          element={
            <Sidebar>
              <Layout>
                <Stat />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
