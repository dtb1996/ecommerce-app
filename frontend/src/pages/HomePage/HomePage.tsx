import BrandStrip from "./BrandStrip/BrandStrip"
import CategoryGrid from "./CategoryGrid/CategoryGrid"
import CustomerReviews from "./CustomerReviews/CustomerReviews"
import HeroSection from "./HeroSection/HeroSection"
import styles from "./HomePage.module.scss"
import ProductShowcase from "./ProductShowcase/ProductShowcase"

export default function HomePage() {
    return (
        <div className={styles.home}>
            <section className={styles.heroSection}>
                <HeroSection />
            </section>
            <section className={styles.brandStrip}>
                <BrandStrip />
            </section>
            <section className={styles.productShowcase}>
                <ProductShowcase />
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
