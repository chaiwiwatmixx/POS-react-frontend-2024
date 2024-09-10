import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  SET_CURRENT_PAGE,
  SET_PAGINATION_DATA,
} from "../../redux/product/filterPaginationState";

function Pagination({ filteredProducts }) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  //Calculate Pagination
  const itemsPerPage = 2;
  const LastItem = currentPage * itemsPerPage;
  const FirstItem = LastItem - itemsPerPage;
  const paginationData = filteredProducts.slice(FirstItem, LastItem);
  // console.log("paginationData", paginationData);
  dispatch(SET_CURRENT_PAGE(currentPage));

  useEffect(() => {
    dispatch(SET_PAGINATION_DATA(paginationData));
  }, [LastItem, FirstItem, filteredProducts]);

  //changeCount pagination
  const changeCount = (change) => {
    const limit = Math.ceil(filteredProducts.length / itemsPerPage);
    if (
      (change === -1 && currentPage <= 1) ||
      (change === 1 && currentPage >= limit)
    ) {
      return;
    }
    setCurrentPage((prevPage) => prevPage + change);
  };

  return (
    <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
      <ul className="pagination">
        <li>
          <button className="pagination__link" onClick={() => changeCount(-1)}>
            {" "}
            <i className="w-4 h-4" data-feather="chevron-left"></i>{" "}
          </button>
        </li>
        <li>
          {" "}
          <a className="pagination__link">...</a>{" "}
        </li>
        <li>
          {" "}
          <a className="pagination__link pagination__link--active">
            {currentPage}
          </a>{" "}
        </li>
        <li>
          {" "}
          <a className="pagination__link">...</a>{" "}
        </li>
        <li>
          <button className="pagination__link" onClick={() => changeCount(1)}>
            {" "}
            <i className="w-4 h-4" data-feather="chevron-right"></i>{" "}
          </button>
        </li>
      </ul>
      {/* <!-- select Pagination Component --> */}
      <select className="w-20 form-select box mt-3 sm:mt-0">
        <option>10</option>
        <option>25</option>
        <option>35</option>
        <option>50</option>
      </select>
    </div>
  );
}

export default Pagination;
