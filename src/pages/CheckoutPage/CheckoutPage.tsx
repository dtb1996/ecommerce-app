import { Outlet } from "react-router-dom"
import styles from "./CheckoutPage.module.scss"

export default function CheckoutPage() {
    // TODO: add checkout form and validation (react-hook-form or Formik)
    return (
        <div className={styles.checkout}>
            <h1>Checkout</h1>
            <div className={styles.checkoutSteps}>
                <p>Step 1: Shipping → Step 2: Review → Step 3: Success</p>
            </div>

            <Outlet />
        </div>
    )
}
