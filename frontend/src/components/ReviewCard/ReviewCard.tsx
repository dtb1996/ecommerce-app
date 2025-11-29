import type { Review } from "@/types/Review"
import styles from "./ReviewCard.module.scss"

export const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
    const { author, rating, content } = review
    const formattedDate: string =
        review.type === "product" && review.date
            ? new Date(review.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
              })
            : ""

    const formatName = (fullName: string) => {
        const parts = fullName.trim().split(" ")
        if (parts.length < 2) {
            return parts[0]
        }
        const [first, last] = parts
        return `${first} ${last.charAt(0)}.`
    }

    return (
        <div className={styles.reviewCard}>
            <div className={styles.rating}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
                        ★
                    </span>
                ))}
            </div>
            <h4 className={styles.author}>{formatName(author)}</h4>
            <p className={styles.content}>{content}</p>
            {review.type === "product" && <p className={styles.date}>Posted on {formattedDate}</p>}
        </div>
    )
}
