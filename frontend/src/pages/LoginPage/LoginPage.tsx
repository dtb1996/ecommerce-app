import { Button } from "@/components/common/Button/Button"
import { useAuth } from "@/context/AuthContext"
import styles from "./LoginPage.module.scss"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { supabase } from "@/api/supabaseClient"
import { signUpUser, signInUser, resendConfirmationEmail, deleteUser } from "@/utils/authUtils"

type FormInputs = {
    email: string
    password: string
}

export default function LoginPage() {
    const { user, signOut } = useAuth()
    const { register, handleSubmit, reset } = useForm<FormInputs>()
    const [isRegister, setIsRegister] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [justRegistered, setJustRegistered] = useState(false)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<FormInputs> = async ({ email, password }) => {
        setMessage(null)

        try {
            if (isRegister) {
                const { data, error } = await signUpUser(email, password)
                if (error) return setMessage(error.message)

                if (!data.user?.confirmed_at) {
                    setMessage("Please check your email to confirm your account before signing in.")
                    setJustRegistered(true)
                    reset()
                    return
                }
            } else {
                const { data, error } = await signInUser(email, password)
                if (error) return setMessage(error.message)
                if (!data.session) {
                    setMessage("Please verify your email before signing in.")
                    return
                }

                setJustRegistered(false)

                const redirectTo = decodeURIComponent(searchParams.get("redirect") || "/")
                navigate(redirectTo, { replace: true })
            }
        } catch (err) {
            console.error(err)
            setMessage("An unexpected error occurred.")
        }
    }

    const handleSignOut = () => {
        reset()
        signOut()
        setJustRegistered(false)
        setMessage(null)
    }

    const handleDeleteAccount = async () => {
        if (!user) return
        if (!window.confirm("Are you sure you want to delete your account? This cannot be undone."))
            return

        try {
            await deleteUser(user.id)
            alert("Account deleted successfully")
            await supabase.auth.signOut()
        } catch (err) {
            console.error(err)
            alert("Error deleting account")
        }
    }

    const handleResendConfirmation = async () => {
        const email = (
            document.querySelector<HTMLInputElement>("input[name='email']")?.value || ""
        ).trim()
        if (!email) return setMessage("Please enter your email first.")

        try {
            const { error } = await resendConfirmationEmail(email)
            if (error) setMessage(error.message)
            else setMessage("Confirmation email sent! Please check your inbox.")
        } catch (err) {
            console.error(err)
            setMessage("Failed to send confirmation email.")
        }
    }

    if (!user) {
        return (
            <div className={styles.login}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>{isRegister ? "Create an account" : "Please sign in to continue"}</h3>
                    <input {...register("email", { required: true })} placeholder="Email" />
                    <input
                        {...register("password", { required: true })}
                        type="password"
                        placeholder="Password"
                    />
                    <Button>{isRegister ? "Register" : "Sign In"}</Button>
                </form>

                {message && <p className={styles.message}>{message}</p>}

                {justRegistered && (
                    <Button onClick={handleResendConfirmation}>Resend Confirmation Email</Button>
                )}

                <div className={styles.register}>
                    {isRegister ? (
                        <>
                            <p>Already have an account?</p>
                            <a
                                onClick={() => {
                                    setIsRegister(false)
                                    setIsRegister(false)
                                }}
                            >
                                Sign In
                            </a>
                        </>
                    ) : (
                        <>
                            <p>Don't have an account?</p>
                            <a onClick={() => setIsRegister(true)}>Register Now</a>
                        </>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.login}>
            Logged in as {user.email}
            <Button onClick={handleSignOut}>Sign Out</Button>
            <Button onClick={handleDeleteAccount}>Delete Account</Button>
        </div>
    )
}
