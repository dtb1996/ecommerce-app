import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { Button } from "@/components/common/Button/Button"
import styles from "./OrderSuccess.module.scss"
import { useCheckout } from "@/context/CheckoutContext"
import { useCart } from "@/context/CartContext"

export default function OrderSuccess() {
    const { resetCheckout } = useCheckout()
    const { clearCart } = useCart()
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get("session_id")
    const [order, setOrder] = useState<any>(null)

    useEffect(() => {
        if (!sessionId) return

        const fetchOrder = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/payment/session/${sessionId}`
                )
                const data = await res.json()
                setOrder(data)
            } catch (err) {
                console.error("Error fetching order details:", err)
            }
        }

        fetchOrder()
    }, [sessionId])

    if (!order) {
        return <p>Loading order details...</p>
    }

    const { shippingInfo, items } = order

    const handleSuccessConfirm = () => {
        resetCheckout()
        clearCart()
    }

    return (
        <div className={styles.container}>
            <h2>Order Confirmed</h2>
            <p>Thank you for your purchase, {shippingInfo?.fullName}!</p>

            <ul>
                {items.map((item: any) => (
                    <li key={item.id}>
                        {item.name} × {item.quantity}
                    </li>
                ))}
            </ul>

            <Link to="/">
                <Button onClick={handleSuccessConfirm}>Start New Order</Button>
            </Link>
        </div>
    )
}
