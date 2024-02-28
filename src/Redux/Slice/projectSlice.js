import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  projects: [],
  projectAddModal:false,
Project:[]

}

export const CreateProject = createAsyncThunk("project/CreateProject", async (data) => {
    console.log(data);
    const response = await axios.post(`http://localhost:7070/project`, data);
    return response.data;
  }
  )
export const UpdateProject = createAsyncThunk("project/UpdateProject", async ({id,values}) => {
    console.log(values,"valur");
    const response = await axios.put(`http://localhost:7070/project/${id}`, values);
    return response.data;
  }
  )

export const getProject = createAsyncThunk("project/getProject", async () => {
    const response = await axios.get(`http://localhost:7070/project`);
    return response.data;
  }
  )
export const getOneProject = createAsyncThunk("project/getOneProject", async (id) => {
    console.log(id);
    const response = await axios.get(`http://localhost:7070/project/${id}`);
    return response.data;
  }
  )

export const deleteProject = createAsyncThunk("project/deleteProject", async (id) => {
    console.log(id);
    const response = await axios.delete(`http://localhost:7070/project/${id}`);
    return response.data;
  }
  )


export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    showProjectAddModal: (state,{payload}) => {
        console.log(payload);
      state.projectAddModal=payload
    },
  },
  extraReducers:(builder)=>{
      builder.addCase(getProject.fulfilled, (state, { payload }) => {
          state.projects = payload.project 
        })
      builder.addCase(getOneProject.fulfilled, (state, { payload }) => {
          state.Project = payload.project
          
        })

    }
})

export const {showProjectAddModal } = projectSlice.actions

export default projectSlice.reducer