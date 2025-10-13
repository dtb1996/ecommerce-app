import { Button } from "@/components/common/Button/Button"
import { useCart } from "@/context/CartContext"
import { useCheckout } from "@/context/CheckoutContext"

export default function ReviewPage() {
    const { shippingInfo } = useCheckout()
    const { cartItems } = useCart()

    if (!shippingInfo) {
        return <p>Please fill out your shipping info first.</p>
    }

    const handlePayment = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/payment/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: cartItems }),
            })

            const data = await res.json()
            if (data.url) {
                window.location.href = data.url // Redirect to Stripe checkout
            }
        } catch (err) {
            console.error("Error creating checkout session:", err)
        }
    }

    return (
        <>
            <div>
                <h2>Review Your Order</h2>

                <h3>Shipping Info</h3>
                <p>{shippingInfo.fullName}</p>
                <p>{shippingInfo.email}</p>
                <p>
                    {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.zip}
                </p>

                <h3>Cart Items</h3>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            {item.name} × {item.quantity} — $
                            {(item.price * item.quantity).toFixed(2)}
                        </li>
                    ))}
                </ul>

                <Button onClick={handlePayment} children={"Confirm & Pay"} />
            </div>
            <div aria-label="Demo payment">
                <p>If you'd like to test payment quickly, use Stripe test card:</p>
                <pre>Card number: 4242 4242 4242 4242 Exp: any future date CVC: any 3 digits</pre>
                <p>We’re in Stripe test mode — these are fake cards and won’t be charged.</p>
            </div>
        </>
    )
}
