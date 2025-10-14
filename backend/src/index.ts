import { FRONTEND_URL, PORT } from "./env.ts"
import cors from "cors"
import express from "express"
import paymentRoutes from "./routes/payment.ts"

const app = express()

app.use(
    cors({
        origin: FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
    }),
)

app.use(express.json())
app.use("/api/payment", paymentRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
