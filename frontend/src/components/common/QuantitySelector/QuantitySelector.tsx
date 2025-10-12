import { useState } from "react"
import styles from "./QuantitySelector.module.scss"

export default function QuantitySelector({
    initialQuantity = 1,
    min = 1,
    max = 10,
    onQuantityChanged,
}: {
    initialQuantity?: number
    min?: number
    max?: number
    onQuantityChanged?: (quantity: number) => void
}) {
    const [quantity, setQuantity] = useState<number>(initialQuantity)

    const handleIncrement = () => {
        setQuantity((prev) => (prev < max ? prev + 1 : prev))
    }

    const handleDecrement = () => {
        setQuantity((prev) => (prev > min ? prev - 1 : prev))
    }

    const handleChange = (event: InputEvent) => {
        const value = parseInt(event.target.value, 10)
        if (!isNaN(value) && value >= min && value <= max) {
            setQuantity(value)
            if (onQuantityChanged) {
                onQuantityChanged(value)
            }
        } else if (event.target.value === "") {
            // setQuantity(min)
        }
    }

    return (
        <div className={styles.control}>
            <button onClick={handleDecrement} disabled={quantity <= min}>
                -
            </button>
            <input type="number" value={quantity} onChange={handleChange} min={min} max={max} />
            <button onClick={handleIncrement} disabled={quantity >= max}>
                +
            </button>
        </div>
    )
}
