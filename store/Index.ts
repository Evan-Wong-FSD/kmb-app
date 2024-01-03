import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/Todo";

export const store = configureStore({
  reducer: {
    todo: todoReducer
  },
});