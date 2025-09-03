import { getFeedsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

export const getFeedsAll = createAsyncThunk<TOrdersData>(
  'feeds/getAll',
  getFeedsApi
);

interface feedsState {
  feed: TOrdersData;
  isLoading: boolean;
  error: string | null;
}

export const initialState: feedsState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsAll.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeedsAll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(getFeedsAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.feed = action.payload;
      });
  },
  selectors: {
    getFeed: (state) => state.feed,
    getFeedOrders: (state) => state.feed.orders,
    getTotal: (state) => state.feed.total,
    getTotalToday: (state) => state.feed.totalToday,
    getLoading: (state) => state.isLoading,
    getError: (state) => state.error
  }
});

export const {
  getFeed,
  getFeedOrders,
  getTotal,
  getTotalToday,
  getLoading,
  getError
} = feedSlice.selectors;
export default feedSlice;
