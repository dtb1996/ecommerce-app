import dotenv from "dotenv"
dotenv.config()

import express from "express"
import paymentRoutes from "./routes/payment.ts" // after dotenv.config()

const app = express()
app.use(express.json())

app.use("/api/payment", paymentRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
