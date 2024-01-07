import { configureStore } from "@reduxjs/toolkit"
import axiosReducer from './slice/Axios'
import mapReducer from './slice/Map'

export const store = configureStore({
  reducer: {
    axios: axiosReducer,
    map: mapReducer
  }
})