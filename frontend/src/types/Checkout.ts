export type ShippingInfo = {
    fullName: string
    email: string
    address: string
    city: string
    zip: string
}

export type PaymentInfo = {
    cardHolder?: string
    cardLast4?: string
    stripePaymentId?: string
}
