import { supabase } from "@/api/supabaseClient"
import { Button } from "@/components/common/Button/Button"
import { useAuth } from "@/context/AuthContext"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"

export default function LoginPage() {
    const { user, signOut } = useAuth()

    if (!user) {
        return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
    }

    return (
        <div>
            Logged in as {user.email}
            <Button onClick={signOut}>Sign Out</Button>
        </div>
    )
}
