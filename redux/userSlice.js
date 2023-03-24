import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.currentUser = action.payload
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = true
    },
    logout: (state, action) => {
      state.loading = false
      state.currentUser = null
    },
    subscription: (state, action) => {
      const userId = action.payload
      if(state.currentUser.subscribedUsers.includes(userId)){
        state.currentUser.subscribedUsers.splice(state.currentUser.subscribedUsers.findIndex(uId=> userId===uId))
      }else{
        state.currentUser.subscribedUsers.push(userId)        
      }
    }
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, subscription } = userSlice.actions

export default userSlice.reducer