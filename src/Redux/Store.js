import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "./Slice/taskSlice"
import stageReducer from "./Slice/stageSlice"
import projectReducer from "./Slice/projectSlice"

 
 export const Store = configureStore({
  reducer: {
    task: taskReducer,
    stage:stageReducer,
    project:projectReducer
  },
})