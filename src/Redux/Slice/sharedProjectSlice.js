import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import API_BASE_URL from './../../config/apiConfig'
const initialState = {
  sharedProjects: [],
  sharedProject: {},
  shareModalVisible: false,


}

export const CreateSharedProject = createAsyncThunk("shared/CreateSharedProject", async ({sharedTo,projectId,sharedFrom}) => {
    console.log(sharedTo);
   
  const response = await axios.post(`${API_BASE_URL}/shared-project`,{ sharedTo,projectId,sharedFrom});
  return response.data;
}
)
export const UpdateSharedProject = createAsyncThunk("shared/UpdateSharedProject", async ({ id, data }) => {
  const response = await axios.put(`${API_BASE_URL}/shared-project`, data);
  return response.data;
}
)

export const getSharedProjects = createAsyncThunk("shared/getSharedProjects", async (id) => {
    console.log(id);
  const response = await axios.get(`${API_BASE_URL}/shared-project/${id}`);
  return response.data;
}
)
export const getSharedProject = createAsyncThunk("shared/getSharedProject", async (id) => {
  const response = await axios.get(`${API_BASE_URL}/shared-project/single/${id}`);
  return response.data;
}
)

export const deleteSharedProject = createAsyncThunk("shared/deleteSharedProject", async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/shared-project/${id}`);
  return response.data;
}
)


export const shareProjectSlice = createSlice({
  name: 'SharedProject',
  initialState,
  reducers: {
    showShareProjectModal: (state, { payload }) => {
      state.shareModalVisible = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSharedProjects.fulfilled, (state, { payload }) => {
      state.sharedProjects = payload.project
    })
    builder.addCase(getSharedProject.fulfilled, (state, { payload }) => {
      state.sharedProject = payload.project

    })

  }
})

export const {showShareProjectModal } = shareProjectSlice.actions

export default shareProjectSlice.reducer