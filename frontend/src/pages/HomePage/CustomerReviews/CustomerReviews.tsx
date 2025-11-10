import type { Review } from "@/types/Review"
import { Button } from "@/components/common/Button/Button"
import styles from "./CustomerReviews.module.scss"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"
import { ReviewCarousel } from "./ReviewCarousel"
import { useState } from "react"
import { companyReviews } from "@/utils/demoReviews"

export const CustomerReviews: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % companyReviews.length)

    const handlePrev = () =>
        setCurrentIndex((prev) => (prev - 1 + companyReviews.length) % companyReviews.length)

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
            <ReviewCarousel reviews={companyReviews} />
        </div>
    )
}

export default CustomerReviews
