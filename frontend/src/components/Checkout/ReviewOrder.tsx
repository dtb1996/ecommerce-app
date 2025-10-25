import { Button } from "@/components/common/Button/Button"
import { useCart } from "@/context/CartContext"
import { useCheckout } from "@/context/CheckoutContext"
import styles from "./ReviewOrder.module.scss"

export default function ReviewOrder() {
    const { shippingInfo } = useCheckout()
    const { cartItems, totalItems, totalPrice } = useCart()

    if (!shippingInfo) {
        return <p>Please fill out your shipping info first.</p>
    }

    const handlePayment = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/payment/create-checkout-session`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ items: cartItems, shippingInfo }),
                }
            )

            const data = await res.json()
            if (data.url) {
                window.location.href = data.url // Redirect to Stripe checkout
            }
        } catch (err) {
            console.error("Error creating checkout session:", err)
        }
    }

    return (
        <div className={styles.review}>
            <>
                <h2>Review Your Order</h2>

                <h3>Shipping Info</h3>
                <div className={styles.shipping}>
                    <p>{shippingInfo.fullName}</p>
                    <p>{shippingInfo.email}</p>
                    <p>{shippingInfo.address}</p>
                    <p>
                        {shippingInfo.city}, {shippingInfo.zip}
                    </p>
                </div>

                <h3>Cart Items</h3>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <span>
                                {item.name} × {item.quantity}
                            </span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div className={styles.summary}>
                    <p>
                        <strong>Total Items:</strong> {totalItems}
                    </p>
                    <p className={styles.totalPrice}>
                        <strong>Total Price:</strong> ${totalPrice}
                    </p>
                </div>

                <Button onClick={handlePayment} children={"Confirm & Pay"} />
            </>
            <div className={styles.demoPayment} aria-label="Demo payment">
                <p>
                    If you would like to test the payment flow, use the following Stripe test card
                    info:
                </p>
                <p className={styles.demoCardInfo}>
                    <b>Card number:</b> 4242 4242 4242 4242
                    <br />
                    <b>Exp:</b> any future date
                    <br />
                    <b>CVC:</b> any 3 digits
                </p>
                <p>This is Stripe test mode - the card will not be charged.</p>
            </div>
        </div>
    )
}
