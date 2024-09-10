import React, { useEffect } from "react";
import Search from "../../components/productList/Search";
import Pagination from "../../components/productList/Pagination";
import DataTable from "../../components/productList/DataTable";
import Chaseback from "../../components/chaseBack/Chaseback";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginStatus } from "../../redux/authState";
import {
  getAllProduct,
  selectProducts,
} from "../../redux/product/productState";
import { useNavigate } from "react-router-dom";
const feather = require("feather-icons");

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  Chaseback("/login");
  const loginStatus = useSelector(selectLoginStatus);
  const { products, loading, error, message } = useSelector(
    (state) => state.product
  );
  // console.log("loginStatus in Dashboard", loginStatus);
  // console.log("useSelector product all in Dashboard", products);

  useEffect(() => {
    feather.replace();
    const getProducts = async () => {
      if (loginStatus === true) {
        // console.log("UseEffect getAllProduct in Dashboard run....");
        dispatch(getAllProduct());
      }
    };
    getProducts();
  }, [loginStatus]);

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Product List</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">

        {/* <!-- Date Table --> */}
        <DataTable products={products} />
      </div>
    </>
  );
};

export default Dashboard;
