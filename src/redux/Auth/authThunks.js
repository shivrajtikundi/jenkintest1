import { LOGIN_URL, REGISTER_URL, RESET_PASSWORD_URL } from '../../constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { apiUrl } from '../../constants';

export const acquireToken = createAsyncThunk('auth/acquireToken', async (data) => {
  const { user_email, user_password, handleRedirection } = data;
  const config = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({user_email,user_password})
  };

  try {
    const response = await fetch(`${apiUrl}${LOGIN_URL}`, config);
    const result = await response.json();
    if(result.success){
      toast.success('Login Successfully!');
    }else{
      toast.error(result.error || "Something went wrong!");
    }
    handleRedirection(result);
    return result;
  } catch (e) {
    return e;
  }
});

export const acquireRegister = createAsyncThunk('auth/acquireRegister', async (data) => {
  console.log("data------>",data)
  const { registerData, handleRedirection } = data;
  console.log("registerData------>",registerData)
  const config = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerData)
  };

  try {
    const response = await fetch(`${apiUrl}${REGISTER_URL}`, config);
    const result = await response.json();
    if(result.success){
      toast.success('Register Successfully!');
    }else{
      toast.error(result.error || "Something went wrong!");
    }
    handleRedirection(result);
    return result;
  } catch (e) {
    return e;
  }
});

export const resetPassWordLink = createAsyncThunk('auth/resetPassWordLink', async (data) => {
  console.log("data------>",data)
  const { data:resetLink, handleRedirection } = data;
  const config = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(resetLink)
  };

  try {
    const response = await fetch(`${apiUrl}${RESET_PASSWORD_URL}`, config);
    const result = await response.json();
    if(result.success) {
      toast.success('Password reset link sent to your email!');
    }else {
      toast.error(result.error || "Something went wrong!");
    }
    handleRedirection(result)
    return result;
  } catch (e) {
    return e;
  }
});
