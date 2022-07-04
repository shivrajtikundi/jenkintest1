import { LOGIN_URL } from '../../constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const acquireToken = createAsyncThunk('auth/acquireToken', async (data) => {
  const config = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${LOGIN_URL}`, config);
    const result = await response.json();
    return result;
  } catch (e) {
    return e;
  }
});
