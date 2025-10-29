import { LuListFilter } from "react-icons/lu"
import styles from "./ProductFilters.module.scss"
import { Button } from "../common/Button/Button"
import { IoChevronForward } from "react-icons/io5"
import { Range, getTrackBackground } from "react-range"
import { useMemo } from "react"

interface ProductFiltersProps {
    categories: string[]
    priceRange: { min: number; max: number }
    selectedCategory: string | null
    onCategoryChange: (category: string | null) => void
    selectedPriceRange: [number, number]
    onPriceChange: (range: [number, number]) => void
}

export default function ProductFilters({
    categories,
    priceRange,
    selectedCategory,
    onCategoryChange,
    selectedPriceRange,
    onPriceChange,
}: ProductFiltersProps) {
    const roundedMin = Math.floor(priceRange.min)
    const roundedMax = Math.ceil(priceRange.max)

    const displaySelected: [number, number] = [
        Math.round(selectedPriceRange[0]),
        Math.round(selectedPriceRange[1]),
    ]

    const clampedValues: [number, number] = [
        Math.max(roundedMin, selectedPriceRange[0]),
        Math.min(roundedMax, selectedPriceRange[1]),
    ]

    function handleCategorySelect(category: string) {
        onCategoryChange(selectedCategory === category ? null : category)
    }

    return (
        <div className={styles.filters}>
            <div className={styles.heading}>
                <h4>Filters</h4>
                <LuListFilter />
            </div>

            <div className={styles.section}>
                <h4>Category</h4>
                <div className={styles.categoryButtons}>
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            onClick={() => handleCategorySelect(cat)}
                            className={`${styles.filtersButton} ${cat === selectedCategory ? styles.selectedButton : null}`}
                        >
                            {cat}
                            <IoChevronForward />
                        </Button>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h4>Price</h4>
                <div className={styles.slider}>
                    {priceRange.max > priceRange.min && (
                        <Range
                            min={roundedMin}
                            max={roundedMax}
                            step={1}
                            values={clampedValues}
                            onChange={(values) => onPriceChange(values as [number, number])}
                            renderTrack={({ props, children }) => {
                                return (
                                    <div
                                        {...props}
                                        className={styles.track}
                                        style={{
                                            background: getTrackBackground({
                                                values: clampedValues,
                                                colors: ["#F0F0F0", "#222", "#F0F0F0"],
                                                min: roundedMin,
                                                max: roundedMax,
                                            }),
                                        }}
                                    >
                                        {children}
                                    </div>
                                )
                            }}
                            renderThumb={({ props }) => {
                                const { key, ...rest } = props
                                return <div key={key} {...rest} className={styles.thumb} />
                            }}
                        />
                    )}

                    <div className={styles.priceLabels}>
                        <span>${selectedPriceRange[0].toFixed(0)}</span>
                        <span>${selectedPriceRange[1].toFixed(0)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
