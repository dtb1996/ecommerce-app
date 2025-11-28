import type { Review } from "@/types/Review"
import { Button } from "@/components/common/Button/Button"
import styles from "./CustomerReviews.module.scss"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"
import { ReviewCarousel } from "./ReviewCarousel"
import { useRef, useState } from "react"
import { companyReviews } from "@/utils/demoReviews"
import carouselStyles from "./ReviewCarousel.module.scss"

export const CustomerReviews: React.FC = () => {
    const trackRef = useRef<HTMLDivElement>(null)

    const scrollAmount = () => {
        const track = trackRef.current
        if (!track) return 0

        // Detect mobile (item width = 100%)
        const firstItem = track.querySelector<HTMLElement>(`.${carouselStyles.item}`)

        return firstItem?.offsetWidth ?? 0
    }

    const handleNext = () => {
        const track = trackRef.current
        if (!track) return
        track.scrollLeft += scrollAmount()
    }

    const handlePrev = () => {
        const track = trackRef.current
        if (!track) return
        track.scrollLeft -= scrollAmount()
    }

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
            <ReviewCarousel ref={trackRef} reviews={companyReviews} />
        </div>
    )
}

export default CustomerReviews
