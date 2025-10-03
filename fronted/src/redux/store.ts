import { configureStore } from '@reduxjs/toolkit'
import auth from './features/auth/authSlice'
import projects from './features/projects/projectsSlice'
import tasks from './features/tasks/tasksSlice'

export const store = configureStore({
  reducer: { auth, projects, tasks }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
