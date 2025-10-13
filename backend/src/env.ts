import dotenv from "dotenv"

dotenv.config()

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? ""
export const PORT = process.env.PORT ?? 5000
