import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import API_BASE_URL from './../../config/apiConfig'

const initialState = {
  stages: [],
  stage: [],
  addStagesModal:false,

}

export const CreateStages = createAsyncThunk("stage/CreateStages", async ({id,values}) => {
    const response = await axios.post(`${API_BASE_URL}/stages/${id}`, values);
    return response.data;
  }
  )
export const UpdateStage = createAsyncThunk("stage/UpdateStage", async ({id,values}) => {
    const response = await axios.put(`${API_BASE_URL}/stages/${id}`, values);
    return response.data;
  }
  )

export const getStages = createAsyncThunk("stage/getStages", async ({id}) => {
    const response = await axios.get(`${API_BASE_URL}/stages/${id}`);
    return response.data;
  }
  )
export const getOneStage = createAsyncThunk("stage/getOneStage", async (id) => {
    const response = await axios.get(`${API_BASE_URL}/stages/single/${id}`);
    return response.data;
  }
  )

export const deleteStage = createAsyncThunk("stage/deleteStage", async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/stages/${id}`);
    return response.data;
  }
  )


export const stageSlice = createSlice({
  name: 'stage',
  initialState,
  reducers: {
    showAddStagesModal: (state,{payload}) => {
      state.addStagesModal=payload
    },
  },
  extraReducers:(builder)=>{
      builder.addCase(getStages.fulfilled, (state, { payload }) => {
          state.stages = payload.stage
          
        })
      builder.addCase(getOneStage.fulfilled, (state, { payload }) => {
          state.stage = payload.stage
          
        })

    }
})

export const {showAddStagesModal,handleEditmodal } = stageSlice.actions

export default stageSlice.reducer