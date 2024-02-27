import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "./Slice/taskSlice"
import stageReducer from "./Slice/stageSlice"

 
 export const Store = configureStore({
  reducer: {
    task: taskReducer,
    stage:stageReducer
  },
})