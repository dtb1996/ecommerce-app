import type { Product } from "@/types/Product"
import styles from "./CartItem.module.scss"
import placeholder from "@assets/images/placeholder.svg"
import { HiTrash } from "react-icons/hi2"
import QuantitySelector from "../common/QuantitySelector/QuantitySelector"
import { useCart } from "@/context/CartContext"
import { Link } from "react-router-dom"

export const CartItem: React.FC<{ item: Product; quantity: number }> = ({ item, quantity }) => {
    const { removeFromCart, updateQuantity } = useCart()

    return (
        <div className={styles.item}>
            <Link to={`/products/${item.id}`} className={styles.link}>
                <img src={item.images[0] ?? placeholder} alt={item.name} />
                <div className={styles.info}>
                    <h3 className={styles.name}>{item.name}</h3>
                    <p className={styles.description}>{item.description}</p>
                    <p className={styles.price}>${item.price.toFixed(2)}</p>
                </div>
            </Link>
            <div className={styles.controls}>
                <button className={styles.trash} onClick={() => removeFromCart(item.id)}>
                    <HiTrash />
                </button>
                <QuantitySelector
                    quantity={quantity}
                    onQuantityChanged={(value) => updateQuantity(item.id, value)}
                />
            </div>
        </div>
    )
}

export default CartItem
