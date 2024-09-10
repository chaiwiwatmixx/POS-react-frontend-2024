import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import statApi from "../service/stat-service";

const initialState = {
  dailySales: [],
  // weeklySales: [],
  // monthlySales: [],
  // yearlySales: [],
  dailyFoodStat: [],
  // weeklyFoodStat: [],
  // monthlyFoodStat: [],
  // yearlyFoodStat: [],
};

// getStatDaily
export const getStatDaily = createAsyncThunk(
  "stat/getStatDaily",
  async (date, thunkAPI) => {
    try {
      console.log("getStatDaily send api syncThunk");
      return await statApi.getStatDaily(date);
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

// getStatWeekly
export const getStatWeekly = createAsyncThunk(
  "stat/getStatWeekly",
  async (date, thunkAPI) => {
    try {
      console.log("getStatWeekly send api syncThunk");
      return await statApi.getStatWeekly(date);
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

// getStatMonthly
export const getStatMonthly = createAsyncThunk(
  "stat/getStatMonthly",
  async (date, thunkAPI) => {
    try {
      console.log("getStatMonthly send api syncThunk");
      return await statApi.getStatMonthly(date);
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

// getStatYearly
export const getStatYearly = createAsyncThunk(
  "stat/getStatYearly",
  async (date, thunkAPI) => {
    try {
      console.log("getStatYearly send api syncThunk");
      return await statApi.getStatYearly(date);
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

// getStatFoodDaily
export const getStatFoodDaily = createAsyncThunk(
  "stat/getStatFoodDaily",
  async (date, thunkAPI) => {
    try {
      console.log("getStatDaily send api syncThunk");
      return await statApi.getStatFoodDaily(date);
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

// getStatFoodWeekly
export const getStatFoodWeekly = createAsyncThunk(
  "stat/getStatFoodWeekly",
  async (date, thunkAPI) => {
    try {
      console.log("getStatFoodWeekly send api syncThunk");
      return await statApi.getStatFoodWeekly(date);
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

// getStatFoodMonthly
export const getStatFoodMonthly = createAsyncThunk(
  "stat/getStatFoodMonthly",
  async (date, thunkAPI) => {
    try {
      console.log("getStatFoodMonthly send api syncThunk");
      return await statApi.getStatFoodMonthly(date);
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

// getStatFoodYearly
export const getStatFoodYearly = createAsyncThunk(
  "stat/getStatFoodYearly",
  async (date, thunkAPI) => {
    try {
      console.log("getStatFoodYearly send api syncThunk");
      return await statApi.getStatFoodYearly(date);
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

const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getStatDaily
      .addCase(getStatDaily.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatDaily.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.dailySales = action.payload;
      })
      .addCase(getStatDaily.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      // getStatWeekly
      .addCase(getStatWeekly.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatWeekly.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.dailySales = action.payload;
      })
      .addCase(getStatWeekly.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      // getStatMonthly
      .addCase(getStatMonthly.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatMonthly.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.dailySales = action.payload;
      })
      .addCase(getStatMonthly.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      // getStatYearly
      .addCase(getStatYearly.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatYearly.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.dailySales = action.payload;
      })
      .addCase(getStatYearly.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      // getStatFoodDaily
      .addCase(getStatFoodDaily.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatFoodDaily.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.dailyFoodStat = action.payload;
      })
      .addCase(getStatFoodDaily.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      // getStatFoodWeekly
      .addCase(getStatFoodWeekly.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatFoodWeekly.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.dailyFoodStat = action.payload;
      })
      .addCase(getStatFoodWeekly.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      // getStatFoodMonthly
      .addCase(getStatFoodMonthly.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatFoodMonthly.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.dailyFoodStat = action.payload;
      })
      .addCase(getStatFoodMonthly.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      // getStatFoodYearly
      .addCase(getStatFoodYearly.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatFoodYearly.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.dailyFoodStat = action.payload;
      })
      .addCase(getStatFoodYearly.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export default statSlice.reducer;
