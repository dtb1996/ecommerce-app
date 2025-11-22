import { Button } from "@/components/common/Button/Button"
import styles from "./AdditionalDetails.module.scss"
import { useState } from "react"
import type { Product } from "@/types/Product"
import { ReviewCard } from "@/components/ReviewCard/ReviewCard"
import { companyReviews } from "@/utils/demoReviews"

type Props = {
    product: Product
}

export const AdditionalDetails: React.FC<Props> = ({ product }) => {
    const [activeTab, setActiveTab] = useState<"details" | "reviews" | "faqs">("details")

    return (
        <div className={styles.additionalDetails}>
            <div className={styles.tabs}>
                <Button
                    className={`${styles.tabButton} ${activeTab === "details" ? styles.active : ""}`}
                    onClick={() => setActiveTab("details")}
                >
                    Product Details
                </Button>
                <Button
                    className={`${styles.tabButton} ${activeTab === "reviews" ? styles.active : ""}`}
                    onClick={() => setActiveTab("reviews")}
                >
                    Rating & Reviews
                </Button>
                <Button
                    className={`${styles.tabButton} ${activeTab === "faqs" ? styles.active : ""}`}
                    onClick={() => setActiveTab("faqs")}
                >
                    FAQs
                </Button>
            </div>

            <div className={styles.reviewTab}>
                <div className={styles.tabHeader}>
                    <h4>All Reviews</h4>
                    <p className={styles.reviewCount}>(451)</p>
                    <Button onClick={() => {}}>icon</Button>
                    <Button onClick={() => {}}>Latest</Button>
                    <Button onClick={() => {}}>Write a Review</Button>
                </div>

                <div className={styles.reviewsGrid}>
                    {companyReviews.slice(0, 6).map((review, i) => (
                        // <div key={i} className={styles.slide} style={{ width: `${slideWidth}%` }}>
                        <div key={i} className={styles.item}>
                            <ReviewCard review={review} />
                        </div>
                    ))}
                </div>

                <Button className={styles.loadMore} onClick={() => {}}>
                    Load More Reviews
                </Button>
            </div>
        </div>
    )
}
