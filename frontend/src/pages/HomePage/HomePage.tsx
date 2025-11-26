import { useProducts } from "@/hooks/useProducts"
import BrandStrip from "./BrandStrip/BrandStrip"
import CategoryGrid from "./CategoryGrid/CategoryGrid"
import CustomerReviews from "./CustomerReviews/CustomerReviews"
import HeroSection from "./HeroSection/HeroSection"
import styles from "./HomePage.module.scss"
import ProductShowcase from "./ProductShowcase/ProductShowcase"

export default function HomePage() {
    const { allProducts } = useProducts()

    const newProducts = allProducts.slice(0, 4)
    const topProducts = allProducts.slice(4, 8)

    return (
        <div className={styles.home}>
            <section className={styles.heroSection}>
                <HeroSection />
            </section>
            <section className={styles.brandStrip}>
                <BrandStrip />
            </section>
            <section className={styles.productShowcase}>
                <ProductShowcase title="New Arrivals" products={newProducts} />
                <div className={styles.divider} />
                <ProductShowcase title="Top Selling" products={topProducts} />
            </section>
            <section className={styles.categoryGrid}>
                <CategoryGrid />
            </section>
            <section className={styles.customerReviews}>
                <CustomerReviews />
            </section>
        </div>
    )
}
