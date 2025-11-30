import styles from "./ProductShowcase.module.scss"
import { ProductCard } from "@/components/ProductCard/ProductCard"
import { Button } from "@/components/common/Button/Button"
import type { Product } from "@/types/Product"

type Props = {
    title: string
    products: Product[]
    showViewAllButton?: boolean
}

export const ProductShowcase: React.FC<Props> = ({ title, products, showViewAllButton = true }) => {
    return (
        <div className={styles.showcase}>
            <h2>{title}</h2>
            <div className={styles.productsRow}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {showViewAllButton && <Button onClick={() => {}}>View All</Button>}
        </div>
    )
}

export default ProductShowcase
