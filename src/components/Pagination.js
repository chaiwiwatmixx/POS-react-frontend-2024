import React from "react";
import { changeCount } from "../util/stat/paganation-until";

const Pagination = ({ currentPage, data, itemsPerPage, setCurrentPage }) => {
  return (
    <div className="w-64 mx-auto mt-5 intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
      <ul className="pagination">
        <li>
          <button
            className="pagination__link"
            onClick={() =>
              changeCount(-1, data, itemsPerPage, currentPage, setCurrentPage)
            }
          >
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
          <button
            className="pagination__link"
            onClick={() =>
              changeCount(1, data, itemsPerPage, currentPage, setCurrentPage)
            }
          >
            {" "}
            <i className="w-4 h-4" data-feather="chevron-right"></i>{" "}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
