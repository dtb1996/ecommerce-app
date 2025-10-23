import { supabase } from "@/api/supabaseClient"
import type { Session, User } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type AuthContextType = {
    user: User | null
    session: Session | null
    loading: boolean
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUser() {
            const { data } = await supabase.auth.getSession()
            setUser(data.session?.user ?? null)
            setLoading(false)
        }

        loadUser()

        // Listen for login/logout events
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            setSession(session)
            setLoading(false)
        })

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    async function signUp(email: string, password: string) {
        const { error } = await supabase.auth.signUp({ email, password })

        if (error) {
            console.log("Sign in error:", error)
        }
    }

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

    const value: AuthContextType = { user, session, loading, signUp, signIn, signOut }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context
}
