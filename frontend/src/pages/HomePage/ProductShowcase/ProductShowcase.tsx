import { useProducts } from "@/hooks/useProducts"
import styles from "./ProductShowcase.module.scss"
import { ProductCard } from "@/components/ProductCard/ProductCard"
import { Button } from "@/components/common/Button/Button"

export default function ProductShowcase() {
    const { allProducts } = useProducts()

    const newProducts = allProducts.slice(0, 4)
    const topProducts = allProducts.slice(4, 8)

    return (
        <div className={styles.showcase}>
            <h2>New Arrivals</h2>
            <div className={styles.productsRow}>
                {newProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <Button onClick={() => {}}>View All</Button>
            <div className={styles.divider} />
            <h2>Top Selling</h2>
            <div className={styles.productsRow}>
                {topProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <Button onClick={() => {}}>View All</Button>
        </div>
    )
}
