import { supabase } from "@/api/supabaseClient"

export async function signUpUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password })

    return { data, error }
}

export async function signInUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    return { data, error }
}

export async function resendConfirmationEmail(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({ email })

    return { data, error }
}

export async function deleteUser(userId: string) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
    })

    if (!res.ok) {
        throw new Error("Failed to delete account")
    }

    return res.json()
}
