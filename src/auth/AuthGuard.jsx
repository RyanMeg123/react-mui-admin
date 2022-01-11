import React from 'react'
import useAuth from 'hooks/useAuth'
import { Navigate } from 'react-router-dom'

const AuthGuard = ({ children }) => {
    const { isAuthenticated } = useAuth()

    return <>{!isAuthenticated ? children : <Navigate to="/session/signin" />}</>
}

export default AuthGuard
