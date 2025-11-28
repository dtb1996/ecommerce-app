import type { Review } from "@/types/Review"
import styles from "./ReviewCarousel.module.scss"
import { ReviewCard } from "@/components/ReviewCard/ReviewCard"
import { forwardRef } from "react"

type Props = {
    reviews: Review[]
}

export const ReviewCarousel = forwardRef<HTMLDivElement, Props>(({ reviews }, ref) => {
    return (
        <div className={styles.track} ref={ref}>
            {reviews.map((review, i) => (
                <div key={i} className={styles.item}>
                    <ReviewCard review={review} />
                </div>
            ))}
        </div>
    )
})
