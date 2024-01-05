import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/Todo";
import axiosReducer from './slice/Axios'

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    axios: axiosReducer
  },
});