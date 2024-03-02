import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import API_BASE_URL from './../../config/apiConfig'
const initialState = {
  projects: [],
  projectAddModal: false,
  userAddMoodal: false,
  shareModalVisible: false,
  Project: []

}

export const CreateProject = createAsyncThunk("project/CreateProject", async (data) => {
  const response = await axios.post(`${API_BASE_URL}/project`, data);
  return response.data;
}
)
export const UpdateProject = createAsyncThunk("project/UpdateProject", async ({ id, data }) => {
  const response = await axios.put(`${API_BASE_URL}/project/${id}`, data);
  return response.data;
}
)

export const getProject = createAsyncThunk("project/getProject", async (id) => {
  const response = await axios.get(`${API_BASE_URL}/project/${id}`);
  return response.data;
}
)
export const getOneProject = createAsyncThunk("project/getOneProject", async (id) => {
  const response = await axios.get(`${API_BASE_URL}/project/single/${id}`);
  return response.data;
}
)

export const deleteProject = createAsyncThunk("project/deleteProject", async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/project/${id}`);
  return response.data;
}
)


export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    showProjectAddModal: (state, { payload }) => {
      state.projectAddModal = payload
    },
    showuserAddModal: (state, { payload }) => {
      state.userAddMoodal = payload
    },
    showShareProjectModal: (state, { payload }) => {
      state.shareModalVisible = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProject.fulfilled, (state, { payload }) => {
      state.projects = payload.project
    })
    builder.addCase(getOneProject.fulfilled, (state, { payload }) => {
      state.Project = payload.project

    })

  }
})

export const { showProjectAddModal,showuserAddModal,showShareProjectModal } = projectSlice.actions

export default projectSlice.reducer