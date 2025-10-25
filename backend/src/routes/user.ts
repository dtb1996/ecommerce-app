import { Router } from "express"
import { createClient } from "@supabase/supabase-js"
import { SUPABASE_URL, SUPABASE_SERVICE_KEY } from "../env.ts"

const router = Router()

// Initialize Supabase admin client on the server
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

router.post("/delete", async (req, res) => {
    try {
        const { user_id } = req.body
        if (!user_id) return res.status(400).json({ error: "Missing user_id" })

        const { error } = await supabaseAdmin.auth.admin.deleteUser(user_id)

        if (error) {
            console.error(error)
            return res.status(500).json({ error: error.message })
        }

        res.status(200).json({ success: true })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Server error" })
    }
})

export default router
