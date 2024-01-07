import { createSlice } from "@reduxjs/toolkit";
export const stopEtasSlice = createSlice({
  name: "stopEtas",
  initialState: {
    stopEtas: null
  },
  reducers: {
    setStopEtas: (state, action) => {
      state.stopEtas = action.payload
    },
  },
});

export const selectStopEtas = (state) => state.stopEtas
export const { setStopEtas } = stopEtasSlice.actions
export default stopEtasSlice.reducer;