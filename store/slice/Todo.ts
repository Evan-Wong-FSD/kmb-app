import { createSlice } from "@reduxjs/toolkit";
export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todolist: [
      { id: 1, name: "first todo on redux" },
      { id: 2, name: "second todo in list" },
    ],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todolist.push(action.payload);
    },
  },
});

export const selectTodo = (state) => state.todo; // <---加入這行
export const { addTodo } = todoSlice.actions; // <-- 加上這行
export default todoSlice.reducer;