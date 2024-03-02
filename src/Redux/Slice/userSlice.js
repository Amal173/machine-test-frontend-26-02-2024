import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from './../../config/apiConfig'

const initialState = {
  user:[],
  userData:{},


}

export const fetchUserData = createAsyncThunk("user/fetchUserData",async () => {
    const response = await axios.get(`${API_BASE_URL}/user`);
    return response.data;
  }
)


export const fetchOneUserData = createAsyncThunk("user/fetchOneUserData",async () => {
    const response = await axios.get(`${API_BASE_URL}/user`);
    return response.data;
  }
)


export const CreateUser = createAsyncThunk("user/CreateUser",async (values) => {
  console.log(values);
    const response = await axios.post(`${API_BASE_URL}/user`,values);
    return response.data;
  }
)

export const LoginUser = createAsyncThunk("user/LoginUser",async (CreateUser) => {
  console.log(CreateUser);
    const response = await axios.post(`${API_BASE_URL}/user/login`,CreateUser , { withCredentials: true });
    localStorage.setItem('userId', response.data.user._id)
    localStorage.setItem('username', response.data.user.username)
    localStorage.setItem('role', response.data.user.role)
    return response.data;
  }
)




export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state,{payload}) => {
        state.user = payload;
      })
      .addCase(LoginUser.fulfilled, (state,{payload}) => {
        console.log(payload);
        state.userData = payload.user;
      })


    }
})


export default userSlice.reducer