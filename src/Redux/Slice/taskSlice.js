import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  tasks: [],
  singleTask: {},
  addTaskModal:false,
  editMode:false
}

export const CreateTask = createAsyncThunk("task/CreateTask", async (data) => {
    console.log(data);
    const response = await axios.post(`http://localhost:7070/tasks`, data);
    return response.data;
  }
  )
export const UpdateTask = createAsyncThunk("task/UpdateTask", async ({id,data}) => {
    console.log(data,id);
    const response = await axios.put(`http://localhost:7070/tasks/${id}`, data);
    return response.data;
  }
  )

  export const updateTaskStatus = createAsyncThunk(
    'tasks/updateTaskStatus',
    async ({ taskId, newStatus }) => {
        console.log(taskId,newStatus);
      await axios.put(`http://localhost:7070/tasks/status/${taskId}`, { newStatus });
      return { taskId, newStatus };
    }
  );

export const getTasks = createAsyncThunk("task/getTasks", async () => {
    const response = await axios.get(`http://localhost:7070/tasks`);
    return response.data;
  }
  )

export const getSingleTask = createAsyncThunk("task/getSingleTask", async (id) => {
    console.log(id);
    const response = await axios.get(`http://localhost:7070/tasks/${id}`);
    return response.data;
  }
  )
export const deleteTask = createAsyncThunk("task/deleteTask", async (id) => {
    console.log(id);
    const response = await axios.delete(`http://localhost:7070/tasks/${id}`);
    return response.data;
  }
  )


export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    showAddTaskModal: (state,{payload}) => {
      state.addTaskModal=payload
    },
    handleEditMode: (state,{payload}) => {
      state.editMode=payload
    },
  },
  extraReducers:(builder)=>{
      builder.addCase(getTasks.fulfilled, (state, { payload }) => {
          state.tasks = payload.tasks;
          
        })
      builder.addCase(getSingleTask.fulfilled, (state, { payload }) => {
          state.singleTask = payload.tasks;
          
        })

    }
})

export const {showAddTaskModal,handleEditMode } = taskSlice.actions

export default taskSlice.reducer