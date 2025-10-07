import { supabase } from "@/api/supabaseClient"
import type { User } from "@/types/User"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// type User = {
//     id: string
//     email: string | null
// } | null

type AuthContextType = {
    user: User
    loading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check existing session when app loads
        const session = supabase.auth.getSession().then(({ data }) => {
            setUser(data.session?.user ?? null)
            setLoading(false)
        })

        // Listen for login/logout events
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    async function signIn(email: string, password: string) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            console.log("Sign in error:", error)
        }
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut()

        if (error) {
            console.log("Sign out error:", error)
        }
    }

    const value: AuthContextType = { user, loading, signIn, signOut }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context
}
