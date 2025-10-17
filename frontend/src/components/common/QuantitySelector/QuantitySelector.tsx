import styles from "./QuantitySelector.module.scss"

export default function QuantitySelector({
    quantity,
    min = 1,
    max = 10,
    onQuantityChanged,
}: {
    quantity: number
    min?: number
    max?: number
    onQuantityChanged?: (quantity: number) => void
}) {
    const handleDecrement = () => {
        const newQty = Math.max(min, quantity - 1)
        if (newQty !== quantity) {
            onQuantityChanged?.(newQty)
        }
    }

    const handleIncrement = () => {
        const newQty = Math.min(max, quantity + 1)
        if (newQty !== quantity) {
            onQuantityChanged?.(newQty)
        }
    }

    return (
        <div className={styles.control}>
            <button onClick={handleDecrement} disabled={quantity <= min}>
                -
            </button>
            <span>{quantity}</span>
            <button onClick={handleIncrement} disabled={quantity >= max}>
                +
            </button>
        </div>
    )
}
