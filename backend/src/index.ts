import { FRONTEND_URL, PORT } from "./env"
import cors from "cors"
import express from "express"
import paymentRoutes from "./routes/payment"
import imageProxy from "./routes/imageProxy"
import userRoutes from "./routes/user"

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
app.use("/api/image", imageProxy)
app.use("/api/user", userRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
