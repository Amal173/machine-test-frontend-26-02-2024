import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  user:[],
  userData:{},


}

export const fetchUserData = createAsyncThunk("user/fetchUserData",async () => {
    const response = await axios.get(`http://localhost:7070/user`);
    return response.data;
  }
)


export const fetchOneUserData = createAsyncThunk("user/fetchOneUserData",async () => {
    const response = await axios.get(`http://localhost:7070/user`);
    return response.data;
  }
)


export const CreateUser = createAsyncThunk("user/CreateUser",async (values) => {
  console.log(values);
    const response = await axios.post(`http://localhost:7070/user`,values);
    return response.data;
  }
)

export const LoginUser = createAsyncThunk("user/LoginUser",async (CreateUser) => {
  console.log(CreateUser);
    const response = await axios.post(`http://localhost:7070/user/login`,CreateUser , { withCredentials: true });
    console.log(response.data);
    localStorage.setItem('userId', response.data.user._id)
    localStorage.setItem('username', response.data.user.username)
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