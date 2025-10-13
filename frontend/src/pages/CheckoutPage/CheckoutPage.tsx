import { Outlet, useLocation, useNavigate } from "react-router-dom"
import styles from "./CheckoutPage.module.scss"
import { CheckoutProvider, useCheckout } from "@/context/CheckoutContext"
import { useEffect } from "react"

function CheckoutContent() {
    const { currentStep } = useCheckout()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        switch (currentStep) {
            case 1:
                if (location.pathname !== "./checkout/shipping") navigate("shipping")
                break
            case 2:
                if (location.pathname !== "./checkout/review") navigate("review")
                break
            case 3:
                if (location.pathname !== "./checkout/success") navigate("success")
                break
        }
    }, [currentStep, navigate, location.pathname])

    return <Outlet />
}

export default function CheckoutPage() {
    return (
        <CheckoutProvider>
            <div className={styles.checkout}>
                <h1>Checkout</h1>
                <div className={styles.checkoutSteps}>
                    <p>Step 1: Shipping → Step 2: Review → Step 3: Success</p>
                </div>

                <CheckoutContent />
            </div>
        </CheckoutProvider>
    )
}
