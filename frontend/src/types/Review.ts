export interface Review {
    id: string
    author: string
    rating: number
    content: string
    type: "company" | "product"
    productId?: string // only used if type === "product"
}
