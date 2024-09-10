import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import productApi from "../../service/product-service";

const initialState = {
  products: [],
  product: null,
  category: [],
  error: false,
  success: false,
  loading: false,
  message: "",
};

// create Product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (formData, thunkAPI) => {
    try {
      console.log("createProduct send api syncThunk");
      return await productApi.createProduct(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get all Product
export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async (_, thunkAPI) => {
    try {
      console.log("get All Product send api syncThunk");
      return await productApi.getAllProduct();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get Product
export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id, thunkAPI) => {
    try {
      console.log("get Product AsyncThunk api..");
      return await productApi.getProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update Product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, formData }, thunkAPI) => {
    try {
      console.log("updateProduct send api syncThunk");
      return await productApi.updateProduct(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// delete Product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkAPI) => {
    try {
      console.log("deleteProduct send api syncThunk");
      return await productApi.deleteProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // action  createProduct
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.products.push(action.payload);
        toast.success("Successfully added product");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // action get all Product
      .addCase(getAllProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.products = action.payload;
        const categories = action.payload.map((product) => product.category);
        const category = [...new Set(categories)];
        state.category = category;
        toast.success("Successfully get products");
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // action get all Product
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        console.log("getProduct in productSlice", action.payload);
        state.product = action.payload;
        toast.success("Successfully get product");
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // action updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.product = action.payload;
        toast.success("Successfully update product");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // action deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        toast.success("Successfully delete product");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectProducts = (state) => state.product.products;
export const selectProduct = (state) => state.product.product;
export const selectLoading = (state) => state.product.loading;

export default productSlice.reducer;
