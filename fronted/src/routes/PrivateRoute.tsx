import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
import { parseJwt } from '../utils/jwt'

export default function PrivateRoute() {
  const token = useAppSelector(s => s.auth.token)
  const u = token ? parseJwt(token) : null
  if (!u || u.exp * 1000 < Date.now()) return <Navigate to="/login" replace />
  return <Outlet />
}
