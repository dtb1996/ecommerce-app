import type { Product } from "@/types/Product"
import styles from "./ProductCard.module.scss"

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <div className={styles.card}>
            <img src={product.image_url} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
        </div>
    )
}
