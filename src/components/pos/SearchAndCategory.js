import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_RESET_SEARCH_PRODUCT,
  SET_SEARCH_PRODUCT,
} from "../../redux/product/filterPaginationState";
import { changeCount } from "../../util/stat/paganation-until";
import feather from "feather-icons";
import Pagination from "../Pagination";
// const feather = require("feather-icons");

const SearchAndCategory = ({ products, setProductByCategory }) => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.product);
  const [productFilterData, setproductFilterData] = useState(null);
  const [Search, setSearch] = useState("");

  // filterProduct By category
  const filterProduct = (c) => {
    const productFilter = products.filter((p) => p.category === c);
    setproductFilterData(productFilter);
    setProductByCategory(productFilterData);
  };

  //Calculate Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  const LastItem = currentPage * itemsPerPage;
  const FirstItem = LastItem - itemsPerPage;
  const paginationData = category.slice(FirstItem, LastItem);

  // searcProduct
  useEffect(() => {
    feather.replace();
    const searchResult = () => {
      // for category
      if (productFilterData != null) {
        const searchProduct = productFilterData.filter((p) =>
          p.productName.toLowerCase().includes(Search.toLowerCase())
        );
        setProductByCategory(searchProduct);
        // for default product
      } else if (Search.trim() === "") {
        console.log("Search = ", Search);
        dispatch(SET_RESET_SEARCH_PRODUCT());
      } else if (Search.trim() !== "") {
        console.log("Search = ", Search);
        dispatch(SET_SEARCH_PRODUCT({ Search, products }));
      }
    };
    searchResult();
  }, [Search]);

  return (
    <>
      <div className="lg:flex intro-y">
        {/* <!-- search --> */}
        <div className="relative text-gray-700 dark:text-gray-300">
          <input
            type="text"
            className="form-control py-3 px-4 w-full lg:w-64 box pr-10 placeholder-theme-13"
            placeholder="Search item..."
            name="Search"
            value={Search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i
            className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
            data-feather="search"
          ></i>
        </div>
        {/* <!-- select --> */}
        <select className="form-select py-3 px-4 box w-full lg:w-auto mt-3 lg:mt-0 ml-auto">
          <option>Sort By</option>
          <option>A to Z</option>
          <option>Z to A</option>
          <option>Lowest Price</option>
          <option>Highest Price</option>
        </select>
      </div>
      {/* <!-- category --> */}
      <div className="grid grid-cols-12 gap-5 mt-5">
        {paginationData.map((c) => (
          <div
            className="col-span-12 sm:col-span-4 xxl:col-span-3 box p-5 cursor-pointer zoom-in"
            onClick={() => filterProduct(c)}
          >
            <div className="font-medium text-base">{currentPage}</div>
            <div className="text-gray-600">5 Items</div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        data={category}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default SearchAndCategory;
// flex items-center justify-center
// intro-y col-span-12
// flex-wrap sm:flex-row sm:flex-nowrap
