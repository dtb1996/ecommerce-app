import type { Review } from "@/types/Review"
import styles from "./ReviewCarousel.module.scss"
import { ReviewCard } from "@/components/ReviewCard/ReviewCard"

type Props = {
    reviews: Review[]
}

export const ReviewCarousel: React.FC<Props> = ({ reviews }) => {
    // const extended = [...reviews, ...reviews.slice(0, visibleCount)]

    return (
        // <div className={styles.viewport}>
        <div
            className={styles.track}
            // style={{
            //     transform: `translateX(${translateX}%)`,
            //     width: `${(extended.length * 100) / visibleCount}%`,
            // }}
        >
            {reviews.map((review, i) => (
                // <div key={i} className={styles.slide} style={{ width: `${slideWidth}%` }}>
                <div key={i} className={styles.item}>
                    <ReviewCard review={review} />
                </div>
            ))}
        </div>
        // </div>
    )
}
