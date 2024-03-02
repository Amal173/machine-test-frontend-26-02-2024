import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import API_BASE_URL from './../../config/apiConfig'

const initialState = {
  tasks: [],
  singleTask: {},
  addTaskModal: false,
  editMode: false
}

export const CreateTask = createAsyncThunk("task/CreateTask", async (data) => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, data);
  return response.data;
}
)

export const UpdateTask = createAsyncThunk("task/UpdateTask", async ({ id, data }) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, data);
  return response.data;
}
)

export const updateTaskStatus = createAsyncThunk(
  'tasks/updateTaskStatus',
  async ({ taskId, newStatus }) => {
    await axios.put(`${API_BASE_URL}/tasks/status/${taskId}`, { newStatus });
    return { taskId, newStatus };
  }
);

export const getTasks = createAsyncThunk("task/getTasks", async ({ id }) => {
  const response = await axios.get(`${API_BASE_URL}/tasks/${id}`);
  return response.data;
}
)

export const getSingleTask = createAsyncThunk("task/getSingleTask", async (id) => {
  const response = await axios.get(`${API_BASE_URL}/tasks/single/${id}`);
  return response.data;
}
)
export const deleteTask = createAsyncThunk("task/deleteTask", async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  return response.data;
}
)


export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    showAddTaskModal: (state, { payload }) => {
      state.addTaskModal = payload
    },
    handleEditMode: (state, { payload }) => {
      state.editMode = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, { payload }) => {
      state.tasks = payload.tasks;

    })
    builder.addCase(getSingleTask.fulfilled, (state, { payload }) => {
      state.singleTask = payload.tasks;

    })

  }
})

export const { showAddTaskModal, handleEditMode } = taskSlice.actions

export default taskSlice.reducer