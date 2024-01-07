import { createSlice } from "@reduxjs/toolkit";
export const mapSlice = createSlice({
  name: "map",
  initialState: {
    location: {
      coords: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }
    },
  },
  reducers: {
    changeLocation: (state, action) => {
      state.location = action.payload
    },
  },
});

export const map = (state) => state.map; // <---加入這行
export const { changeLocation } = mapSlice.actions; // <-- 加上這行
export default mapSlice.reducer;