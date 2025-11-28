import styles from "./CategoryGrid.module.scss"
import casual from "@assets/images/item-category-1.png"
import formal from "@assets/images/item-category-2.png"
import party from "@assets/images/item-category-3.png"
import gym from "@assets/images/item-category-4.png"

export default function CategoryGrid() {
    return (
        <div className={styles.categories}>
            <h2>Browse By Item Category</h2>
            <div className={styles.grid}>
                <div className={`${styles.card} ${styles.normal}`}>
                    <img className={styles.cardImage} src={casual} />
                    <h4 className={styles.cardText}>Casual</h4>
                </div>
                <div className={`${styles.card} ${styles.wide}`}>
                    <img className={styles.cardImage} src={formal} />
                    <h4 className={styles.cardText}>Formal</h4>
                </div>
                <div className={`${styles.card} ${styles.wide}`}>
                    <img className={styles.cardImage} src={party} />
                    <h4 className={styles.cardText}>Party</h4>
                </div>
                <div className={`${styles.card} ${styles.normal}`}>
                    <img className={styles.cardImage} src={gym} />
                    <h4 className={styles.cardText}>Gym</h4>
                </div>
            </div>
        </div>
    )
}
