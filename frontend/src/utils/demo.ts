import type { PaymentInfo, ShippingInfo } from "@/types/Checkout"

export const demoShipping: ShippingInfo = {
    fullName: "Jane Tester",
    email: "jane.tester+demo@example.com",
    address: "123 Demo St",
    city: "Testville",
    zip: "12345",
}

export const demoPayment: PaymentInfo = {
    cardHolder: "Jane Tester",
    cardLast4: "4242",
    stripePaymentId: undefined,
}
