import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  stages: [],
  addStagesModal:false

}

export const CreateStages = createAsyncThunk("stage/CreateStages", async (data) => {
    console.log(data);
    const response = await axios.post(`http://localhost:7070/stages`, data);
    return response.data;
  }
  )

export const getStages = createAsyncThunk("stage/getStages", async () => {
    const response = await axios.get(`http://localhost:7070/stages`);
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
    // handleEditMode: (state,{payload}) => {
    //   state.editMode=payload
    // },
  },
  extraReducers:(builder)=>{
      builder.addCase(getStages.fulfilled, (state, { payload }) => {
          state.stages = payload.stage
          
        })

    }
})

export const {showAddStagesModal } = stageSlice.actions

export default stageSlice.reducer