import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './context/PostContext'

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
})

export default store
