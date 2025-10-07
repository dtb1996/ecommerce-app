import { useAuth } from "@/context/AuthContext"
import { Navigate } from "react-router-dom"

import React from "react"

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    const { user, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute
