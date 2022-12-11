import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    access_token: null,
  },
  reducers: {
    setToken:(state,action)=>{
        state.access_token=action.payload.access_token
    },
    unsetToken:(state,action)=>{
        state.access_token=action.payload.access_token
    },
  },
})


export const { setToken,unsetToken } = authSlice.actions

export default authSlice.reducer