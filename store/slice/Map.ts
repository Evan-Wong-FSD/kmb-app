import { createSlice } from "@reduxjs/toolkit"
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
})

export const map = (state) => state.map
export const { changeLocation } = mapSlice.actions
export default mapSlice.reducer