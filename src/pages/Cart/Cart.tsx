import { Button } from "@/components/common/Button/Button"
import QuantitySelector from "@/components/common/QuantitySelector/QuantitySelector"
import { useCart } from "@/context/CartContext"
import { Link } from "react-router-dom"
import styles from "./Cart.module.scss"

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()

    const handleClearCart = () => {
        if (window.confirm("This will remove all items from your cart. Continue?")) {
            clearCart()
        }
    }

    return (
        <div className={styles.cart}>
            {cartItems.length > 0 ? (
                <>
                    <h1>Shopping Cart</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td data-label="Product">{item.name}</td>
                                    <td data-label="Price">${item.price.toFixed(2)}</td>
                                    <td data-label="Quantity">
                                        <QuantitySelector
                                            initialQuantity={item.quantity}
                                            onQuantityChanged={(value) =>
                                                updateQuantity(item.id, value)
                                            }
                                        />
                                    </td>
                                    <td data-label="Total">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </td>
                                    <td data-label="" className={styles.actions}>
                                        <Button onClick={() => removeFromCart(item.id)}>
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Order Total:</td>
                                <td>${totalPrice.toFixed(2)}</td>
                                <td></td>
                                <td></td>
                                <td>
                                    <Button onClick={handleClearCart}>Clear Cart</Button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </>
            ) : (
                <div className={styles.empty}>
                    <h1>Your cart is empty</h1>
                    <Link to="/products">Back to Products</Link>
                </div>
            )}
        </div>
    )
}
