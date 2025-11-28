import type { Review } from "@/types/Review"
import styles from "./ReviewCarousel.module.scss"
import { ReviewCard } from "@/components/ReviewCard/ReviewCard"
import { forwardRef } from "react"

type Props = {
    reviews: Review[]
}

export const ReviewCarousel = forwardRef<HTMLDivElement, Props>(({ reviews }, ref) => {
    return (
        <div
            className={styles.track}
            ref={(node) => {
                if (typeof ref === "function") ref(node)
                else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
            }}
        >
            {reviews.map((review, i) => (
                <div key={i} className={styles.item}>
                    <ReviewCard review={review} />
                </div>
            ))}
        </div>
    )
})
