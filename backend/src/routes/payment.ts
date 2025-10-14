import express from "express"
import Stripe from "stripe"
import { STRIPE_SECRET_KEY, FRONTEND_URL } from "../env.ts"

const router = express.Router()

const stripe = new Stripe(STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2024-06-20",
})

router.post("/create-checkout-session", async (req, res) => {
    try {
        const { items } = req.body

        const lineItems = items.map((item: any) => ({
            price_data: {
                currency: "usd",
                product_data: { name: item.name },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${FRONTEND_URL}/checkout/success`,
            cancel_url: `${FRONTEND_URL}/cart`,
        })

        res.json({ url: session.url })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Failed to create checkout session" })
    }
})

export default router
