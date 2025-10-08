import type { Product } from "@/types/Product"
import styles from "./ProductCard.module.scss"
import { Link } from "react-router-dom"
import placeholder from "@assets/images/placeholder.svg"

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <Link to={`/products/${product.id}`} className={styles.card}>
            {/* <img src={product.image_url} alt={product.name} /> */}
            <img src={placeholder} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
        </Link>
    )
}
