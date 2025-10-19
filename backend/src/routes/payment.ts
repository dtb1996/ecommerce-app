import express from "express"
import Stripe from "stripe"
import { STRIPE_SECRET_KEY, FRONTEND_URL } from "../env.ts"

const router = express.Router()

const stripe = new Stripe(STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2024-06-20",
})

const orders: Record<string, any> = {}

router.post("/create-checkout-session", async (req, res) => {
    try {
        const { items, shippingInfo } = req.body

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
            success_url: `${FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${FRONTEND_URL}/cart`,
        })

        orders[session.id] = {
            items,
            shippingInfo,
            createdAt: new Date(),
        }

        res.json({ url: session.url })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Failed to create checkout session" })
    }
})

router.get("/session/:id", (req, res) => {
    const session_id = req.params.id
    const order = orders[session_id]

    if (!order) {
        return res.status(404).json({ error: "Order not found" })
    }

    res.json(order)
})

export default router
