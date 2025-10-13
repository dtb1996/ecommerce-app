import { Button } from "@/components/common/Button/Button"
import { useCart } from "@/context/CartContext"
import { useCheckout } from "@/context/CheckoutContext"

export default function SuccessPage() {
    const { shippingInfo, resetCheckout } = useCheckout()
    const { clearCart } = useCart()

    const handleSuccessConfirm = () => {
        resetCheckout()
        clearCart()
    }

    return (
        <>
            <h1>Order Confirmed</h1>
            <p>Thank you for your purchase, {shippingInfo?.fullName}!</p>
            <Button onClick={handleSuccessConfirm} children={"Start New Order"} />
        </>
    )
}
