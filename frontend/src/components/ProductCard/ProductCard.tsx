import type { Product } from "@/types/Product"
import styles from "./ProductCard.module.scss"
import { Link } from "react-router-dom"
import placeholder from "@assets/images/placeholder.svg"

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <Link to={`/products/${product.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={product.image_url ?? placeholder} alt={product.name} />
            </div>
            <h3 className={styles.name}>{product.name}</h3>
            <p className={styles.price}>${product.price.toFixed(2)}</p>
        </Link>
    )
}
