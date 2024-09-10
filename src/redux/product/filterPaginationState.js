import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paginationData: [],
  currentPage: 1,
  filterProduct: [],
  searchProduct: null,
};

const filterPaginationSlice = createSlice({
  name: "filterPagination",
  initialState,
  reducers: {
    SET_PAGINATION_DATA(state, action) {
      state.paginationData = action.payload;
    },
    SET_CURRENT_PAGE(state, action) {
      state.currentPage = action.payload;
    },
    SET_SEARCH_PRODUCT(state, action) {
      const { Search, products } = action.payload;
      // console.log("SEARCH slice = ", Search)
      const searchResult = products.filter((p) =>
        p.productName.toLowerCase().includes(Search.toLowerCase())
      );
      state.searchProduct = searchResult;
    },
    SET_RESET_SEARCH_PRODUCT(state, action) {
      state.searchProduct = null;
    },
  },
});

export const {
  SET_PAGINATION_DATA,
  SET_CURRENT_PAGE,
  SET_SEARCH_PRODUCT,
  SET_RESET_SEARCH_PRODUCT,
} = filterPaginationSlice.actions;

export const selectSearchProduct = (state) =>
  state.filterPagination.searchProduct;
// export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterPaginationSlice.reducer;
