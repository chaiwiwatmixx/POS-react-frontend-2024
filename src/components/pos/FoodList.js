import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchProduct } from "../../redux/product/filterPaginationState";
import { SET_ORDER_FRONT } from "../../redux/orderState";

const FoodList = ({ products, productByCategory, openModal }) => {
  const dispatch = useDispatch();
  const searchProducts = useSelector(selectSearchProduct);
  const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}/uploads`;
  // select data for map (1.searchProducts only / 2.productByCategory 3.products only)
  const productMap =
    searchProducts !== null && searchProducts.length !== 0
      ? searchProducts
      : productByCategory || products;

  const actionSET_ORDER_FRONT = (product) => {
    dispatch(SET_ORDER_FRONT(product));
    openModal();
  };

  return (
    <div className="grid grid-cols-12 gap-5 mt-5 pt-5 border-t border-theme-5">
      {productMap.map((product) => {
        const { _id, productName, image } = product;
        // set image path from backend
        const imageUrl = image
          ? `${BACKEND_URL}/${image}`
          : "dist/images/food-beverage-6.jpg";
        return (
          <a
            // href="javascript:;"
            // data-toggle="modal"
            // data-target="#add-item-modal"
            className="intro-y block col-span-12 sm:col-span-4 xxl:col-span-3"
            key={_id}
            onClick={() => actionSET_ORDER_FRONT(product)}
          >
            <div className="box rounded-md p-3 relative zoom-in">
              <div className="flex-none pos-image relative block">
                <div className="pos-image__preview image-fit">
                  <img alt={product} src={imageUrl} />
                </div>
              </div>
              <div className="block font-medium text-center truncate mt-3">
                {productName}
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default FoodList;
