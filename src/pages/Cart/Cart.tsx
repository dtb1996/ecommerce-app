import { useCart } from "@/context/CartContext"

export default function Cart() {
    const { cartItems } = useCart()

    return (
        <>
            <h1>Cart Items</h1>
            <div>
                {cartItems.map((item) => (
                    <div key={item.id}>
                        <h4>{item.name}</h4>
                        <p>{item.quantity}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
