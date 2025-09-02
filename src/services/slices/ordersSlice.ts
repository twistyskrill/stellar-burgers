import { getOrderByNumberApi, getOrdersApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getUserOrdersHistory = createAsyncThunk(
  'orders/getUserOrderHistory',
  getOrdersApi
);

export const getUserOrderByNumber = createAsyncThunk(
  'order/getUserOrderByNumber',
  async (number: number) => {
    const res = await getOrderByNumberApi(number);
    return res.orders[0];
  }
);

export interface userOrdersState {
  orders: TOrder[];
  currentOrder: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: userOrdersState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setUserOrders: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrdersHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserOrdersHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(getUserOrdersHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(getUserOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.currentOrder = null;
        state.error = null;
      })
      .addCase(getUserOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.currentOrder = null;
        state.isLoading = false;
      })
      .addCase(getUserOrderByNumber.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.currentOrder = action.payload;
      });
  },
  selectors: {
    getUserOrders: (state) => state.orders,
    getLoading: (state) => state.isLoading,
    getError: (state) => state.error,
    getCurrentOrder: (state) => state.currentOrder
  }
});

export const { setUserOrders } = ordersSlice.actions;
export const { getUserOrders, getLoading, getError, getCurrentOrder } =
  ordersSlice.selectors;
export default ordersSlice.reducer;
