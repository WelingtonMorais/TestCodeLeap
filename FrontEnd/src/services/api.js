import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000'

const api = axios.create({
  baseURL: BASE_URL,
})

export const fetchPosts = () => api.get('/posts/')
export const createPost = (newPost) => api.post('/posts/', newPost)
export const updatePost = (id, updatedPost) => api.patch(`/posts/${id}/`, updatedPost)
export const deletePost = (id) => api.delete(`/posts/${id}/`)

export default api
