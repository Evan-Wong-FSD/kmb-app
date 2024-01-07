import { createSlice } from "@reduxjs/toolkit"
// import axios from 'axios'

export const axiosSlice = createSlice({
  name: "axios",
  initialState: {
    // instance: axios.create({ baseURL: 'https://data.etabus.gov.hk' }),
    baseURL: 'https://data.etabus.gov.hk'
  },
  reducers: {},
})

export const Axios = (state) => state.axios
export default axiosSlice.reducer