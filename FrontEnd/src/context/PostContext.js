import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api, {
  fetchPosts as apiFetchPosts,
  createPost as apiCreatePost,
  updatePost as apiUpdatePost,
  deletePost as apiDeletePost,
} from '../services/api'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await apiFetchPosts()
  console.log('Resposta completa da API:', response)
  return response.data
})

export const createPost = createAsyncThunk('posts/createPost', async (newPost) => {
  const response = await apiCreatePost(newPost)
  return response.data
})

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, updatedPost }) => {
  const response = await apiUpdatePost(id, updatedPost)
  return response.data
})

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await apiDeletePost(id)
  return id
})

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex((post) => post.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post.id !== action.payload)
      })
  },
})

export default postsSlice.reducer
