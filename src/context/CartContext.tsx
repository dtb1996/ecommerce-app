import type { Product } from "@/types/Product"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type CartItem = Product & { quantity: number }

type CartContextType = {
    cartItems: CartItem[]
    addToCart: (product: Product, quantity?: number) => void
    removeFromCart: (productId: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    clearCart: () => void
    totalPrice: number
    totalItems: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    // Load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("cart")
        if (stored) {
            setCartItems(JSON.parse(stored))
        }
    }, [])

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (product: Product, quantity: number = 1) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                )
            }
            return [...prev, { ...product, quantity }]
        })
    }

    const removeFromCart = (productId: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId))
    }

    const updateQuantity = (productId: number, quantity: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        )
    }

    const clearCart = () => setCartItems([])

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalPrice,
                totalItems,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = (): CartContextType => {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }

    return context
}
