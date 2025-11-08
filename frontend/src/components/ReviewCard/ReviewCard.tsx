import type { Review } from "@/types/Review"
import styles from "./ReviewCard.module.scss"

export const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
    const { author, rating, content } = review

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
            <h4>{formatName(author)}</h4>
            <p>{content}</p>
        </div>
    )
}
