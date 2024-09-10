import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import orderApi from "../service/order-service";

const initialState = {
  details: [],
  detail: {},
  orderFront: {}, // show add item modal
  orderDb: [], // order list from db
  showOrder: [], // show order food list
  editOrder: {}, // edit data in modal
  totalCharge: 0,
  error: false,
  success: false,
  loading: false,
  message: "",
};

export const createBill = createAsyncThunk(
  "order/createBill",
  async (formData, thunkAPI) => {
    try {
      console.log("createBill send api syncThunk");
      return await orderApi.createBill(formData);
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

export const getBills = createAsyncThunk(
  "order/getBills",
  async (_, thunkAPI) => {
    try {
      console.log("getBills send api syncThunk");
      return await orderApi.getBills();
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

export const getBill = createAsyncThunk(
  "order/getBill",
  async (id, thunkAPI) => {
    try {
      console.log("getBill send api syncThunk");
      return await orderApi.getBill(id);
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

export const deleteBill = createAsyncThunk(
  "order/deleteBill",
  async (id, thunkAPI) => {
    try {
      console.log("deleteBill send api syncThunk");
      // console.log("{ id, formData } = ", id, formData);
      return await orderApi.deleteBill(id);
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

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ id, formData }, thunkAPI) => {
    try {
      console.log("createOrder send api syncThunk");
      // console.log("{ id, formData } = ", id, formData);
      return await orderApi.createOrder(id, formData);
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

export const payBill = createAsyncThunk(
  "order/payBill",
  async (id, thunkAPI) => {
    try {
      console.log("payBill send api syncThunk");
      // console.log("{ id, formData } = ", id, formData);
      return await orderApi.payBill(id);
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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // send to add item modal
    SET_ORDER_FRONT(state, action) {
      state.orderFront = action.payload;
    },
    // send to order food list
    SET_ORDER_SHOW(state, action) {
      state.showOrder.push(action.payload);
      state.orderFront = {};
    },
    //send to edit modal
    SET_EDIT_ORDER(state, action) {
      state.editOrder = action.payload;
    },
    //edit quantity in order list
    SET_EDIT_ORDER_END(state, action) {
      const { quantity, id, price } = action.payload;
      state.showOrder.forEach((order) => {
        if (order._id === id) {
          order.quantity = quantity;
          order.price = price;
          return;
        }
      });
    },
    //delete order in order list
    SET_EDIT_DELETE_ORDER(state, action) {
      const id = action.payload;
      state.showOrder = state.showOrder.filter((order) => order._id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      // createBill
      .addCase(createBill.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBill.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.details.push(action.payload);
        toast.success("Successfully create Bill");
      })
      .addCase(createBill.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // getBills
      .addCase(getBills.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBills.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.details = action.payload;
        // state.showOrder = action.payload;
        // toast.success("Successfully getBills");
      })
      .addCase(getBills.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // getBill
      .addCase(getBill.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBill.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.detail = action.payload;
        state.showOrder = [];
        const { order } = action.payload;
        if (order) {
          state.showOrder = order;
        }

        // state.orderDb = action.payload;
        // toast.success("Successfully getBill");
      })
      .addCase(getBill.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // createOrder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        toast.success("Successfully createOrder");
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // deleteBill
      .addCase(deleteBill.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBill.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.detail = {};
        state.showOrder = [];
        toast.success("delete createOrder");
      })
      .addCase(deleteBill.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // payBill
      .addCase(payBill.pending, (state) => {
        state.loading = true;
      })
      .addCase(payBill.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.detail = {};
        state.showOrder = [];
        toast.success("Payment Successfully");
      })
      .addCase(payBill.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {
  SET_ORDER_FRONT,
  SET_ORDER_SHOW,
  SET_EDIT_ORDER,
  SET_EDIT_ORDER_END,
  SET_EDIT_DELETE_ORDER,
} = orderSlice.actions;

export const selectOrderFront = (state) => state.order.orderFront;
export const selectShowOrder = (state) => state.order.showOrder;

export default orderSlice.reducer;

// SET_PROCESS_EDIT_ORDER(state, action) {
//   // console.log("SET_EDIT_ORDER = ", action.payload);
//   state.editOrder = action.payload;
// },
