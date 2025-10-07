export interface OrderItem {
    productId: number
    quantity: number
}

export interface Order {
    id: number
    userId: string
    items: OrderItem[]
    total: number
    createdAt: string
}
