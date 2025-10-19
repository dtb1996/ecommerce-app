import { Button } from "@/components/common/Button/Button"
import { useCart } from "@/context/CartContext"
import { useCheckout } from "@/context/CheckoutContext"
import styles from "./OrderSuccess.module.scss"
import { Link } from "react-router-dom"

export default function OrderSuccess() {
    const { shippingInfo, resetCheckout } = useCheckout()
    const { clearCart } = useCart()

    const handleSuccessConfirm = () => {
        resetCheckout()
        clearCart()
    }

    return (
        <div className={styles.container}>
            <h2>Order Confirmed</h2>
            <p>Thank you for your purchase, {shippingInfo?.fullName}!</p>
            <Link to="/">
                <Button onClick={handleSuccessConfirm}>Start New Order</Button>
            </Link>
        </div>
    )
}
