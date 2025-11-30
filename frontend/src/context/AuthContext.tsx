import { supabase } from "@/api/supabaseClient"
import type { Session, User, AuthError } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type AuthContextType = {
    user: User | null
    session: Session | null
    loading: boolean
    signUp: (
        email: string,
        password: string
    ) => Promise<{ data: { user: User | null; session: Session | null }; error: AuthError | null }>
    signIn: (
        email: string,
        password: string
    ) => Promise<{ data: { user: User | null; session: Session | null }; error: AuthError | null }>
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
            setSession(data.session ?? null)
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

    const signUp = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) {
            console.error("Sign up error:", error)
        }
        return { data, error }
    }

    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            console.error("Sign in error:", error)
        }
        return { data, error }
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error("Sign out error:", error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within an AuthProvider")
    return context
}
