import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  stages: [],
  stage: [],
  addStagesModal:false,

}

export const CreateStages = createAsyncThunk("stage/CreateStages", async (data) => {
    console.log(data);
    const response = await axios.post(`http://localhost:7070/stages`, data);
    return response.data;
  }
  )
export const UpdateStage = createAsyncThunk("stage/UpdateStage", async ({id,values}) => {
    console.log(values);
    const response = await axios.put(`http://localhost:7070/stages/${id}`, values);
    return response.data;
  }
  )

export const getStages = createAsyncThunk("stage/getStages", async () => {
    const response = await axios.get(`http://localhost:7070/stages`);
    return response.data;
  }
  )
export const getOneStage = createAsyncThunk("stage/getOneStage", async (id) => {
    console.log(id);
    const response = await axios.get(`http://localhost:7070/stages/${id}`);
    return response.data;
  }
  )

export const deleteStage = createAsyncThunk("stage/deleteStage", async (id) => {
    console.log(id);
    const response = await axios.delete(`http://localhost:7070/stages/${id}`);
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