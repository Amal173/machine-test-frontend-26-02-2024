import { configureStore } from '@reduxjs/toolkit'
//Importing the reducer from countSlice
import taskReducer from "./Slice/taskSlice"

 
 export const Store = configureStore({
  reducer: {
    task: taskReducer,
  },
})