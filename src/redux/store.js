import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authState";
import productReducer from "./product/productState";
import filterPaginationReducer from "./product/filterPaginationState";
import orderReducer from "./orderState";
import statReducer from "./statState";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    filterPagination: filterPaginationReducer,
    order: orderReducer,
    stat: statReducer,
  },
});
