import type { Review } from "@/types/Review"
import { Button } from "@/components/common/Button/Button"
import styles from "./CustomerReviews.module.scss"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"
import { ReviewCarousel } from "./ReviewCarousel"
import { useState } from "react"

const reviews: Review[] = [
    {
        id: "1",
        author: "Alice Johnson",
        rating: 5,
        content: "Amazing service, will definitely order again!",
        type: "company",
    },
    {
        id: "2",
        author: "Brian K.",
        rating: 4,
        content: "Fast shipping and great support.",
        type: "company",
    },
    {
        id: "3",
        author: "Cara M.",
        rating: 5,
        content: "High quality products at great prices!",
        type: "company",
    },
    {
        id: "4",
        author: "Daniel T.",
        rating: 3,
        content: "Decent overall, but shipping took a bit long.",
        type: "company",
    },
]

export const CustomerReviews: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const visibleCount = 3

    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % reviews.length)

    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)

    return (
        <div className={styles.customerReviews}>
            <div className={styles.heading}>
                <h2>Our Happy Customers</h2>
                <div className={styles.scroll}>
                    <Button onClick={handlePrev}>
                        <FaArrowLeft />
                    </Button>
                    <Button onClick={handleNext}>
                        <FaArrowRight />
                    </Button>
                </div>
            </div>
            <ReviewCarousel
                reviews={reviews}
                currentIndex={currentIndex}
                visibleCount={visibleCount}
            />
        </div>
    )
}

export default CustomerReviews
