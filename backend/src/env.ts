import dotenv from "dotenv"

dotenv.config()

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? ""
export const PORT = process.env.PORT ?? 5000
export const FRONTEND_URL = process.env.FRONTEND_URL ?? ""
export const SUPABASE_URL = process.env.SUPABASE_URL ?? ""
export const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY ?? ""
