import { Button } from "@/components/common/Button/Button"
import styles from "./HeroSection.module.scss"
import { useNavigate } from "react-router-dom"

export default function HeroSection() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/Products")
    }

    return (
        <section className={styles.hero}>
            <div className={styles.heroText}>
                <h1>Find Products that Match Your Lifestyle</h1>
                <p>
                    Browse through our diverse range of products, designed to bring out your
                    individuality and cater to your lifestyle.
                </p>
                <Button onClick={handleClick}>Shop Now</Button>
                <div className={styles.metrics}>
                    <div className={styles.metric}>
                        <h3>200+</h3>
                        <p>International Brands</p>
                    </div>
                    <div className={styles.metric}>
                        <h3>2,000+</h3>
                        <p>High-Quality Products</p>
                    </div>
                    <div className={styles.metric}>
                        <h3>30,000+</h3>
                        <p>Happy Customers</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
