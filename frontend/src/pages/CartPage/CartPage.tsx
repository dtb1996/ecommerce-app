import { useCart } from "@/context/CartContext"
import { Link } from "react-router-dom"
import styles from "./CartPage.module.scss"
import CartItem from "@/components/Cart/CartItem"
import React from "react"
import { Button } from "@/components/common/Button/Button"
import { LuTag } from "react-icons/lu"
import { FaArrowRight } from "react-icons/fa6"

export default function CartPage() {
    const { cartItems, totalPrice } = useCart()

    return (
        <div className={styles.cart}>
            {cartItems.length > 0 ? (
                <>
                    <h1>Your Cart</h1>
                    <div className={styles.details}>
                        <div className={styles.items}>
                            {cartItems.map((item, i) => (
                                <React.Fragment key={item.id}>
                                    <CartItem item={item} quantity={item.quantity} />
                                    {i < cartItems.length - 1 && <hr className={styles.divider} />}
                                </React.Fragment>
                            ))}
                        </div>
                        <div className={styles.summary}>
                            <h2>Order Summary</h2>
                            <div className={styles.row}>
                                <span>Subtotal</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Discount</span>
                                <span className={styles.negative}>$0.00</span>
                            </div>
                            <div className={styles.row}>
                                <span>Delivery Fee</span>
                                <span>$0.00</span>
                            </div>
                            <hr />
                            <div className={`${styles.row} ${styles.total}`}>
                                <span>Total</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className={`${styles.row} ${styles.promo}`}>
                                <div className={styles.promoContainer}>
                                    <LuTag className={styles.icon} />
                                    <input type="text" placeholder="Add promo code" />
                                </div>
                                <Button children={"Apply"} className={styles.apply} />
                            </div>
                            <Link to="/checkout">
                                <Button>
                                    Proceed to Checkout
                                    <FaArrowRight />
                                </Button>
                            </Link>
                        </div>
                    </div>
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
