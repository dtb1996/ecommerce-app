import { Children, useContext, type createContext } from "react"

type ShippingInfo = {
    fullName: string
    email: string
    address: string
    city: string
    zip: string
}

type PaymentInfo = {
    cardHolder?: string
    cardLast4?: string
    stripePaymentId?: string
}

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

export const CheckoutProvider = ({ Children }: { children: ReactNode }) => {}

export const useCheckout = (): CheckoutContextType => {
    const context = useContext(CheckoutContext)

    if (!context) {
        throw new Error("useCheckout must be used within CheckoutProvider")
    }

    return context
}
