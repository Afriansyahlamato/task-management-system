import axios, { InternalAxiosRequestConfig } from 'axios'
import { store } from '../redux/store'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = store.getState().auth.token
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})

export default api
