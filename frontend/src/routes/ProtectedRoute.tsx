import { useAuth } from "@/context/AuthContext"
import { Navigate, useLocation } from "react-router-dom"

import React from "react"

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        const redirectPath = location.pathname + location.search

        return <Navigate to={`/login?redirect=${encodeURIComponent(redirectPath)}`} replace />
    }

    return children
}

export default ProtectedRoute
