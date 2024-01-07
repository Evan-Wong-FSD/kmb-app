import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/Todo";
import axiosReducer from './slice/Axios'
import stopEtasReducer from './slice/StopEtas'
import mapReducer from './slice/Map'

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    axios: axiosReducer,
    stopEtas: stopEtasReducer,
    map: mapReducer
  }
})