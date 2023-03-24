import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentVideo: {},
  loading: false,
  error: false,
}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    videoStart: (state) => {
      state.loading = true
    },
    videoSuccess: (state, action) => {
      state.loading = false
      state.currentVideo = action.payload
    },
    videoFailure: (state) => {
      state.loading = false
      state.error = true
    },
    videoLike: (state, action) => {
        const userId = action.payload
        if(!state.currentVideo.likes.includes(userId)){
            state.currentVideo.likes.push(userId)
            state.currentVideo.dislikes.splice(
                state.currentVideo.dislikes.findIndex((uId)=> uId === userId),
                1
            )
        }
    },
    videoDisLike: (state, action) => {
        const userId = action.payload
        if(!state.currentVideo.dislikes.includes(userId)){
            state.currentVideo.dislikes.push(userId)
            state.currentVideo.likes.splice(
                state.currentVideo.likes.findIndex((uId)=> uId === userId),
                1
            )
        }
    }
  },
})

export const { videoStart, videoSuccess, videoFailure, videoLike, videoDisLike } = videoSlice.actions

export default videoSlice.reducer