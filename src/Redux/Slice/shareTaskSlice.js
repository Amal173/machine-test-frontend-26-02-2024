import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import API_BASE_URL from './../../config/apiConfig'
const initialState = {
    sharedTasks: [],
    sharedTask: {},
}

export const CreateSharedTask = createAsyncThunk("shared/CreateSharedTask", async ({ sharedTo, taskId, sharedFrom }) => {
    const response = await axios.post(`${API_BASE_URL}/shared-task`, { sharedTo, taskId, sharedFrom });
    return response.data;
})

export const UpdateSharedTask = createAsyncThunk("shared/UpdateSharedTask", async ({ id, data }) => {
    const response = await axios.put(`${API_BASE_URL}/shared-task`, data);
    return response.data;
})

export const getSharedTasks = createAsyncThunk("shared/getSharedTasks", async (id) => {
    console.log(id);
    const response = await axios.get(`${API_BASE_URL}/shared-task/${id}`);
    return response.data;
})

export const getSharedTask = createAsyncThunk("shared/getSharedTask", async (id) => {
    const response = await axios.get(`${API_BASE_URL}/shared-task/single/${id}`);
    return response.data;
})

export const deleteSharedTask = createAsyncThunk("shared/deleteSharedTask", async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/shared-task/${id}`);
    return response.data;
})


export const shareTaskSlice = createSlice({
    name: 'SharedTask',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getSharedTasks.fulfilled, (state, { payload }) => {
            state.sharedTasks = payload.task
        })

        builder.addCase(getSharedTask.fulfilled, (state, { payload }) => {
            state.sharedTask = payload.task

        })

    }
})

export const { showShareTaskModal } = shareTaskSlice.actions

export default shareTaskSlice.reducer