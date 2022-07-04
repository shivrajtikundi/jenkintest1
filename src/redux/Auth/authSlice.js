import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { acquireToken } from './authThunks';

const initialState = {
  isLoadingLogIn: false,
  currentUserInfo: null,
  accessToken: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [acquireToken.pending]: (state) => {
      state.isLoadingLogIn = true;
    },
    [acquireToken.fulfilled]: (state, action) => {
      console.log(action, 'action');
      state.accessToken = action.payload.accessToken;
      state.customer = action.payload.customer;
      state.isLoadingLogIn = false;
      toast.success('Login Successfully!');
    },
    [acquireToken.rejected]: (state, payload) => {
      console.log('payload', payload);
      state.isLoadingLogIn = false;
      state.accessToken = undefined;
      toast.success('Something went wrong!');
    },
  },
});

/**
 * Actions
 */

/**
 * Reducers
 */
export const authReducer = authSlice.reducer;
