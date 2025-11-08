import styles from "./CategoryGrid.module.scss"

export default function CategoryGrid() {
    return (
        <div className={styles.categories}>
            <h2>Browse By Item Category</h2>
            <div className={styles.grid}>
                <div className={`${styles.card} ${styles.normal}`}>Casual</div>
                <div className={`${styles.card} ${styles.wide}`}>Formal</div>
                <div className={`${styles.card} ${styles.wide}`}>Party</div>
                <div className={`${styles.card} ${styles.normal}`}>Gym</div>
            </div>
        </div>
    )
}
