// PublicRoute.tsx
import React from "react"
import { Navigate } from "react-router-dom"

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null
}

const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    // Already logged in → Redirect to dashboard
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default PublicRoute