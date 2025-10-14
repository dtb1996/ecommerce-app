import { Outlet } from "react-router-dom"
import styles from "./CheckoutPage.module.scss"
import { CheckoutProvider } from "@/context/CheckoutContext"

export default function CheckoutPage() {
    return (
        <CheckoutProvider>
            <div className={styles.checkout}>
                <h1>Checkout</h1>
                <div className={styles.checkoutSteps}>
                    <p>Step 1: Shipping → Step 2: Review → Step 3: Success</p>
                </div>

                <Outlet />
            </div>
        </CheckoutProvider>
    )
}
