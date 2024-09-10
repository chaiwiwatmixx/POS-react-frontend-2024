import { useEffect, useState } from "react";
import Search from "./Search";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteProduct, getAllProduct } from "../../redux/product/productState";
import "../../index.css";
const feather = require("feather-icons");

function DataTable({ products }) {
  const dispatch = useDispatch();

  useEffect(() => {
    feather.replace();
    console.log("use feather");
  });

  const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}/uploads`;
  const [filteredProducts, setFilteredProducts] = useState([]);

  //get gobal state pagination
  const { paginationData, currentPage } = useSelector(
    (state) => state.filterPagination
  );

  // delete product
  const DeleteProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getAllProduct());
  };

  // confirmDelete
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete Product",
      message: "Are you sure Delete Product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => DeleteProduct(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <>
      <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
        {/* <!-- Add Product Component --> */}
        <button className="btn btn-primary shadow-md mr-2">
          <Link to="/products">Add New Product</Link>
        </button>
        {/* <!-- Show Page number Component --> */}
        <div className="hidden md:block mx-auto text-gray-600">
          Showing {currentPage} to {Math.ceil(filteredProducts.length / 2)} of{" "}
          {filteredProducts.length} entries
        </div>
        {/* <!-- Search Component --> */}
        <Search products={products} setFilteredProducts={setFilteredProducts} />
      </div>

      {/* data table */}
      <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
        <table className="table table-report -mt-2">
          <thead>
            <tr>
              <th className="whitespace-nowrap">IMAGES</th>
              <th className="whitespace-nowrap">PRODUCT NAME</th>
              <th className="text-center whitespace-nowrap">CATEGORY</th>
              <th className="text-center whitespace-nowrap">STOCK</th>
              <th className="text-center whitespace-nowrap">PRICE</th>
              <th className="text-center whitespace-nowrap">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {/* map product */}
            {paginationData.map((product) => {
              const { productName, category, amount, price, image, _id } =
                product;
              const imageUrl = image
                ? `${BACKEND_URL}/${image}`
                : "dist/images/preview-15.jpg";
              return (
                <tr key={_id} className="intro-x">
                  <td className="w-40">
                    <div className="flex">
                      <div className="w-10 h-10 image-fit zoom-in">
                        <img alt={product} src={imageUrl} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <a href="" className="font-medium whitespace-nowrap">
                      {productName}
                    </a>
                  </td>
                  <td className="text-center">{category}</td>
                  <td className="text-center">{amount}</td>
                  <td className="text-center">{price} ฿</td>
                  {/* Edit Delete button */}
                  <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                      <Link
                        to={`/edit-product/${_id}`}
                        className="flex items-center mr-3"
                        href="javascript:;"
                      >
                        {" "}
                        <i data-feather="edit" className="w-4 h-4 mr-1"></i>
                        Edit{" "}
                      </Link>
                      <button
                        className="flex items-center text-theme-6"
                        href="javascript:;"
                        onClick={() => confirmDelete(_id)}
                      >
                        {" "}
                        <i data-feather="trash-2" className="w-4 h-4 mr-1"></i>{" "}
                        Delete{" "}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <Pagination filteredProducts={filteredProducts} />
    </>
  );
}

export default DataTable;

// สร้างฟังชั่น คอนเฟริมลบ รอรับไอดี
// ในฟังชั่น โยงไปที่ redux ยิง api ลบ
// ส่ง api เสร็จ โหลดหน้าใหม่เพื่อดึงข้อมูลใหม่
