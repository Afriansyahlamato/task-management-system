import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { UserPayload } from '../../../utils/jwt'
import { parseJwt } from '../../../utils/jwt'

type AuthState = { token: string | null; user: UserPayload | null }
const LS = 'tm.auth'

function load(): AuthState {
  try {
    const raw = localStorage.getItem(LS)
    if (!raw) return { token: null, user: null }
    const { token } = JSON.parse(raw)
    const user = token ? parseJwt(token) : null
    if (!user || user.exp * 1000 < Date.now()) { localStorage.removeItem(LS); return { token: null, user: null } }
    return { token, user }
  } catch {
    return { token: null, user: null }
  }
}

const slice = createSlice({
  name: 'auth',
  initialState: load(),
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.user = parseJwt(action.payload)
      localStorage.setItem(LS, JSON.stringify({ token: state.token }))
    },
    logout: (state) => {
      state.token = null
      state.user = null
      localStorage.removeItem(LS)
    }
  }
})

export const { loginSuccess, logout } = slice.actions
export default slice.reducer
