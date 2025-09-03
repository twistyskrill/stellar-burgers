import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { stat } from 'fs';

export interface TUserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: null | TUser;
  loginUserError: null | string;
  loginUserRequest: boolean;
}

export const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserError: null,
  loginUserRequest: false
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData, { rejectWithValue }) => {
    const data = await loginUserApi({ email, password });
    if (!data.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (regData: TRegisterData) => {
    const data = await registerUserApi(regData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.clear();
      return null;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const userApi = createAsyncThunk('user/getUserApi', getUserApi);
export const updateUser = createAsyncThunk(
  'user/updateUserApi',
  async (
    userData: Partial<TUser> & { password?: string },
    { rejectWithValue }
  ) => {
    try {
      return await updateUserApi(userData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserError = null;
        state.loginUserRequest = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message as string;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.loginUserRequest = true;
        state.user = null;
        state.loginUserError = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserRequest = false;
        state.loginUserError = action.error.message as string;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loginUserRequest = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isAuthenticated = true;
        state.loginUserRequest = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loginUserError = action.error.message as string;
        state.loginUserRequest = false;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(userApi.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(userApi.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.isAuthChecked = true;
        state.user = null;
        state.isAuthenticated = false;
        state.loginUserError = action.error.message as string;
      })
      .addCase(userApi.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.loginUserError = null;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.loginUserRequest = true;
        state.isAuthenticated = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message as string;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      });
  },
  selectors: {
    getIsAuthenticated: (state) => state.isAuthenticated,
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getLoginUserRequest: (state) => state.loginUserRequest,
    getLoginUserError: (state) => state.loginUserError
  }
});
export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(userApi()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const {
  getIsAuthenticated,
  getUser,
  getIsAuthChecked,
  getLoginUserRequest,
  getLoginUserError
} = userSlice.selectors;

export const { authChecked } = userSlice.actions;
export default userSlice.reducer;
