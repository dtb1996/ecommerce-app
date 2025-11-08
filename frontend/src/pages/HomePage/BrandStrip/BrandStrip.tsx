import styles from "./BrandStrip.module.scss"
import brand1 from "@assets/icons/brand-logo-1.svg"
import brand2 from "@assets/icons/brand-logo-2.svg"
import brand3 from "@assets/icons/brand-logo-3.svg"
import brand4 from "@assets/icons/brand-logo-4.svg"
import brand5 from "@assets/icons/brand-logo-5.svg"

export default function BrandStrip() {
    return (
        <div className={styles.brandStrip}>
            <img src={brand1} />
            <img src={brand2} />
            <img src={brand3} />
            <img src={brand4} />
            <img src={brand5} />
        </div>
    )
}
