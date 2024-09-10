import React, { useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../Pagination";

const BestFood = () => {
  const { dailyFoodStat } = useSelector((state) => state.stat);
  const { products } = useSelector((state) => state.product);
  const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}/uploads`;

  // get image
  let newStatData = dailyFoodStat.map((item) => {
    let product = products.find((p) => p.productName === item.productName);
    return {
      ...item,
      image: product ? product.image : null,
    };
  });
  // console.log("newStatData = ", newStatData);

  //Calculate Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const LastItem = currentPage * itemsPerPage;
  const FirstItem = LastItem - itemsPerPage;
  const paginationData = newStatData.slice(FirstItem, LastItem);

  return (
    <div className="col-span-12 lg:col-span-8 xl:col-span-6 mt-2">
      <div className="intro-y block sm:flex items-center h-10">
        <h2 className="text-lg font-medium truncate mr-5">
          Product statistics of best-selling food items
        </h2>
      </div>
      <div className="report-box-2 intro-y mt-12 sm:mt-5">
        <div className="box sm:flex">
          <div className="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
            <table className="table table-report sm:mt-2">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">IMAGES</th>
                  <th className="whitespace-nowrap">PRODUCT NAME</th>
                  <th className="text-center whitespace-nowrap">QUANTITY</th>
                  <th className="text-center whitespace-nowrap">REVENUE</th>
                </tr>
              </thead>
              <tbody>
                {paginationData.map((item) => (
                  <tr className="intro-x">
                    <td className="w-40">
                      <div className="flex">
                        <div className="w-10 h-10 image-fit zoom-in">
                          <img
                            alt="Rubick Tailwind HTML Admin Template"
                            className="tooltip rounded-full"
                            src={
                              item.image
                                ? `${BACKEND_URL}/${item.image}`
                                : "dist/images/preview-9.jpg"
                            }
                            title="Uploaded at 30 November 2022"
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <a href="" className="font-medium whitespace-nowrap">
                        {item?.productName}
                      </a>
                      {/* <div className="text-gray-600 text-xs whitespace-nowrap mt-0.5">
                        Electronic
                      </div> */}
                    </td>
                    <td className="text-center">{item?.totalQuantity}</td>
                    <td className="text-center">{item?.totalRevenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              data={dailyFoodStat}
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestFood;
