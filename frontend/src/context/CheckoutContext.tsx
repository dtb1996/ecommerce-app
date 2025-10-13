import type { PaymentInfo, ShippingInfo } from "@/types/Checkout"
import { useContext, useState, createContext, type ReactNode } from "react"

type CheckoutContextType = {
    shippingInfo: ShippingInfo | null
    paymentInfo: PaymentInfo | null
    currentStep: number
    setShippingInfo: (info: ShippingInfo) => void
    setPaymentInfo: (info: PaymentInfo) => void
    setCurrentStep: (step: number) => void
    resetCheckout: () => void
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null)
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)
    const [currentStep, setCurrentStep] = useState(1)

    const resetCheckout = () => {
        setShippingInfo(null)
        setPaymentInfo(null)
        setCurrentStep(1)
    }

    return (
        <CheckoutContext.Provider
            value={{
                shippingInfo,
                paymentInfo,
                currentStep,
                setShippingInfo,
                setPaymentInfo,
                setCurrentStep,
                resetCheckout,
            }}
        >
            {children}
        </CheckoutContext.Provider>
    )
}

export const useCheckout = (): CheckoutContextType => {
    const context = useContext(CheckoutContext)

    if (!context) {
        throw new Error("useCheckout must be used within CheckoutProvider")
    }

    return context
}
